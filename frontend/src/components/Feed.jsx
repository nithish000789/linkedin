import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("/api/posts")
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container" style={{maxWidth:800}}>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12}}>
        <h2>Feed</h2>
        <Link to="/create"><button className="button">Create Post</button></Link>
      </div>
      {posts.map(p => (
        <div className="post" key={p._id}>
          <strong>{p.user?.name || "Unknown"}</strong>
          <p>{p.text}</p>
          <small>{new Date(p.createdAt).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}
