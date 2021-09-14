import React, { useEffect, useState } from 'react';
import "./sidebar.css";
import {Avatar, IconButton} from "@material-ui/core";
import { Chat, DonutLarge, MoreVert, SearchOutlined } from "@material-ui/icons";
import SidebarChat from '../sidebarChat/SidebarChat';
import db from "../../firebase";
import { useStateValue } from '../../StateProvider';



function Sidebar() {
    const [rooms, setRooms] = useState([]);
    const [{ user }] = useStateValue();

    useEffect(() => {
       const unsubscribe = db.collection('rooms').onSnapshot((snapshot) => 
            setRooms(snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            }))
        )
     );

     return () => {
        unsubscribe();
     };
    }, [])

    return (
        <div className="sidebar">
            <div className="sidebarHeader">
                <Avatar src={user?.photoURL}/>
                <div className="sidebarHeaderRight">
                    <IconButton>
                        <DonutLarge/>
                    </IconButton>
                    <IconButton>
                      <Chat/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div>
            </div>

            <div className="sidebarSearch">
                <div className="searchContainer">
                    <SearchOutlined />
                    <input type="text" placeholder="Search for a chat" className="searchBar" />
                </div>
            </div>

            <div className="sidebarChats">
                <SidebarChat addNewChat/>
                {rooms.map(room => (
                    <SidebarChat key={room.id} id={room.id}
                    name={room.data.name} />
                ))}
            </div>
        </div>
    )
}

export default Sidebar
