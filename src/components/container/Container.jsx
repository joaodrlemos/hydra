import { useState, useEffect } from "react";
import "./container.scss";
import Modal from "../modal/Modal";
import UserList from "../user/UserList";
import Filter from "../filter/Filter";

const API_URL = "https://randomuser.me/api?seed=hydra";

const Container = () => {
  // User Lists and selects
  const [users, setUsers] = useState([]);
  const [favoritedUsers, setFavoritedUsers] = useState([]);
  const [userQuantity, setUserQuantity] = useState(10);
  const [selectedUser, setSelectedUser] = useState({});

  //aditional values
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // Filters
  const [filterByFavorite, setFilterByFavorite] = useState(false);
  const [genderOption, setGenderOption] = useState("all");
  const [usersFilteredByGender, setUsersFilteredByGender] = useState([]);
  const [favoriteUsersFilteredByGender, setFavoriteUsersFilteredByGender] =
    useState([]);

  const fetchUsers = async () => {
    try {
      let userList = [];
      const resp = await fetch(API_URL + "&results=" + userQuantity);
      const jsonResp = await resp.json();

      userList = jsonResp.results.filter((user) => {
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
    console.log(favoritedUsers);
    localStorage.setItem("favoritedUsers", JSON.stringify(favoritedUsers));
  };

  const filterByGender = (gender) => {
    setGenderOption(gender);
    let usersFiltByGender = [];
    let favoriteUsersFiltByGender = [];

    if (gender !== "all") {
      usersFiltByGender = users.filter((user) => user.gender === gender);
      favoriteUsersFiltByGender = favoritedUsers.filter(
        (user) => user.gender === gender
      );
    }

    setUsersFilteredByGender(usersFiltByGender);
    setFavoriteUsersFilteredByGender(favoriteUsersFiltByGender);
  };

  const openModal = (user) => {
    setShowModal(true);
    setSelectedUser(user);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    filterByGender(genderOption);
  }, [users, genderOption]); // eslint-disable-line react-hooks/exhaustive-deps

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
          <Filter
            genderOption={genderOption}
            setGenderOption={setGenderOption}
            filterByFavorite={filterByFavorite}
            setFilterByFavorite={setFilterByFavorite}
          />
          {(favoritedUsers.length === 0 && users.length === 0) ||
          (favoritedUsers.length === 0 && filterByFavorite) ||
          (genderOption !== "all" &&
            filterByFavorite &&
            favoriteUsersFilteredByGender.filter(
              (user) => user.gender === genderOption
            ).length === 0) ? (
            <div className="no-data">
              <h2>No users found</h2>
            </div>
          ) : (
            <>
              {genderOption === "all" ? (
                <div className="user-list">
                  <UserList
                    users={favoritedUsers}
                    toggleFavorite={toggleFavorite}
                    openModal={openModal}
                  />
                  {!filterByFavorite && (
                    <UserList
                      users={users}
                      toggleFavorite={toggleFavorite}
                      openModal={openModal}
                    />
                  )}
                </div>
              ) : (
                <div className="user-list">
                  <UserList
                    users={favoriteUsersFilteredByGender}
                    toggleFavorite={toggleFavorite}
                    openModal={openModal}
                  />
                  {!filterByFavorite && (
                    <UserList
                      users={usersFilteredByGender}
                      toggleFavorite={toggleFavorite}
                      openModal={openModal}
                    />
                  )}
                </div>
              )}
              {!filterByFavorite && (
                <div className="btn">
                  <button
                    type="button"
                    className="load-more-btn"
                    onClick={() => setUserQuantity(userQuantity + 10)}
                  >
                    Load more
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Container;
