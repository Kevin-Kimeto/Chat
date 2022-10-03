import React, { useState } from 'react';
import { io } from 'socket.io-client';
import Chat from './Chat';
import "./app.css";

const socket = io.connect("http://localhost:3001")

const App = () => {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if(userName !== "" && room !== "") {
      socket.emit("join_room", room);
    }
  };

  return (
    <div className='container'>
      <div className='app'>
        <h3>Join A Chat</h3>
        <input 
          type='text'
          className='name' placeholder='Your Name...'
          onChange={(e) =>{setUserName(e.target.value);
          }}
        />
        <input 
          type='text'
          className='room-id' placeholder='Room ID...'
          onChange={(e) =>{setRoom(e.target.value);
          }}
        />
        <button
          onClick={joinRoom}
        >Join Room</button>

        <Chat socket={socket} userName={userName} room={room} />
      </div>
    </div>
  )
}

export default App;