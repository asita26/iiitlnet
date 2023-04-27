import React, { useRef } from "react";
import "./CSS/style.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import Home from "./Components/Home";
import People from "./Components/People";
import Person from "./Components/Person";
import Admin from "./Components/Admin";
import Chat from "./Components/Chat";
import ChitChat from "./Components/Chitchat";
import Text from "./Components/Text";
import EditProfile from "./Components/EditProfile";
import AddFeed from "./Components/AddFeed";
import HomePage from "./Components/HomePage";
import Feed from "./Components/Feed";
import Signup from "./Components/Signup";
import UserFeed from "./Components/UserFeed";
import CreatePost from "./Components/CreatePost";

export default function Main() {
  const [text, setText] = useState("Login");
  const [active, setActive] = useState(false);
  const token = sessionStorage.getItem("auth-token");
  const hamburger = useRef();
  const navMenu = useRef();

  useEffect(() => {
    if (token) {
      setText("Logout");
    } else {
      setText("Login");
    }
  }, [token]);

  const handleClick = () => {
    if (active) {
      setActive(false);
    } else {
      setActive(true);
    }
  };

  const linkClick = () => {
    setActive(false);
  };

  const loginClick = () => {
    setActive(false);
    if (sessionStorage.getItem("auth-token")) {
      window.location.href = "/";
    }
  };
  
  return (
    <Router>
     
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/events" element={<Home />} />
        <Route path="/addpost" element={<CreatePost />} />
        <Route path="/feed" element={<UserFeed />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/people" element={<People />} />
        <Route path="/text" element={<Text />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/add-event" element={<AddFeed />} />
        <Route path="/person/:idForPerson" element={<Person />} />
        <Route path="/chat/:idForPerson" element={<Chat />} />
        <Route path="/ChitChat/:idForPerson" element={<ChitChat />} />
      </Routes>
    </Router>
  );
}
