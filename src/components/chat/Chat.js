import React from "react";
import "./Chat.css";
import { Avatar } from "@mui/material";
import { StopRounded } from "@mui/icons-material";
import ReactTimeAgo from "react-time-ago";
import { useDispatch } from "react-redux";
import { selectImage } from "../../features/appSlice";
import { firebaseDb } from "../../firebaseconfig";
import { useNavigate } from "react-router-dom";

const Chat = ({ id, username, profilePic, imageUrl, read, timestamp }) => {
  //   console.log("props", props);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const openSnap = () => {
    if (!read) {
      dispatch(selectImage(imageUrl));
      firebaseDb.collection("posts").doc(id).set(
        {
          read: true,
        },
        { merge: true }
      );
      navigate("/chats/view");
    }
  };

  // const formatTimestamp = (timestamp) => {
  //   const options = {
  //     year: "numeric",
  //     month: "long",
  //     day: "numeric",
  //     hour: "numeric",
  //     minute: "numeric",
  //   };
  //   return new Intl.DateTimeFormat("en-US", options).format(timestamp);
  // };
  // const formattedTimestamp = timestamp
  //   ? formatTimestamp(timestamp.toDate())
  //   : "";

  // console.log("formattedTimestamp:", formattedTimestamp);
  return (
    <div onClick={openSnap} className="chat">
      <Avatar className="chat_avatar" src={profilePic} />
      <div className="chat_info">
        <h4>{username}</h4>
        <p>
          {!read && "Tap to view -"}{" "}
          {timestamp && (
            <ReactTimeAgo date={new Date(timestamp?.toDate()).toUTCString()} />
          )}
        </p>
      </div>
      {!read && <StopRounded className="chat_readIcon" />}
    </div>
  );
};

export default Chat;
