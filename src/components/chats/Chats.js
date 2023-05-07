import React, { useEffect, useState } from "react";
import "./Chats.css";
import { Avatar } from "@mui/material";
import { Search, ChatBubble } from "@mui/icons-material";
import { firebaseDb } from "../../firebaseconfig";
import Chat from "../chat/Chat";

const Chats = () => {
  const [post, setPost] = useState([]);
  useEffect(() => {
    firebaseDb
      .collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPost(
          snapshot.docs?.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
      });
  }, []);
  //   console.log("post", post);
  return (
    <div className="chats">
      <div className="chat_header">
        <Avatar className="chats_avatar" />
        <div className="chats_search">
          <Search className="chats_chatIcon" />
          <input type="text" placeholder="Friends" />
        </div>
        <ChatBubble className="chats_chatIcon" />
      </div>
      <div className="chat_posts">
        {post?.map(
          ({
            id,
            data: { timestamp, read, imageUrl, profilePic, user },
            //   data: { timestamp, read, imageUrl, profilePic, username },
          }) => (
            <Chat
              key={id}
              id={id}
              timestamp={timestamp}
              username={user}
              read={read}
              profilePic={profilePic}
              imageUrl={imageUrl}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Chats;
