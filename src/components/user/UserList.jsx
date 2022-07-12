import "./userList.scss";
import User from "./User";

const UserList = ({ users, toggleFavorite, openModal }) => {
  return (
    <>
      {users.map((user) => {
        return (
          <User
            key={user.login.uuid}
            user={user}
            toggleFavorite={toggleFavorite}
            openModal={openModal}
          />
        );
      })}
    </>
  );
};

export default UserList;
