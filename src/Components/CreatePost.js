import React,{useState} from 'react'
import axios from "axios";
import { app } from './firebase';
import Header from "./Header";
import {
    getDownloadURL,
    getStorage,
    ref as storageRef,
    uploadBytesResumable,
  } from "firebase/storage";
import { motion } from "framer-motion";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CreatePost = () => {
    const storage = getStorage(app);
    const [desc,setDesc]=useState('');
    const [image,setImage]=useState('');
     const [showimage,setShowImage]=useState(null)
     const [wow,setWow]=useState(null)
     const [load,setLoad]=useState(false)
    const func= (e)=>{
        e.preventDefault();

        if(showimage){
            const fileRef = storageRef(storage, `/files/${Math.random() * 10000}`);
            const uploadTask = uploadBytesResumable(fileRef, showimage);
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
                         setLoad(true)
                          console.log("func")
                          if (sessionStorage.getItem("auth-token")) {
                            axios
                              .post(
                                `http://localhost:5000/addpost`,
                                {
                                   desc: desc,
                                   name: sessionStorage.getItem('fName')+" "+sessionStorage.getItem('lName'),
                                   image:url,
                                   userimage: sessionStorage.getItem("imageUrl")
                                },
                                {   
                                  headers: {
                                    "auth-token": sessionStorage.getItem("auth-token"),
                                  },
                                }
                              )
                              .then((res) => {
                                console.log(res.data)
                                toast(res.data)
                                  window.location.href = '/feed'
                              });
                          } else {
                            toast("Login to set an event")
                          }
                        
                    }).then((url)=>{
                    
                    })
                }
            );
        
          }
          else{
            if (sessionStorage.getItem("auth-token")) {
                axios
                  .post(
                    `http://localhost:5000/addpost`,
                    {
                       desc: desc,
                       name: sessionStorage.getItem('fName')+" "+sessionStorage.getItem('lName'),
                       userimage: sessionStorage.getItem("imageUrl")
                    },
                    {   
                      headers: {
                        "auth-token": sessionStorage.getItem("auth-token"),
                      },
                    }
                  )
                  .then((res) => {
                    console.log(res.data)
                    toast(res.data)
                      window.location.href = '/feed'
                  });
              } else {
                toast("Login to set an event")
              }
            }
    }

    const changepostimage=(e)=>{
        console.log("changed")
        setShowImage(e.target.files[0]);
        console.log(showimage)
        setWow(
            URL.createObjectURL(showimage)
        )
    }
  return (
    <div className='bg-white min-h-screen'>
     <Header/>
     <ToastContainer/>
    <div className='py-40 px-40 grid-flow-row grid grid-cols-2 gap-x-60 bg-white'>
    <div>
    <div className='my-5'>
     {wow && 
      <img className='w-full h-80' src={wow} alt="" />
  }
    </div>
    <div class="text-sm font-bold text-gray-700 tracking-wide  my-4">Image</div>
    <input onChange={changepostimage}  placeholder='image' className="w-full my-4   text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="file"  name="" id="" />
    <div class="text-sm font-bold text-gray-700 tracking-wide  my-4">Description</div>
    <textarea placeholder='Description'  className="w-full my-4   text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"  type="text"  onChange={(e)=>{setDesc(e.target.value)}} name="" id="" />
    <button onClick={func}  className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
    font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
    shadow-lg">Add Post</button>
    </div>


    <div className="h-[500px] w-[500px]">
            <lottie-player src="https://assets2.lottiefiles.com/private_files/lf30_noq8b0i9.json" background="transparent" speed="1" loop autoplay></lottie-player>
   </div>


    </div>



    </div>
  )
}

export default CreatePost
