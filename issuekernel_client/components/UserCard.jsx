import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const UserCard = ({ key, name, email, role }) => {
  return (
    <article className="user-card m-1.5" key={key}>
      <div>
        <h3 className="text-lg font-semibold text-white">{name}</h3>
        <p className="text-gray-600">{email}</p>
      </div>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    </article>
  );
};

export default UserCard;
