import { useState, useEffect } from "react";
import "./container.scss";
import Modal from "../modal/Modal";
import { BsStar, BsStarFill } from "react-icons/bs";
import UserList from "../user/UserList";

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

  const filterByGender = (gender) => {
    console.log(gender);
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
  }, [users, favoritedUsers, genderOption]); // eslint-disable-line react-hooks/exhaustive-deps

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
          <div className="actions">
            <div className="search-bar">
              <input
                type="text"
                placeholder="search"
                className="search-input"
              />
            </div>
            <div className="filters">
              <span className="filter-by">Filter by:</span>
              <select
                value={genderOption}
                name="gender"
                id="gender"
                className="filter-input"
                onChange={(e) => setGenderOption(e.target.value)}
              >
                <option value="all" name="all">
                  all
                </option>
                <option value="male" name="male">
                  male
                </option>
                <option value="female" name="female">
                  female
                </option>
              </select>
              <div className="filter-favorite">
                {filterByFavorite ? (
                  <BsStarFill
                    onClick={() => setFilterByFavorite(!filterByFavorite)}
                  />
                ) : (
                  <BsStar
                    onClick={() => setFilterByFavorite(!filterByFavorite)}
                  />
                )}
              </div>
            </div>
          </div>
          {(favoritedUsers.length === 0 && users.length === 0) ||
          (favoritedUsers.length === 0 && filterByFavorite) ? (
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
