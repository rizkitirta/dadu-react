import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./game.css";

function Game() {
  const navigate = useNavigate();
  const [player, setPlayer] = useState(false);
  const [jumlahPemain, setjumlahPemain] = useState(0);
  const [jumlahDadu, setjumlahDadu] = useState(0);
  const { id } = useParams();
  const API = "http://localhost:4000/api/v1";

  const exitGame = () => {
    if (window.confirm("Are you sure you want to exit?")) {
      localStorage.setItem('added_player', false)
      localStorage.setItem('id_game', "")
      navigate("/");
    }
  };

  useEffect(() => {
    setAddedPlayer()
    console.log(player)
    getPlayer()
  }, [])

  const getPlayer = () => {
    axios
      .get(API+ "/permainan/player-dadu/"+id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setPlayer(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  const setAddedPlayer = () => {
    const addedPlayer = localStorage.getItem('added_player')
    const idGame = localStorage.getItem('id_game')
    if (addedPlayer && idGame === id) {
      setPlayer(true)
    }else{
      setPlayer(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(
      API +"/permainan/store/player-dadu",
      {
        jumlah_pemain: jumlahPemain,
        jumlah_dadu: jumlahDadu,
        permainan_id: id,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    ).then((res) => {
      console.log(res);
      setPlayer(true)
      localStorage.setItem('added_player', true)
      localStorage.setItem('id_game', id)
    }).catch((err) => {
      console.log(err);
    });
    
  };

  return (
    <div>
      {/* Jumbotron */}
      <div
        className="p-12 text-center relative overflow-hidden bg-no-repeat bg-cover rounded-lg"
        style={{
          backgroundImage: 'url("/cube.jpg")',
          height: 400,
        }}
      >
        <div
          className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
        >
          <div className="flex justify-center items-center h-full">
            <div className="text-white">
              <h2 className="font-semibold text-4xl mb-4">Dalam Permainan</h2>
              <h4 className="font-semibold text-xl mb-6">Id Game : {id}</h4>
              {/* The button to open modal */}
              <label
                htmlFor="my-modal"
                className="inline-block px-7 py-3 mb-1 border-2 border-gray-200 text-gray-200 font-medium text-sm leading-snug uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                href="#!"
                role="button"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
              >
                Buat Player
              </label> 
              <a
                className="inline-block ml-2 px-7 py-3 mb-1 border-2 border-gray-200 text-gray-200 font-medium text-sm leading-snug uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                href="#!"
                role="button"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                onClick={(e) => exitGame(e)}
              >
                Keluar
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Jumbotron */}
      <div className="flex justify-center">
        <div className="block p-5 rounded-lg shadow-2xl bg-white max-w-sm grid grid-cols-3 gap-2">
          <div className="rounded-full bg-black block h-10 w-10"></div>
          <div className="rounded-full bg-black block h-10 w-10"></div>
          <div className="rounded-full bg-black block h-10 w-10"></div>
          <div className="rounded-full bg-black block h-10 w-10"></div>
          <div className="rounded-full bg-black block h-10 w-10"></div>
          <div className="rounded-full bg-black block h-10 w-10"></div>
        </div>
      </div>

      <img src="/dadu.png" className="max-w-sm shake" />

      {/* Modal */}
      <>
        {/* Put this part before </body> tag */}
        <input type="checkbox" id="my-modal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Mulai Game</h3>
            <form onSubmit={(e) => handleSubmit(e)}>
              <input
                type="number"
                placeholder="Nasukan Jumlah Pemain"
                className="input input-bordered w-full max-w-xs mt-3"
                onChange={(e) => setjumlahPemain(e.target.value)}
              />
              <input
                type="number"
                placeholder="Nasukan Jumlah Dadu"
                className="input input-bordered w-full max-w-xs mt-3"
                onChange={(e) => setjumlahDadu(e.target.value)}
              />

              <div className="modal-action">
                <label htmlFor="my-modal" className="btn">
                  close
                </label>
                <button type="submit" className="btn">
                  Buat
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    </div>
  );
}

export default Game;
