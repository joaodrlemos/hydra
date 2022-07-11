import { useState, useEffect } from "react";
import "./container.scss";
import User from "../user/User";

const API_URL = "https://randomuser.me/api?seed=hydra";

const Container = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async (number) => {
    setIsLoading(true);
    try {
      const resp = await fetch(API_URL + "&results=" + number);
      const jsonResp = await resp.json();

      setIsLoading(false);
      setUsers(jsonResp.results);
      console.log(jsonResp.results);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers(20);
  }, []);

  if (isLoading) {
    return <h2 className="loading">loading...</h2>;
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
          <button type="button" className="load-more-btn">
            Load more
          </button>
        </div>
      </div>
    </section>
  );
};

export default Container;
