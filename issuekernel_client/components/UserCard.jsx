import { useState } from 'react';
import { useSession } from 'next-auth/react';

const UserCard = ({ id, name, email, role }) => {
  const [selectedRole, setSelectedRole] = useState(role);
  const { data: session } = useSession();

  const handleRoleChange = async (newRole) => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (response.status === 200) {
        setSelectedRole(newRole);
        //* Adding to dev-proj table
        if (newRole === 'Developer') {
          const developerResponse = await fetch(
            'http://localhost:8080/api/developer-projects',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session?.user.accessToken}`,
              },
              body: JSON.stringify({ developer_id: id }),
            }
          );
          if (developerResponse.status !== 201) {
            console.log('Error adding user to developer-project table');
          }
        }
        //* End
      } else {
        console.log('Error updating user role:', response.statusText);
      }
    } catch (error) {
      console.log('Error updating user role:', error);
    }
  };
  return (
    <article className="user-card m-1.5">
      <div>
        <h3 className="text-lg font-semibold text-white">{name}</h3>
        <p className="text-gray-600">{email}</p>
      </div>

      <div className="m-1">
        {/* <label htmlFor="role" className="text-gray-600">
          Select Role:
        </label> */}
        {role === 'Admin' ? (
          <div className="block w-[150px] max-h-[39px]  p-2  rounded-md bg-primary-500 text-white">
            Admin
          </div>
        ) : (
          <select
            id="role"
            className="block w-[150px]  p-2  rounded-md bg-primary-500 text-white "
            value={selectedRole}
            onChange={(e) => handleRoleChange(e.target.value)}
          >
            <option value="Manager" className="bg-dark-2">
              Manager
            </option>
            <option value="Developer" className="bg-dark-2">
              Developer
            </option>
            <option value="Consumer" className="bg-dark-2">
              Consumer
            </option>
          </select>
        )}
      </div>
    </article>
  );
};

export default UserCard;
