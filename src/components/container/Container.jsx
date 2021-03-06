import { useState, useEffect } from "react";
import "./container.scss";
import Modal from "../modal/Modal";
import UserList from "../user/UserList";
import Filter from "../filter/Filter";

const API_URL = "https://randomuser.me/api?seed=hydra";

const Container = () => {
  // User Lists and selects
  const [users, setUsers] = useState([]);
  const [favoritedUsers, setFavoritedUsers] = useState(() => {
    const cache = localStorage.getItem("favoritedUsers");
    if (cache) {
      return JSON.parse(cache);
    }
    return [];
  });
  const [usersFiltered, setUsersFiltered] = useState([]);
  const [favoriteUsersFiltered, setFavoriteUsersFiltered] = useState([]);

  // Filters
  const [filterOptions, setFilterOptions] = useState({
    filterByFavorite: false,
    genderOption: "all",
    searchedName: "",
  });

  //aditional values
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

  const saveToLocalStorage = () => {
    if (favoritedUsers.length === 0) {
      localStorage.removeItem("favoritedUsers");
    } else {
      localStorage.setItem("favoritedUsers", JSON.stringify(favoritedUsers));
    }
  };

  const filterUsers = () => {
    let usersFilt = [];
    let favoriteUsersFilt = [];

    if (filterOptions.genderOption !== "all") {
      usersFilt = users.filter(
        (user) => user.gender === filterOptions.genderOption
      );
      favoriteUsersFilt = favoritedUsers.filter(
        (user) => user.gender === filterOptions.genderOption
      );
    } else {
      usersFilt = users;
      favoriteUsersFilt = favoritedUsers;
    }

    if (filterOptions.searchedName) {
      const nameUpcased = filterOptions.searchedName.toUpperCase();
      usersFilt = usersFilt.filter(
        (user) =>
          user.name.first.toUpperCase() === nameUpcased ||
          user.name.last.toUpperCase() === nameUpcased
      );
      favoriteUsersFilt = favoriteUsersFilt.filter(
        (user) =>
          user.name.first.toUpperCase() === nameUpcased ||
          user.name.last.toUpperCase() === nameUpcased
      );
    }

    setUsersFiltered(usersFilt);
    setFavoriteUsersFiltered(favoriteUsersFilt);
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const validateData = () => {
    return (
      // validates if both arrays are empty
      (favoriteUsersFiltered.length === 0 && usersFiltered.length === 0) ||
      // validates if is filteredByFavorite but favoriteArray is empty
      (favoritedUsers.length === 0 && filterOptions.filterByFavorite) ||
      // validates if there is a filter for gender and favorite with no name in favorite array
      (filterOptions.genderOption !== "all" &&
        filterOptions.filterByFavorite &&
        favoriteUsersFiltered.filter(
          (user) => user.gender === filterOptions.genderOption
        ).length === 0) ||
      // validates if a name was searched with favorite while favoriteArray is empty
      (filterOptions.searchedName &&
        filterOptions.filterByFavorite &&
        favoriteUsersFiltered.length === 0) ||
      // validates if a name was searched with specific gender and arrays are empty
      (filterOptions.searchedName &&
        filterOptions.genderOption !== "all" &&
        usersFiltered.filter(
          (user) => user.gender === filterOptions.genderOption
        ).length === 0 &&
        favoriteUsersFiltered.filter(
          (user) => user.gender === filterOptions.genderOption
        ).length === 0)
    );
  };

  useEffect(() => {
    saveToLocalStorage();
  }, [toggleFavorite]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    filterUsers();
  }, [users, filterOptions.genderOption, filterOptions.searchedName]); // eslint-disable-line react-hooks/exhaustive-deps

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
            filterOptions={filterOptions}
            setFilterOptions={setFilterOptions}
          />
          {validateData() ? (
            <div className="no-data">
              <h2>No users found</h2>
            </div>
          ) : (
            <>
              <div className="user-list">
                <UserList
                  users={favoriteUsersFiltered}
                  toggleFavorite={toggleFavorite}
                  openModal={openModal}
                />
                {!filterOptions.filterByFavorite && (
                  <UserList
                    users={usersFiltered}
                    toggleFavorite={toggleFavorite}
                    openModal={openModal}
                  />
                )}
              </div>
              {!filterOptions.filterByFavorite && !filterOptions.searchedName && (
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
