import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
// import "../CSS/people.css";
export default function People() {
  const [items, setItems] = useState([]);
  // const [frnds, setFrnds] = useState([]);
  const [newItems, setnewItems] = useState([]);
  const [search, setSearch] = useState("all");
  const [msg, setMsg] = useState(null);
  const { idForPerson } = useParams();
  let navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_PORT}/user/getfrnds`, {
        headers: {
          "auth-token": sessionStorage.getItem("auth-token"),
        },
      })
      .then((res) => {
        console.log(res.data);
      });
    axios.get(`${process.env.REACT_APP_PORT}/people`).then((res) => {
      res.data.people.forEach((e) => {
        setItems((prevItems) => [...prevItems, e]);
      });
    });
    setnewItems(items);
  }, []);
  const handleClick = (e) => {
    navigate(`/person/${e.target.id}`);
  };
  const searchFun = (e) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    if (search === "all") {
      setnewItems(items);
      console.log(newItems)
      setMsg(null);
    } else {
      let re = new RegExp(search, "i");
      const check = items.filter((i) => {
        return re.test(`${i.fName} ${i.lName}`);
      });
      if (check.length !== 0) {
        setnewItems(check);
        setMsg(null);
      } else {
        setMsg(`No user Found with ${search}`);
      }
    }
  }, [search, items]);
  // }else{
  //     console.log(items.map((i)=>{
  //         return i.fName===search
  //     }))
  // }
  // const addFrnd = (e) => {
  //     console.log(e.target.key)
  // }
  const list = newItems.map((i) => {
    return (
      <p key={i._id} id={i._id} onClick={handleClick}>
        {i.fName} {i.lName}
        {/* <span onClick={addFrnd} key={i._id}>Add Friend</span> */}
      </p>
    );
  });
  return (
    <>
     <Header/>
      <div className="people bg-#ebe8e7 min-h-screen translate-y-[-30px] py-20">
        <input
          type="text"
          onChange={searchFun}
          id="search"
          placeholder="Search User"
          className=" block  my-4 m-auto  w-1/2  text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
          autoComplete="off"
        ></input>
        <div className="my-5 text-center">
        {msg ? (
          <span className="error">{msg}</span>
          ) : (
            <label htmlFor="search" style={{ fontSize: "20px" }}>
            {" "}
            Searching for {search}
            </label>
            )}
            </div>
        <div className="grid grid-flow-row grid-cols-3 px-80 gap-x-20 gap-y-20 py-10 ">
        {
          newItems.map((item,index)=>{
            return(
              <div key={item._id} id={item._id} onClick={handleClick} className="cursor-pointer shadow-lg rounded-xl w-80 h-60  py-20 text-center ">
              <img className="rounded-full w-28 h-28 translate-y-[-100px] m-auto" src={item.imageUrl || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} alt="" />
                <p className="text-xl font-medium translate-y-[-70px]">
                {item.fName} <span className="mx-2"></span> {item.lName}
                </p>
              </div>
            )
          })
        }
        </div>
      </div>
    </>
  );
}
