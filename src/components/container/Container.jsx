import { useState, useEffect } from "react";
import "./container.scss";
import User from "../user/User";

const API_URL = "https://randomuser.me/api?seed=hydra";

const Container = () => {
  const [users, setUsers] = useState([]);
  const [userNumber, setUserNumber] = useState(10);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchUsers = async (number) => {
    try {
      const resp = await fetch(API_URL + "&results=" + number);
      const jsonResp = await resp.json();

      setIsLoading(false);
      setUsers(jsonResp.results);
    } catch (error) {
      setIsLoading(false);
      setError(true);
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
          {users.map((user) => {
            return <User key={user.login.uuid} user={user} />;
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
