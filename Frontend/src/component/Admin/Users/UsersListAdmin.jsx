import React  from "react";

const UsersListAdmin = ({user}) => {
    console.log(user);

    return(
        <tr>
            <td className="border w-10">{user.id}</td>
            <td className="border w-72">
              <span>{user.uuid}</span>
            </td>
            <td className="border w-32">
              <span>{user.username}</span>
            </td>
            <td className="border w-32">
              <span>{user.email}</span>
            </td>
            <td className="border w-32">
              <span>{user.type}</span>
            </td>
          </tr>
    )

}
export default UsersListAdmin