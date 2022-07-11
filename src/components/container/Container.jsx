import { useState, useEffect } from "react";
import "./container.scss";
import User from "../user/User";

const API_URL = "https://randomuser.me/api?seed=hydra";

const Container = () => {
  const [users, setUsers] = useState([]);
  const [favoritedUsers, setFavoritedUsers] = useState([]);
  const [userNumber, setUserNumber] = useState(10);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchUsers = async (number) => {
    try {
      let userIndex = 1;
      const resp = await fetch(API_URL + "&results=" + number);
      const jsonResp = await resp.json();

      const userList = jsonResp.results.map((user) => {
        return { ...user, index: userIndex++, favorite: false };
      });

      setIsLoading(false);
      setUsers(userList);
    } catch (error) {
      setIsLoading(false);
      setError(true);
    }
  };

  const toggleFavorite = (id, favorite) => {
    let favoritedUser = {};
    if (favorite) {
      const newUsers = favoritedUsers.filter((user) => {
        if (user.login.uuid === id) {
          favoritedUser = { ...user, favorite: !user.favorite };
          users.splice(
            favoritedUser.index - favoritedUsers.length,
            0,
            favoritedUser
          );
        } else {
          return user;
        }
      });
      setFavoritedUsers(newUsers);
    } else {
      const newUsers = users.filter((user) => {
        if (user.login.uuid === id) {
          favoritedUser = { ...user, favorite: !user.favorite };
          setFavoritedUsers([...favoritedUsers, favoritedUser]);
        } else {
          return user;
        }
      });
      setUsers(newUsers);
    }
  };

  useEffect(() => {
    fetchUsers(userNumber);
  }, [userNumber]);

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
    <section className="container">
      <h2 className="container-title">users</h2>
      <div className="container-area">
        <div className="user-list">
          {favoritedUsers.map((user) => {
            return (
              <User
                key={user.index}
                user={user}
                toggleFavorite={toggleFavorite}
              />
            );
          })}
          {users.map((user) => {
            return (
              <User
                key={user.login.uuid}
                user={user}
                toggleFavorite={toggleFavorite}
              />
            );
          })}
        </div>
        <div className="btn">
          <button
            type="button"
            className="load-more-btn"
            onClick={() => setUserNumber(userNumber + 10)}
          >
            Load more
          </button>
        </div>
      </div>
    </section>
  );
};

export default Container;
