import { Avatar, IconButton } from '@material-ui/core';
import { DonutLarge, MoreVert, AttachFile, InsertEmoticon, Mic } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import db from '../../firebase';
import "./chat.css";
import firebase from "firebase";
import { useStateValue } from '../../StateProvider';


function Chat() {
    const [seed, setSeed] = useState("");
    const [message, setMessage] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{ user }] = useStateValue();


    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot((snapshot) =>
                setRoomName(snapshot.data().name));
               
            db.collection("rooms").doc(roomId).collection('messages').orderBy("timestamp", 'asc')
             .onSnapshot((snapshot) => (
                setMessages(snapshot.docs.map((doc) => doc.data()))
            ));
        }
    }, [roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
    
        db.collection('rooms').doc(roomId).collection
        ('messages').add({
            message: message,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue
            .serverTimestamp(),
        });

        setMessage("");
    }

    return (
        <div className="chat">
            <div className="chatHeader">
            <Avatar src={`https://avatars.dicebear.com/api/jdenticon/${seed}.svg`} />

                <div className="chatHeaderInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}</p>
                </div>

                <div className="chatHeaderRight">
                    <IconButton>
                        <DonutLarge/>
                    </IconButton>
                    <IconButton>
                      <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div>
            </div>

            <div className="chatBody">
                {messages.map((message) => (
                    <p className={`chatMessage ${message.name === user.displayName && "chatReceiver"}`}>
                        <span className="chatName">{message.name}</span>
                        {message.message}
                    <span className="chatTimestamp">
                        {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span> 
                    </p>
                ))}
            </div>

            <div className="chatFooter">
                <InsertEmoticon/>
                <form>
                    <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message" type="text"/>
                    <button type="submit" onClick={sendMessage} className="subButton">Send a message</button>
                </form>
                <Mic/>
            </div>
        </div>
    )
}

export default Chat
