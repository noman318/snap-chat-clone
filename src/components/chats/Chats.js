import React, { useEffect, useState } from "react";
import "./Chats.css";
import { Avatar } from "@mui/material";
import { Search, ChatBubble, RadioButtonUnchecked } from "@mui/icons-material";
import { firebaseAuth, firebaseDb } from "../../firebaseconfig";
import Chat from "../chat/Chat";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../features/appSlice";
import { useNavigate } from "react-router-dom";
import { resetCameraImage } from "../../features/cameraSlice";

const Chats = () => {
  const userRedux = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("userRedux", userRedux);
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
  console.log("post", post);
  const takeSnap = () => {
    dispatch(resetCameraImage());
    navigate("/");
  };
  //   console.log("post", post);
  return (
    <div className="chats">
      <div className="chat_header">
        <Avatar
          src={userRedux?.profilePic}
          onClick={() => firebaseAuth.signOut()}
          className="chats_avatar"
        />
        <div className="chats_search">
          <Search className="chats_searchIcon" />
          <input type="text" placeholder="Friends" />
        </div>
        <ChatBubble className="chats_chatIcon" />
      </div>
      <div className="chat_posts">
        {post?.map(
          ({
            id,
            data: { timestamp, read, imageUrl, profile, user },
            //   data: { timestamp, read, imageUrl, profile, user },
          }) => (
            <Chat
              key={id}
              id={id}
              timestamp={timestamp}
              user={user}
              read={read}
              profile={profile}
              imageUrl={imageUrl}
            />
          )
        )}
      </div>
      <RadioButtonUnchecked className="chats_takePicture" onClick={takeSnap} />
    </div>
  );
};

export default Chats;
