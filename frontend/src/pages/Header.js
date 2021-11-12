import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";

function Header() {

  const headers = {
    headers: { authorization: "Bearer " + localStorage.getItem("token") },
  };

  let history = useHistory();
  let { id } = useParams();

  return (
    <div>
      <header>
        <nav>
          <a>
            <img alt=""></img>
          </a>
          <Link to="/posts">Posts</Link>
        </nav>
      </header>
    </div>
  );
}

export default Header;
