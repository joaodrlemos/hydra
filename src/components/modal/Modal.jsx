import "./modal.scss";
import { FaTimes } from "react-icons/fa";
import { BsStar, BsStarFill } from "react-icons/bs";
import { useState } from "react";

const Modal = ({ toggleFavorite, closeModal, selectedUser }) => {
  const {
    login: { uuid },
    name: { first },
    name: { last },
    picture: { large },
    favorite,
  } = selectedUser;

  const [favorited, setFavorited] = useState(favorite);

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-modal-btn">
          <FaTimes onClick={() => closeModal()} />
        </button>
        <div className="modal-data">
          <img src={large} alt={first + last} className="modal-img" />
          <div className="modal-user-favorite">
            {favorited ? (
              <BsStarFill
                className="modal-user-favorite-icon"
                onClick={() => {
                  setFavorited(false);
                  toggleFavorite(uuid, favorited);
                }}
              />
            ) : (
              <BsStar
                className="modal-user-favorite-icon"
                onClick={() => {
                  setFavorited(true);
                  toggleFavorite(uuid, favorited);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
