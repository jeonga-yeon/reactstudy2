import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import CardList from "./CardList/CardList";
import "./Users.scss";

function Users() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [queryString, setQueryString] = useSearchParams();

  const start = queryString.get("start");
  const limit = queryString.get("limit");

  const handleQuery = (event) => {
    const offset = (Number(event.target.innerHTML) - 1) * 20;
    const LIMIT = 20;
    navigate(`?start=${offset}&limit=${LIMIT}`);
  };

  useEffect(() => {
    fetch(`http://localhost:8000/users?start=${start}&limit=${limit}`)
      .then((res) => res.json())
      .then((res) => setUsers(res.users));
  }, [start, limit]);

  return (
    <div className="users">
      <h1>Assignment - Query String</h1>
      <div className="pageBtn">
        <button onClick={handleQuery}>1</button>
        <button onClick={handleQuery}>2</button>
        <button onClick={handleQuery}>3</button>
        <button onClick={handleQuery}>4</button>
        <button onClick={handleQuery}>5</button>
      </div>
      <CardList users={users} />
    </div>
  );
}

export default Users;
