import React from "react";
import { useAuth } from "../../../hooks/useAuth";
import UsersListAdmin from "../../../component/Admin/Users/UsersListAdmin";

const UsersList = () => {
  const { users } = useAuth();
  
  return (
    <div>
      <div className="header flex items-center justify-between mb-3 mr-6">
        <h1 className="font-bold text-3xl font-sans flex-grow text-center">
          Usuarios
        </h1>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border w-48">ID</th>
            <th className="border w-96">UUID</th>
            <th className="border w-48">USUARIO</th>
            <th className="border w-48">EMAIL</th>
            <th className="border w-48">TIPO</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UsersListAdmin key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default UsersList;
