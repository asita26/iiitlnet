import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/home.css";
import axios from "axios";
import Card from "./Card";
import Header from "./Header";

export default function Feed() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_PORT}/feeds`).then((res) => {
      let dt=res.data
      dt.reverse()
      setData(dt);
    });
  }, []);
  const addEvent = () => {
    if (sessionStorage.getItem("auth-token")) {
      navigate("/add-event");
    } else {
      setError("Login to add an event");
    }
  };
  return (
    <div className="bg-#F2C76E">
    <Header/>
      <div className="grid grid-flow-row grid-cols-3 mx-20 gap-x-20 ">

        {data.map((ele) => {
          {console.log(ele)}
          return (
            <Card
              fName={ele.personId.fName}
              lName={ele.personId.lName}
              content={ele.content}
              venue={ele.venue}
              time={ele.time}
              desc={ele.desc}
            />
          );
        })}
      </div>
      {error && <p className="error">{error}</p>}
      <div className="flex items-center">
      <button onClick={addEvent}  className="bg-indigo-500 text-gray-100 p-4 w-[300px]  mb-20 m-auto rounded-full tracking-wide
      font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
      shadow-lg">Add Event</button>
      </div>
    </div>
  );
}
