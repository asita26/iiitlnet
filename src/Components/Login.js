import React, { useState, useEffect, useRef } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../CSS/login.css";
import { motion } from "framer-motion";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const clientId = process.env.REACT_APP_CLIENT_ID;

function Login() {
  const logoutBtn = useRef();
  const [sign, setSign] = useState(false);
  const [log, setLog] = useState(true);
  const [email, setEmail] = useState(null);
  const [pass, setPass] = useState(null);
  const [text, setText] = useState("SignUp");
  const [msg, setMsg] = useState(null);
  const { register, handleSubmit } = useForm();
  // const allowedDomain = new RegExp(/^[a-zA-Z0-9._%+-]+@iiitl.ac.in$/);

  const onSubmit = (data) => {
    const object = {
      fName: data["First name"],
      lName: data["Last name"],
      email: data["Email"],
      password: data["Password"],
    };
  
    if (
      data["Password"] === data["Confirm Password"] &&
      data["Password"].length >= 7
      
    ) {
      console.log("check")
      axios
        .post(`https://2428-117-219-22-193.ngrok-free.app/register`, object)
        .then((res) => {
          if (res.data.error) {
            setMsg(res.data.error);
            toast(res.data.error);
          }
        });
    } else if (data["Password"].length < 7) {

      setMsg("Password length should be greater than 6");
    } else {
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
        toast(res.data.error)
      }
    });

    window.location.href = `/`;
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
      .post(`https://2428-117-219-22-193.ngrok-free.app/login`, {
        email: email,
        password: pass,
      })
      .then((res) => {
        if (res.data.error) {
          setMsg(res.data.error);
          toast(res.data.error)
        } else {

          sessionStorage.setItem("auth-token", res.data);
          window.location.href = `/profile`;
        }
      });
  };
  return (
    <div className="login-container h-screen bg-#ebe8e7 translate-y-[-80px]  ">
      <div class="text-2xl py-4 px-20 text-indigo-800 tracking-wide ml-2 font-semibold">
        <img src="https://ik.imagekit.io/cmef8hxb6/Screenshot_2023-04-24_at_20.42.53_05THu9eNw.png?updatedAt=1682428505847" alt="" />
      </div>
      <ToastContainer/>

      <div className="inner-container">
        <div className="grid grid-flow-row grid-cols-2 gap-x-80  bg-#ebe8e7 px-40 py-40">


          {log && (
            <form className="gap-y-30">
              <h2 class="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
                    xl:text-bold">Log in</h2>
              <div class="text-sm font-bold text-gray-700 tracking-wide my-4">Email Address</div>
              <input type="email" required onChange={(e) => {
                setEmail(e.target.value);
              }} class="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder="mike@gmail.com" />

              <div class="text-sm font-bold text-gray-700 tracking-wide  my-4">Password </div>
              <input
                className="w-full my-4   text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                type="password"

                placeholder="Password"
                onChange={(e) => {
                  setPass(e.target.value);
                }}
                required
              ></input>
              <button type="submit" onClick={btnClicked}
                className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                                shadow-lg"
              >
                SignIn
                <span className="first"></span>
                <span className="second"></span>
                <span className="third"></span>
                <span className="fourth"></span>
              </button>
            
              <p className=" text-center my-5 ">Dont have an Account??  <a  className="mx-2 text-blue-500" href='signup'>SIGN UP</a> </p>
            </form>
          )}

          <div className="h-[400px] w-[400px]">
            <lottie-player src="https://assets5.lottiefiles.com/packages/lf20_jcikwtux.json" background="transparent" speed="1" loop autoplay></lottie-player>
          </div>
        </div>
        {sign && (
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                placeholder="First name"
                {...register("First name", { required: true, maxLength: 80 })}
              />
              <input
                type="text"
                placeholder="Last name"
                {...register("Last name", { required: true, maxLength: 100 })}
              />
              <input
                type="email"
                placeholder="Email"
                {...register("Email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
              />
              <input
                type="password"
                placeholder="Password"
                {...register("Password", { required: true, min: 7 })}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                {...register("Confirm Password", { required: true, min: 7 })}
              />
              <button type="submit">
                SignUp
                <span className="first"></span>
                <span className="second"></span>
                <span className="third"></span>
                <span className="fourth"></span>
              </button>
              {msg !== null && <p className="error">{msg}</p>}
            </form>
          </div>
        )}
      </div>


    </div>
  );
}
export default Login;
// <GoogleLogin
      //   clientId={clientId}
      //   render={(renderProps) => (
      //     <button onClick={renderProps.onClick}>
      //       Continue with Google
      //       <span className="first"></span>
      //       <span className="second"></span>
      //       <span className="third"></span>
      //       <span className="fourth"></span>
      //     </button>
      //   )}
      //   buttonText="Login"
      //   onSuccess={onLoginSuccess}
      //   onFailure={onLoginFailure}
      // />

      // <GoogleLogout
      //   clientId={clientId}
      //   render={(renderProps) => (
      //     <button
      //       onClick={renderProps.onClick}
      //       className="logoutBtn"
      //       ref={logoutBtn}
      //     >
      //       Logout
      //     </button>
      //   )}
      //   buttonText="Logut"
      //   onLogoutSuccess={onLogout}
      // ></GoogleLogout>