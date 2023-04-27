import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
function Chitchat() {
    const { idForPerson } = useParams()
    const [items, setItems] = useState([])
    const [text, setText] = useState([])
    const [error, setError] = useState(null);
    const [fName, setfName] = useState(null);
    const [lName, setlName] = useState(null);
    const [skills, setSkills] = useState([]);
    const [imageUrl, setimageUrl] = useState(null);
    const [bio, setBio] = useState('')
    const [linkedin, setLinked] = useState('')
    const [github, setGithub] = useState('')
    const [resume, setResume] = useState('')

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_PORT}/texting/${idForPerson}`, {
                headers: {
                    "auth-token": sessionStorage.getItem("auth-token"),
                },
            }).then(res => {
                console.log(res.data)
                setItems(res.data)
                // res.data.forEach((e) => {
                //     setItems((prevItems) => [...prevItems, e]);
                // });
            })



        axios
            .get(`${process.env.REACT_APP_PORT}/people/${idForPerson}`, {
                headers: {
                    "auth-token": sessionStorage.getItem("auth-token"),
                },
            })
            .then((res) => {
                console.log(res.data);
                if (res.data === "Invalid token") {
                    setError("Login to see their profile");
                } else {
                    if (res.data.imageUrl) {
                        setimageUrl(res.data.imageUrl);
                        // sessionStorage.setItem("imageUrl", res.data.imageUrl);
                    } else {
                        setimageUrl(
                            "https://cdn-icons-png.flaticon.com/128/3237/3237472.png"
                        );
                        // sessionStorage.setItem("imageUrl", res.data.imageUrl);
                    }
                    setfName(res.data.fName);
                    // sessionStorage.setItem("fName", res.data.fName);
                    // sessionStorage.setItem("lName", res.data.lName);
                    setlName(res.data.lName);
                    setBio(res.data.bio)
                    setLinked(res.data.Linkedin)
                    setGithub(res.data.github)
                    setResume(res.data.resume)
                    res.data.skills.forEach((e) => {
                        setSkills((prevItems) => [...prevItems, e]);
                    });
                }
            });
    }, [])
    // console.log(items)
    const list = items.map((i) => {
        if (i.senderId.fName == sessionStorage.getItem('fName')) {
            // console.log('in if', i.msg)x
            return (
                <div
                    class="mr-2 my-2 py-3 px-4 w-2/3 ml-[33.3%] bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                >
                    <p key={i._id} id={i._id} className="right">
                        <span className="You flex justify-between">
                            <span>
                                {i.msg}
                            </span>
                            <span className="time">{i.time}</span>
                        </span>
                    </p>
                </div>
            );
        } else {
            // console.log("in else", i.msg)
            return (
                <div
                    class="ml-2 my-2 py-3 w-2/3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
                >
                    <p key={i._id} id={i._id} className="left ">
                        <span className="Admin flex justify-between">
                            <span>
                                {i.msg}
                            </span>
                            <span className="time">{i.time}</span>
                        </span>
                    </p>
                </div>
            );
        }
    })
    const TextHandler = () => {
        if (items.length !== 0) {
            return (
                <div className="text-container">{list}</div>
            )
        }
        return (
            <div>
            </div>
        )
    }
    const submitMsg = () => {
        if (text !== "") {
            axios
                .post(`${process.env.REACT_APP_PORT}/texting/`, {
                    msg: text,
                    receiverId: idForPerson,
                }, {
                    headers: {
                        "auth-token": sessionStorage.getItem("auth-token"),
                    },
                })
                .then((res) => {
                    console.log(res.data);
                    window.location.href = `/ChitChat/${idForPerson}`;
                });
        }
    }
    return (
        <div className="min-h-screen bg-#ebe8e7 pt-20">
            <Header />

   
             <div className="flex">

             <div className="w-2/6 border-r-[1px shadow-lg h-[900px] py-20 px-20 text-center  ">
             <img alt="..." src={imageUrl} className="w-40 h-40 rounded-full m-auto" />

              <h1 className="text-3xl font-semibold my-20">{fName} {lName}</h1>

              <h3>{bio}</h3>
             </div>

            <div className="w-4/6">
                <TextHandler />
                <div className="msg w-4/6  fixed bottom-2 px-20">
                    <input
                        type="text"
                        className="w-full my-4   text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 rounded-lg"
                        placeholder="Type Your Message"
                        onChange={(e) => {
                            setText(e.target.value);
                        }}
                    ></input>
                    <button onClick={submitMsg} className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
            font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                shadow-lg">
                        Send
                        <span className="first"></span>
                        <span className="second"></span>
                        <span className="third"></span>
                        <span className="fourth"></span>
                    </button>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Chitchat