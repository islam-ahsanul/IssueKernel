import React from 'react';

const UserCard = ({ key, name, email, role }) => {
  return (
    <article className="user-card m-1.5" key={key}>
      <div>
        <h3 className="text-lg font-semibold text-white">{name}</h3>
        <p className="text-gray-600">{email}</p>
      </div>
      <div>{role}</div>
    </article>
  );
};

export default UserCard;
