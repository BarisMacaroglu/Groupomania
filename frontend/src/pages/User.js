import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";

function User() {
    
  const [listOfUsers, setListOfUsers] = useState([]);

  const headers = {
    headers: { authorization: "Bearer " + localStorage.getItem("token") },
  };
  let history = useHistory();

  useEffect(() => {
    Axios.get("http://localhost:3001/users", headers)
      .then((response) => {
        console.log(response.data.results);
        setListOfUsers(response.data.results);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="users_container">
        <h4>Tous les utilisateurs du site :</h4>
        <div className="all_users">
            {listOfUsers.map((value, key) => {
                return (
                    <div className="user" key={key} onClick={() => {history.push(`/users/${value.id}`)}}>
                        <p>{value.first_name} {value.last_name}</p>
                        <img className="profile__photo--small" alt={"Photo de profile de " + value.first_name + " " + value.last_name} src={value.image_url}/>
                    </div>
                )
            })}
        </div>
    </div>
  );
}

export default User;
