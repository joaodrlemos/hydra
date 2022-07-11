import "./user.scss";
import { BsStar } from "react-icons/bs";

const User = ({ user }) => {
  const {
    gender,
    name: { first },
    name: { last },
    picture: { large },
  } = user;

  return (
    <article className="user">
      <img src={large} alt="photo" />
      <div className="user-info">
        <h3 className="name">
          {first} {last}
        </h3>
        <p className="gender">{gender}</p>
      </div>
      <div className="user-favorite">
        <BsStar />
      </div>
    </article>
  );
};

export default User;
