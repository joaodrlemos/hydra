import "./user.scss";
import { BsStar, BsStarFill } from "react-icons/bs";

const User = ({ user, toggleFavorite, openModal }) => {
  const {
    login: { uuid },
    gender,
    name: { first },
    name: { last },
    picture: { large },
    favorite,
  } = user;

  return (
    <article className="user">
      <img
        src={large}
        alt={`${first} ${last}`}
        onClick={() => openModal(user)}
      />
      <div className="user-info" onClick={() => openModal(user)}>
        <h3 className="name">
          {first} {last}
        </h3>
        <p className="gender">{gender}</p>
      </div>
      <div className="user-favorite">
        {favorite ? (
          <BsStarFill
            className="user-favorite-icon"
            onClick={() => toggleFavorite(uuid, favorite)}
          />
        ) : (
          <BsStar
            className="user-favorite-icon"
            onClick={() => toggleFavorite(uuid, favorite)}
          />
        )}
      </div>
    </article>
  );
};

export default User;
