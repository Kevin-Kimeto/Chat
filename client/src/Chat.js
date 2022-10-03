import React, { useEffect, useState } from 'react';
import './chat.css';

const Chat = ({ socket, userName, room }) => {
    const [currentMessage, setCurrentMessage] = useState("");

    const sendMessage = async () => {
        if(currentMessage !== "") {
            const messageData = {
                room: room,
                author: userName,
                message: currentMessage,
                time:new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            };

            await socket.emit("send_message", messageData);
        }
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            console.log(data);
        })
    }, []);

    return (
        <div className='chat-window'>
            <div className='class-header'>
                <p>Live Chat</p>
            </div>
            <div className='class-body'></div>
            <div className='class-footer'>
                <input 
                    type='text' 
                    placeholder='Hey...'
                    onChange={(e) =>{setCurrentMessage(e.target.value);
                    }}
                />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    );
};

export default Chat;