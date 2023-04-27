import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../CSS/profile.css";
import { app } from "./firebase";
import {
  getDownloadURL,
  getStorage,
  ref as storageRef,
  uploadBytesResumable,
} from "firebase/storage";
export default function EditProfile() {
  const storage = getStorage(app);
  const [fName, setfName] = useState();
  const [lName, setlName] = useState();
  const [skills, setSkills] = useState([]);
  const [bio,setBio]=useState("Add Bio")
  const [linkedin,setLinkedin]=useState('');
  const [github,setGithub]=useState('');
  const [resume ,setResume]=useState('')
  const [image,setImage]=useState('')
  const [imageUrl,setImageUrl]=useState('')
  const [load,setLoad]=useState(false)
  const First = useRef();
  const Last = useRef();
  const [showimage,setshowimage]=useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5mXv-w9ZQrxHukXNzlitchfNCIy-7Re29qkUCRehH-A&usqp=CAU&ec=48600112')
  useEffect(() => {
    setfName(sessionStorage.getItem("fName"));
    setlName(sessionStorage.getItem("lName"));
    First.current.value = sessionStorage.getItem("fName");
    Last.current.value = sessionStorage.getItem("lName");
  }, []);

  const handleClick = () => {

    if(image){
      const fileRef = storageRef(storage, `/files/${Math.random() * 10000}`);
      const uploadTask = uploadBytesResumable(fileRef, image);
      uploadTask.on(
          "state_changed",
          (snapshot) => {
              const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
              switch (snapshot.state) {
                  case "paused":
                      console.log("Upload is paused");
                      break;
                  case "running":
                      console.log("Upload is running");
                      break;
              }
          },
          (error) => { },
          async () => {
              await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                   console.log(url)
                   setImageUrl(url)
                   console.log(imageUrl)
                   setLoad(true)
                   
                    console.log(url)
                    console.log("func")
                    if (fName !== "" || fName !== " " && load) {
                      setLoad(false)
                      console.log(
                        {
                          fName: fName,
                          lName: lName,
                          skills: skills,
                          imageUrl:url,
                          bio:bio,
                          github:github,
                          linkedin:linkedin,
                          resume:resume
                        } 
                        )
                        axios
                        .post(
                          `http://localhost:5000/user/edit`,
                          {
                            fName: fName,
                            lName: lName,
                            skills: skills,
                            imageUrl:url,
                            bio:bio,
                            github:github,
                            linkedin:linkedin,
                            resume:resume
                        },
                        {
                          headers: {
                            "auth-token": sessionStorage.getItem("auth-token"),
                          },
                        }
                        )
                        .then((res) => {
                          console.log(res);
                        if (res.data === "updated succesfully") {
                          console.log("updated")
                          window.location.href = "/profile";
                        }
                      });
                    }
                  
              }).then((url)=>{
              
              })
          }
      );
  
    }

   

   
  };
  const skillChange = (e) => {
    console.log(skills)
    let check = skills.find((i) => {
      return i === e.target.value;
    });
    if (check === undefined) {
      setSkills((prevItems) => [...prevItems, e.target.value]);
    }
  };
  const removeme=(i)=>{
    let data=skills;
    data.splice(i,1);
    setSkills(data)
  }
  let skillList = skills.map((i) => {
    return (
      <p key={i}>
        {i} <span >X</span>
      </p>
    );
  });
  const chnageiage=(e)=>{
    console.log("fuck")
    setImage(e.target.files[0]) 
    console.log(image) 
    setshowimage(URL.createObjectURL(image))
    console.log(showimage)
  }

  return (
    <>
      <div className="bg-white min-h-screen translate-y-[-77px]">
      <div className="py-20 m-auto w-2/3 ">
      <p>
      <div className="text-center">
       {showimage &&
         <img src={showimage}  className="rounded-full w-[150px] h-[150px] m-auto" alt="" />
      }
      <input
      class="w-[130px] my-2 text-lg py-2 m-auto border-gray-300 focus:outline-none focus:border-indigo-500"
      type="file"
      
      onChange={chnageiage}
      ></input>
      </div>
      First Name :{" "}
      <input
      class="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
      type="text"
      ref={First}
      onChange={(e) => setfName(e.target.value)}
      ></input>
      </p>
      <p>
      Last Name :{" "}
      <input
      class="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
      type="text"
      ref={Last}
      onChange={(e) => setlName(e.target.value)}
      ></input>
        </p>
        <div  class="skills w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500">Skills You selected: {skillList}</div>
        <select class="skills w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" onChange={skillChange}>
        <option value="Select your skills">Select your skills</option>
        <option value="Web Development">Web Development</option>
        <option value="App Development">App Development</option>
        <option value="AI-ML">AI-ML</option>
        <option value="CyberSecurity">CyberSecurity</option>
        <option value="Design">Design</option>
        <option value="Content">Content</option>
      
        </select>
         
        BIO:
        <textarea  onChange={(e)=>{
           setBio(e.target.value)
        }} name="" class="w-full text-lg py-2 border-b my-2 border-gray-300 focus:outline-none focus:border-indigo-500" id="" cols="30" rows="5"></textarea>
          
        Github:
        <input  onChange={(e)=>{
          setGithub(e.target.value)
        }} class="skills w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="text" />

        Linkedin:
        <input  onChange={(e)=>{
          setLinkedin(e.target.value)
        }} class="skills w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="text" />


        Resume:
        <input  onChange={(e)=>{
          setResume(e.target.value)
        }} class="skills w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="text" />

        <button onClick={handleClick}  className="bg-indigo-500 my-10  text-gray-100 p-4 w-[300px] block m-auto rounded-full tracking-wide
        font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
        shadow-lg">
        Submit
        <span className="first"></span>
        <span className="second"></span>
        <span className="third"></span>
        <span className="fourth"></span>
        </button>
        </div>
        </div>
    </>
  );
}
