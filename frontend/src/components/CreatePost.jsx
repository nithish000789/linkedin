import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [text, setText] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("/api/posts", { text }, { headers: { Authorization: `Bearer ${token}` } });
      nav("/feed");
    } catch (err) {
      alert(err.response?.data?.message || "Could not create post");
    }
  };

  return (
    <form onSubmit={submit} style={{maxWidth:600, margin:"20px auto"}}>
      <h2>Create Post</h2>
      <textarea className="input" rows="5" value={text} onChange={e=>setText(e.target.value)} placeholder="What's on your mind?" />
      <button className="button">Post</button>
    </form>
  );
}
