import React, { useState, useEffect, useRef } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../CSS/login.css";
import { motion } from "framer-motion";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const clientId = process.env.REACT_APP_CLIENT_ID;

function Signup() {
  const logoutBtn = useRef();
  const [sign, setSign] = useState(false);
  const [log, setLog] = useState(true);
  const [email, setEmail] = useState(null);
  const [pass, setPass] = useState(null);
  const [text, setText] = useState("SignUp");
  const [msg, setMsg] = useState(null);
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const object = {
      fName: data["First name"],
      lName: data["Last name"],
      email: data["Email"],
      password: data["Password"],
      bio:"Add Bio",
      worked_history:"none",
      currtly_working:"none",
      github:"none",
      linkedin:"",
      resume:""
    };
    if (
      data["Password"] === data["Confirm Password"] &&
      data["Password"].length >= 7
    ) {
      console.log("check")
      axios
        .post(`http://localhost:5000/register`, object)
        .then((res) => {
          if (res.data.error) {
            toast( res.data.error)
            setMsg(res.data.error);
          }
        });
        window.location.href = `/login`;
    } else if (data["Password"].length < 7) {
      toast("Password length should be greater than 6")
      setMsg("Password length should be greater than 6");
    } else {
      toast("Passwords didn't match")
      setMsg("Passwords didn't match");
    }

  };

  useEffect(() => {
    // logoutBtn.current.click();
    sessionStorage.clear();
  }, []);
  const onLoginSuccess = (res) => {
    console.log("Login Success:", res.profileObj);
    sessionStorage.setItem("fName", res.profileObj.givenName);
    sessionStorage.setItem("lName", res.profileObj.familyName);
    sessionStorage.setItem("imageUrl", res.profileObj.imageUrl);
    sessionStorage.setItem(
      "auth-token",
      `${process.env.REACT_APP_AUTH_GOOGLE}$$$${res.profileObj.email}`
    );
    const object = {
      fName: res.profileObj.givenName,
      lName: res.profileObj.familyName,
      imageUrl: res.profileObj.imageUrl,
      email: res.profileObj.email,
      googleId: res.profileObj.googleId,
    };
    axios.post(`${process.env.REACT_APP_PORT}/register`, object).then((res) => {
      if (res.data.error) {
        setMsg(res.data.error);
      }
    });

    window.location.href = `/login`;
  };
  const onLoginFailure = (res) => {
    console.log("Login Failed:", res);
  };
  const signUp = () => {
    if (log) {
      setSign(true);
      setLog(false);
      setText("SignIn");
    } else {
      setSign(false);
      setLog(true);
      setText("SignUp");
    }
  };
  const onLogout = () => {
    sessionStorage.clear();
  };
  const btnClicked = (event) => {
    event.preventDefault();
    console.log("checlk2")
    axios
      .post(`http://localhost:5000/login`, {
        email: email,
        password: pass,
      })
      .then((res) => {
        if (res.data.error) {
          toast(res.data.error)
          setMsg(res.data.error);
        } else {
          sessionStorage.setItem("auth-token", res.data);
          window.location.href = `/login`;
        }
      });
  };
  return (
    <div className="login-container h-screen bg-white  translate-y-[-80px]  ">
    <div class="text-2xl py-4 px-20 text-indigo-800 tracking-wide ml-2 font-semibold">
        <img src="https://ik.imagekit.io/cmef8hxb6/Screenshot_2023-04-24_at_20.42.53_05THu9eNw.png?updatedAt=1682428505847" alt="" />
      </div>
      <ToastContainer/>
      <div className="inner-container">
        <div className="grid grid-flow-row grid-cols-2 gap-x-80  bg-white px-40 py-20">
          <form onSubmit={handleSubmit(onSubmit)}>
          <h2 class="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
          xl:text-bold">SignUp</h2>
             
          <div class="text-sm font-bold text-gray-700 tracking-wide my-2">First Name</div>
            <input
              type="text"
              className="w-full my-4   text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
              placeholder="First name"
              {...register("First name", { required: true, maxLength: 80 })}
            />
            <div class="text-sm font-bold text-gray-700 tracking-wide my-2">Last Name</div>
            <input
            className="w-full my-4   text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
              type="text"
              placeholder="Last name"
              {...register("Last name", { required: true, maxLength: 100 })}
            />
            <div class="text-sm font-bold text-gray-700 tracking-wide my-2">Email Address</div>
            <input
            className="w-full my-4   text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
              type="email"
              placeholder="Email"
              {...register("Email", {
                required: true,
                pattern: /^\S+@\S+$/i,
              })}
            />
            <div class="text-sm font-bold text-gray-700 tracking-wide my-2">Password</div>
            <input
            className="w-full my-4   text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
              type="password"
              placeholder="Password"
              {...register("Password", { required: true, min: 7 })}
            />
            <div class="text-sm font-bold text-gray-700 tracking-wide my-2">Confirm Password</div>
            <input
            className="w-full my-4   text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
              type="password"
              placeholder="Confirm Password"
              {...register("Confirm Password", { required: true, min: 7 })}
            />
            <button type="submit" className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
            font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
            shadow-lg">
            
              SignUp
              <span className="first"></span>
              <span className="second"></span>
              <span className="third"></span>
              <span className="fourth"></span>
            </button>
            <p className=" text-center my-5 ">Already have an Account??  <a  className="mx-2 text-blue-500" href='/login'>SIGN IN</a> </p>
          </form>


          <div className="h-[400px] w-[400px]">
          <lottie-player src="https://assets1.lottiefiles.com/packages/lf20_0mohmgca.json" background="transparent" speed="1" loop autoplay></lottie-player>
        </div>



        </div>

      </div>
     

    </div>
  );
}
export default Signup;
  // <div className="inner-container">
  //         {log && (
  //           <form>
  //             <input
  //               type="email"
  //               autoComplete="off"
  //               placeholder="Email Address"
  //               onChange={(e) => {
  //                 setEmail(e.target.value);
  //               }}
  //               required
  //             ></input>
  //             <input
  //               type="password"
  //               autoComplete="off"
  //               placeholder="Password"
  //               onChange={(e) => {
  //                 setPass(e.target.value);
  //               }}
  //               required
  //             ></input>
  //             <button type="submit" onClick={btnClicked}>
  //               SignIn
  //               <span className="first"></span>
  //               <span className="second"></span>
  //               <span className="third"></span>
  //               <span className="fourth"></span>
  //             </button>
  //             {msg !== null && <p className="error">{msg}</p>}
  //           </form>
  //         )}
  //         {sign && (
    // {msg !== null && <p className="error">{msg}</p>}