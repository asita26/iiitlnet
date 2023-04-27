import React, { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/login.css";
import Header from "./Header";
import { motion } from "framer-motion";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function AddFeed() {
  const [content, setContent] = useState("");
  const [registration, setRegistration] = useState("");
  const [venue, setVenue] = useState("");
  const [desc,setDesc]=useState("")
  const [error, setError] = useState("");
  const sendRequest = () => {
    if (sessionStorage.getItem("auth-token")) {

      axios
        .post(
          `${process.env.REACT_APP_PORT}/feeds`,
          {
            content: content,
            desc:desc,
            registration: registration,
            venue: venue,
          },
          {
            headers: {
              "auth-token": sessionStorage.getItem("auth-token"),
            },
          }
        )
        .then((res) => {
            window.location.href = '/events'
          // setError(res.data);
        });
    } else {
      setError("Login to set an event");
      toast("Login to set an event")
    }
  };
  return (
    <motion.div
    className="translate-y-[-80px]"
    initial={{ opacity: 0,x:"1000px" }}
    animate={{ opacity: 1,x:'0px' }}
    exit={{ opacity: 0,x:"-1000px" }}
    transition={{ duration: 1 }}
    >
    <Header/>
    <ToastContainer/>
    <div className="login-container gap-x-60 bg-#ebe8e7 min-h-screen translate-y-[0px] grid-flow-row grid grid-cols-2 px-20 py-60">
    
    <div>
    <div className="feed-form">
    <div className="feed-inputs inner-container">
    <input type="text" placeholder="Title of Event"  className="w-full my-4   text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 rounded-lg" onChange={(e) => setContent(e.target.value)} />
    <textarea name="" className="w-full my-4   text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 rounded-lg" placeholder="Description of Event" onChange={(e) => setDesc(e.target.value)}  id="" cols="30" rows="10"></textarea>
     <input  className="w-full my-4   text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 rounded-lg" type="text" placeholder="Venue of event" onChange={(e) => setVenue(e.target.value)} />
     
        </div>
        <button className="bg-indigo-500 my-10 text-gray-100 p-4 w-full rounded-full tracking-wide
        font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
        shadow-lg" onClick={sendRequest}>
        Submit
        <span className="first"></span>
        <span className="second"></span>
        <span className="third"></span>
        <span className="fourth"></span>
        </button>
        </div>
        {error && <p className="error">{error}</p>}
        </div>
        
        
        <div className="h-[500px] w-[500px]">
        <lottie-player src="https://assets8.lottiefiles.com/packages/lf20_yBigEm5Qmk.json" background="transparent" speed="1" loop autoplay></lottie-player>
      </div>
      
      </div>
    </motion.div>
  );
}
