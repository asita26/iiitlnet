import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Chat() {
  const { idForPerson } = useParams();
  const [items, setItems] = useState([]);
  const [text, setText] = useState("");
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_PORT}/admin/view/${idForPerson}`, {
        headers: {
          "auth-token": sessionStorage.getItem("admin"),
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data !== "NTG") {
          res.data.forEach((e) => {
            setItems((prevItems) => [...prevItems, e]);
          });
        }
      });
  }, [idForPerson]);

  const submitMsg = () => {
    if (text !== "") {
      axios
        .post(`${process.env.REACT_APP_PORT}/admin/msg`, {
          sender: "Admin",
          msg: text,
          personId: idForPerson,
        })
        .then((res) => {
          console.log(res.data);
          window.location.href = `/chat/${idForPerson}`;
        });
    }
  };

  // const list = items.map((i) => {
  //   if (i.sender === "You") {
  //     return (
  //       <p key={i._id} id={i._id} className="right">
  //         <span className="You">
  //           {i.msg}
  //           <span className="time">{i.time}</span>
  //         </span>
  //       </p>
  //     );
  //   } else if (i.sender === "Admin") {
  //     return (
  //       <p key={i._id} id={i._id} className="left">
  //         <span className="Admin">
  //           {i.msg}
  //           <span className="time">{i.time}</span>
  //         </span>
  //       </p>
  //     );
  //   }
  //   return <>Nothing</>;
  // });
  return (
    <>
    <div class=" mx-auto shadow-lg rounded-lg min-h-screen   translate-y-[-80px] w-full">
    
<div class="px-5  py-5 flex justify-between items-center  bg-white border-b-2">
  <div class="font-semibold text-2xl">GoingChat</div>
  <div class="w-1/2">
    <input
      type="text"
      name=""
      id=""
      placeholder="search IRL"
      class="rounded-2xl bg-gray-100 py-3 px-5 w-full"
    />
  </div>
  <div
    class="h-12 w-12 p-2 bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center"
  >
    RA
  </div>
</div>

<div class="flex flex-row justify-between h-[680px]  w-full bg-white">
 
  <div class="flex flex-col w-2/5 border-r-2 overflow-y-auto">
    
    <div class="border-b-2 py-4 px-2">
      <input
        type="text"
        placeholder="search chatting"
        class="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
      />
    </div>
    
    <div
      class="flex flex-row py-4 px-2 justify-center items-center border-b-2"
    >
      <div class="w-1/4">
        <img
          src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
          class="object-cover h-12 w-12 rounded-full"
          alt=""
        />
      </div>
      <div class="w-full">
        <div class="text-lg font-semibold">Luis1994</div>
        <span class="text-gray-500">Pick me at 9:00 Am</span>
      </div>
    </div>
    <div class="flex flex-row py-4 px-2 items-center border-b-2">
      <div class="w-1/4">
        <img
          src="https://source.unsplash.com/otT2199XwI8/600x600"
          class="object-cover h-12 w-12 rounded-full"
          alt=""
        />
      </div>
      <div class="w-full">
        <div class="text-lg font-semibold">Everest Trip 2021</div>
        <span class="text-gray-500">Hi Sam, Welcome</span>
      </div>
    </div>
    <div
      class="flex flex-row py-4 px-2 items-center border-b-2 border-l-4 border-blue-400"
    >
      <div class="w-1/4">
        <img
          src="https://source.unsplash.com/L2cxSuKWbpo/600x600"
          class="object-cover h-12 w-12 rounded-full"
          alt=""
        />
      </div>
      <div class="w-full">
        <div class="text-lg font-semibold">MERN Stack</div>
        <span class="text-gray-500">Lusi : Thanks Everyone</span>
      </div>
    </div>
    <div class="flex flex-row py-4 px-2 items-center border-b-2">
      <div class="w-1/4">
        <img
          src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
          class="object-cover h-12 w-12 rounded-full"
          alt=""
        />
      </div>
      <div class="w-full">
        <div class="text-lg font-semibold">Javascript Indonesia</div>
        <span class="text-gray-500">Evan : some one can fix this</span>
      </div>
    </div>
    <div class="flex flex-row py-4 px-2 items-center border-b-2">
      <div class="w-1/4">
        <img
          src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
          class="object-cover h-12 w-12 rounded-full"
          alt=""
        />
      </div>
      <div class="w-full">
        <div class="text-lg font-semibold">Javascript Indonesia</div>
        <span class="text-gray-500">Evan : some one can fix this</span>
      </div>
    </div>

    <div class="flex flex-row py-4 px-2 items-center border-b-2">
      <div class="w-1/4">
        <img
          src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
          class="object-cover h-12 w-12 rounded-full"
          alt=""
        />
      </div>
      <div class="w-full">
        <div class="text-lg font-semibold">Javascript Indonesia</div>
        <span class="text-gray-500">Evan : some one can fix this</span>
      </div>
    </div>

  </div>
  
  <div class="w-full px-5 flex flex-col justify-between">
    <div class="flex flex-col mt-5">
      <div class="flex justify-end mb-4">
        <div
          class="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
        >
          Welcome to group everyone !
        </div>
        <img
          src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
          class="object-cover h-8 w-8 rounded-full"
          alt=""
        />
      </div>
      <div class="flex justify-start mb-4">
        <img
          src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
          class="object-cover h-8 w-8 rounded-full"
          alt=""
        />
        <div
          class="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
          at praesentium, aut ullam delectus odio error sit rem. Architecto
          nulla doloribus laborum illo rem enim dolor odio saepe,
          consequatur quas?
        </div>
      </div>
      <div class="flex justify-end mb-4">
        <div>
          <div
            class="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
          >
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Magnam, repudiandae.
          </div>

          <div
            class="mt-4 mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Debitis, reiciendis!
          </div>
        </div>
        <img
          src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
          class="object-cover h-8 w-8 rounded-full"
          alt=""
        />
      </div>
      <div class="flex justify-start mb-4">
        <img
          src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
          class="object-cover h-8 w-8 rounded-full"
          alt=""
        />
        <div
          class="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
        >
          happy holiday guys!
        </div>
      </div>
    </div>
    <div class="py-5">
      <input
        class="w-full bg-gray-300 py-5 px-3 rounded-xl"
        type="text"
        placeholder="type your message here..."
      />
    </div>
  </div>
=
  <div class="w-2/5 border-l-2 px-5">
    <div class="flex flex-col">
      <div class="font-semibold text-xl py-4">Mern Stack Group</div>
      <img
        src="https://source.unsplash.com/L2cxSuKWbpo/600x600"
        class="object-cover rounded-xl h-64"
        alt=""
      />
      <div class="font-semibold py-4">Created 22 Sep 2021</div>
      <div class="font-light">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt,
        perspiciatis!
      </div>
      </div>
    </div>
  </div>
</div>

    </>
  );
}


// <p className="title">Chat with Your Admin</p>
// <div className="text-container">{list}</div>

// <div className="msg">
//   <input
//     type="text"
//     placeholder="Type Your Message"
//     onChange={(e) => {
//       setText(e.target.value);
//     }}
//   ></input>
//   <button onClick={submitMsg} className="send">
//     Send
//     <span className="first"></span>
//     <span className="second"></span>
//     <span className="third"></span>
//     <span className="fourth"></span>
//   </button>
// </div>