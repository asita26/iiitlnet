import React, { useState } from "react";
import axios from "axios";
import Feed from "./Feed";
import "../CSS/home.css";

export default function Home() {
  const [other, setOther] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const onChangeValue = (e) => {
    setValue(e.target.value);
    if (e.target.value === "Other") {
      setOther(true);
    } else {
      setOther(false);
    }
  };
  const submitForm = () => {
    if (value === "" || value === "Other" || value === " ") {
      setError("Game Name can not be empty");
    } else {
      if (sessionStorage.getItem("auth-token")) {
        axios
          .post(
            `${process.env.REACT_APP_PORT}/user/form`,
            {
              value: value,
            },
            {
              headers: {
                "auth-token": sessionStorage.getItem("auth-token"),
              },
            }
          )
          .then((res) => {
            console.log(res.data);
            setError(res.data);
          });
      } else {
        setError("Login to vote");
      }
    }
  };

  return (
    <>   
      <Feed />
    </>
  );
}
