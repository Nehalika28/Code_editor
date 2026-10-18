import logo from "../assets/logo.jpeg";
import {v4 as uuidv4} from "uuid";
import { useState } from "react";
import toast from'react-hot-toast'
import "../App.css";

import { useNavigate } from "react-router-dom";


export default function Home() {
   const navigate = useNavigate();
  const [roomId,setRoomId]=useState("");

  const [username,setUsername]=useState("");
  const createnewroom=(e)=>{
    e.preventDefault();

    const id=uuidv4();

    console.log(id)
    setRoomId(id);

    toast.success('Created a new room');

  }

  const joinroom = () => {
    if (!roomId.trim() || !username.trim()) {
      toast.error("Please enter Room ID and Username");
      return;
    }

    navigate(`/editor/${roomId}`, {
      state: { username },
    });
  };
const handleinputEnter = (e) => {
    if (e.key === "Enter") {
      joinroom();
    }
  };
  return (

    <div className="homepagewrapper">
      <div className="formwrapper">
        <img src={logo} alt="Logo" className="image" />

        <h4 className="mainlabel">Paste invitation ROOM ID</h4>

        <div className="inputGroup">
          <input type="text" className="inputBox" placeholder="Room_id"  value={roomId} onChange={(e)=>setRoomId(e.target.value)} onKeyDown={handleinputEnter} />
          <input type="text" className="inputBox" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} onKeyDown={handleinputEnter} />

          <button className="btn joinbtn" onClick={joinroom}>Join</button>

          <span className="createInfo">
            If you don't have an invite then create &nbsp;

            <a onClick={createnewroom} href="" className="createnewbtn">new room</a>
          </span>
        </div>
      </div>

    </div>
  );
}