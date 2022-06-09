import axios from "axios";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Home() {
  const API = "http://localhost:4000/api/v1/permainan/store";
  const navigate = useNavigate();

  const mulaiGame = () => {
    axios
      .post(API, null, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
        navigate("/game-play/" + res.data._id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="hero min-h-screen ">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          src="https://api.lorem.space/image/movie?w=260&h=400"
          className="max-w-sm rounded-lg shadow-2xl mx-40"
        />
        <div>
          <h1 className="text-5xl font-bold">Games Dadu!</h1>
          <p className="py-6">
            Mainkan game dadu ini dengan mudah dan menyenangkan.
          </p>
          <button className="btn btn-primary" onClick={mulaiGame}>Mulai Game</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
