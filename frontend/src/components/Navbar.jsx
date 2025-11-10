import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const name = JSON.parse(localStorage.getItem("user") || "null")?.name;
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };
  return (
    <div className="nav">
      <div><Link to="/feed" style={{color:"white", textDecoration:"none"}}>Nithish Social</Link></div>
      <div>
        {name ? (
          <>
            <span style={{marginRight:12}}>{name}</span>
            <button className="button" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/" style={{color:"white", marginRight:12}}>Login</Link>
            <Link to="/signup" style={{color:"white"}}>Signup</Link>
          </>
        )}
      </div>
    </div>
  );
}
