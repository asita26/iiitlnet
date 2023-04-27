import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import axios from "axios";
import "../CSS/profile.css";
import Access from "./Access";
import { motion } from "framer-motion";
import Header from "./Header";
function Profile() {
  const [fName, setfName] = useState(null);
  const [lName, setlName] = useState(null);
  const [formAns, setformAns] = useState("");
  const [skills, setSkills] = useState([]);
  const [imageUrl, setimageUrl] = useState(null);
  const [useris, SetUseris] = useState(true)
  const [bio, setBio] = useState("Set Bio")
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');
  const [resume, setResume] = useState('')
  let token = sessionStorage.getItem("auth-token");

  const logout=()=>{
    sessionStorage.clear();
    window.location='/'
  }
  useEffect(() => {
    console.log(token)
    if (token) {
      console.log("check 7")
      axios
        .get(`https://2428-117-219-22-193.ngrok-free.app/people/main `, {
          headers: {
            "auth-token": token,
          },
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.imageUrl) {
            setimageUrl(res.data.imageUrl);
            sessionStorage.setItem("imageUrl", res.data.imageUrl);
          } else {
            setimageUrl(
              "https://cdn-icons-png.flaticon.com/128/3237/3237472.png"
            );
            sessionStorage.setItem("imageUrl", res.data.imageUrl);
          }
          setfName(res.data.fName);
          setlName(res.data.lName);
          setBio(res.data.bio)
          setLinkedin(res.data.linkedin)
          setGithub(res.data.github)
          setResume(res.data.resume)
          if (res.data.filledForm) {
            setformAns(res.data.filledForm);
          }

          sessionStorage.setItem("fName", res.data.fName);
          sessionStorage.setItem("lName", res.data.lName);
          res.data.skills.forEach((e) => {
            setSkills((prevItems) => [...prevItems, e]);
          });
        });
    } else {
      setfName("Login Karo");
    }
  }, [token]);
  let skillList = skills.map((i) => {
    return <p key={i}>{i}</p>;
  });
  if (fName === "Login Karo") {
    console.log(fName)
    return <Access />;
  } else {
    return (
      <>

        <motion.main
          initial={{ opacity: 0, y: "-1000px" }}
          animate={{ opacity: 1, y: '-80px' }}
          exit={{ opacity: 0, y: "+1000px" }}
          transition={{ duration: 1 }}
          className="profile-page translate-y-[-100px]">
          <Header/>
          <section className="relative block h-500-px">
            <div className="absolute top-0 w-full h-full bg-center bg-cover bg-profilecover">
              <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
            </div>
            <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px translate-y-[100px]" >
              <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
                <polygon className="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
              </svg>
            </div>
          </section>
          <section className="relative py-16 bg-blueGray-200">
            <div className="container mx-auto px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                <div className="px-6">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                      <div className="relative">
                        <img alt="..." src={imageUrl} className="shadow-xl rounded-full h-40 w-40 align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px" />
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                      <div className="py-6 px-3 mt-32 sm:mt-0">
                        <button className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                          <Link to="./edit">Edit Profile </Link>
                        </button>
                        <button onClick={logout} className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                          Logout
                        </button>
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                      <div className="flex justify-center py-4 lg:pt-4 pt-8">
                        <div className="mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                            <a href={linkedin}>
                              <svg width="40px" height="40px" viewBox="0 0 16 16" fill="none"><path fill="#0A66C2" d="M12.225 12.225h-1.778V9.44c0-.664-.012-1.519-.925-1.519-.926 0-1.068.724-1.068 1.47v2.834H6.676V6.498h1.707v.783h.024c.348-.594.996-.95 1.684-.925 1.802 0 2.135 1.185 2.135 2.728l-.001 3.14zM4.67 5.715a1.037 1.037 0 01-1.032-1.031c0-.566.466-1.032 1.032-1.032.566 0 1.031.466 1.032 1.032 0 .566-.466 1.032-1.032 1.032zm.889 6.51h-1.78V6.498h1.78v5.727zM13.11 2H2.885A.88.88 0 002 2.866v10.268a.88.88 0 00.885.866h10.226a.882.882 0 00.889-.866V2.865a.88.88 0 00-.889-.864z" /></svg>
                            </a>

                          </span>
                        </div>
                        <div className="mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                            <a href={github}>
                              <svg width="40px" height="40px" viewBox="0 0 20 20" version="1.1" >

                                <defs>

                                </defs>
                                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                  <g id="Dribbble-Light-Preview" transform="translate(-140.000000, -7559.000000)" fill="#000000">
                                    <g id="icons" transform="translate(56.000000, 160.000000)">
                                      <path d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399" id="github-[#142]">

                                      </path>
                                    </g>
                                  </g>
                                </g>
                              </svg>
                            </a>
                          </span>


                        </div>
                        <div className="lg:mr-4 p-3 text-center">
                          <a href={resume}>
                            <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                              <svg height="40px" width="40px" version="1.1" id="_x32_"
                                viewBox="0 0 512 512" >

                                <g>
                                  <path class="st0" d="M276.239,252.183c-6.37,2.127-13.165,3.308-20.239,3.308c-7.074,0-13.87-1.181-20.24-3.308
		c-46.272,7.599-70.489,41.608-70.489,82.877H256h90.728C346.728,293.791,322.515,259.782,276.239,252.183z"/>
                                  <path class="st0" d="M256,240.788c27.43,0,49.658-22.24,49.658-49.666v-14.087c0-27.426-22.228-49.659-49.658-49.659
		c-27.43,0-49.658,22.233-49.658,49.659v14.087C206.342,218.548,228.57,240.788,256,240.788z"/>
                                  <path class="st0" d="M378.4,0H133.582C86.234,0,47.7,38.542,47.7,85.899v340.22C47.7,473.476,86.234,512,133.582,512h205.695
		h13.175l9.318-9.301l93.229-93.229l9.301-9.31v-13.174V85.899C464.3,38.542,425.766,0,378.4,0z M432.497,386.985H384.35
		c-24.882,0-45.074,20.183-45.074,45.073v48.139H133.582c-29.866,0-54.078-24.221-54.078-54.078V85.899
		c0-29.874,24.212-54.096,54.078-54.096H378.4c29.876,0,54.096,24.222,54.096,54.096V386.985z"/>
                                </g>
                              </svg>
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-12">
                    <h3 className="text-4xl font-semibold leading-normal  text-blueGray-700 mb-2">
                      {fName} {lName}
                    </h3>
                    {/* <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                      <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                      Los Angeles, California
                    </div> */}
                    <div className="mb-2 text-blueGray-600 mt-10">
                      <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>{skillList}
                      
                    </div>
                    {/*<div className="mb-2 text-blueGray-600">
                      <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                    </div> */}
                  </div>
                  <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-9/12 px-4">
                        <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                          {bio}
                        </p>
                        <a href="#pablo" className="font-normal text-pink-500">Show more</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </section>
        </motion.main>

      </>
    );
  }
}

export default Profile;

//  <div className="overall-container">
//   <div>
//     <img src={imageUrl} alt=""></img>
//   </div>
//   <div>
//     <p className="name">
//       {fName} {lName}
//     </p>
//     <Link to="./edit">Edit Profile </Link>
//   </div>
// </div>
// <div>Your Skills:</div>
// {skillList.length !== 0 ? (
//   <>{skillList}</>
// ) : (
//   <>Edit your profile to add Skills</>
// )}
// <div>
//   {formAns !== "" && (
//     <>
//       <br></br>You Have opted {formAns} as the Answer for Question asked
//     </>
//   )}
// </div>