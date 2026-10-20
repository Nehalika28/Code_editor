import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import logo from "../assets/logo.jpeg";
import Editor from "./Editor";
import "../App.css";
import Avatar from 'react-avatar'

export default function EditorPage() {

  const [clients, setClients] = useState([
    { socketId: 1, username: 'Rakesh H' },
    { socketId: 2, username: 'John H' },
  ])
  const location = useLocation();
  const { roomId } = useParams();
  const username = location.state?.username;
  return (
    <div className="mainwrap">
      <div className="aside">
        <div className="asideinner">
          <div className='logo'>
            <img src={logo} alt="Logo" className="logoimage"/>
          </div>
          <h3>Connected</h3>

          <div className='clientslist'>
            {clients.map((client) => (
              <div className="client" key={client.socketId}>
                <Avatar
                  name={client.username}
                  size="50"
                  round={'14px'}
                />
                <span>{client.username}</span>
              </div>
            ))}
          </div>

        </div>
        <buuton className='btn copybtn'>Copy Room ID</buuton>
        <buuton className='btn leavebtn'>Leave</buuton>
      </div>
      <div className="editorwrap"> 
        <Editor></Editor>
      </div>
      {/* <h1>Editor Page</h1>
      <p>Room ID: {roomId}</p>
        <p>Username: {username || "Unknown user"}</p> */}
    </div>
  );
}