import { useState, useEffect } from "react";
import "./container.scss";
import User from "../user/User";
import Modal from "../modal/Modal";

const API_URL = "https://randomuser.me/api?seed=hydra";

const Container = () => {
  const [users, setUsers] = useState([]);
  const [favoritedUsers, setFavoritedUsers] = useState([]);

  const [userQuantity, setUserQuantity] = useState(10);
  const [selectedUser, setSelectedUser] = useState({});

  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchUsers = async () => {
    try {
      const resp = await fetch(API_URL + "&results=" + userQuantity);
      const jsonResp = await resp.json();

      const userList = jsonResp.results.filter((user) => {
        if (
          !favoritedUsers.find(
            (favoriteUser) => favoriteUser.login.uuid === user.login.uuid
          )
        ) {
          return { ...user, favorite: false };
        } else {
          return false;
        }
      });

      setIsLoading(false);
      setUsers(userList);
    } catch (error) {
      setIsLoading(false);
      setError(true);
    }
  };

  const toggleFavorite = (id, favorite) => {
    if (favorite) {
      const newUsers = favoritedUsers.filter((user) => {
        if (user.login.uuid === id) {
          const unfavoritedUser = { ...user, favorite: false };
          setUsers([unfavoritedUser, ...users]);
          return false;
        } else {
          return user;
        }
      });
      setFavoritedUsers(newUsers);
    } else {
      const newUsers = users.filter((user) => {
        if (user.login.uuid === id) {
          const favoritedUser = { ...user, favorite: true };
          setFavoritedUsers([favoritedUser, ...favoritedUsers]);
          return false;
        } else {
          return user;
        }
      });
      setUsers(newUsers);
    }
  };

  const openModal = (user) => {
    setShowModal(true);
    setSelectedUser(user);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    fetchUsers();
  }, [userQuantity]); // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading) {
    return (
      <div className="loading">
        <h2>loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h2>error getting users</h2>
        <p>try refreshing page...</p>
      </div>
    );
  }

  return (
    <>
      {showModal && (
        <Modal
          closeModal={closeModal}
          toggleFavorite={toggleFavorite}
          selectedUser={selectedUser}
        />
      )}
      <section className="container">
        <h2 className="container-title">users</h2>
        <div className="container-area">
          {favoritedUsers.length === 0 && users.length === 0 ? (
            <div className="no-data">
              <h2>No users found</h2>
            </div>
          ) : (
            <>
              <div className="user-list">
                {favoritedUsers.map((user) => {
                  return (
                    <User
                      key={user.login.uuid}
                      user={user}
                      toggleFavorite={toggleFavorite}
                      openModal={openModal}
                    />
                  );
                })}
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
              </div>
              <div className="btn">
                <button
                  type="button"
                  className="load-more-btn"
                  onClick={() => setUserQuantity(userQuantity + 10)}
                >
                  Load more
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Container;
