import React, { useEffect } from "react";
import WebcamCapture from "./components/webcam/WebcamCapture";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Preview from "./components/preview/Preview";
import "./App.css";
import Chats from "./components/chats/Chats";
import ChatView from "./components/chatview/ChatView";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/appSlice";
import Login from "./components/login/Login";
import { firebaseAuth } from "./firebaseconfig";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    firebaseAuth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            username: authUser.displayName,
            profilePic: authUser.photoURL,
            id: authUser.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);
  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <div className="app_body">
            <Routes>
              <Route path="/" element={<WebcamCapture />} />
              <Route path="/preview" element={<Preview />} />
              <Route path="/chats" element={<Chats />} />
              <Route path="/chats/view" element={<ChatView />} />
            </Routes>
          </div>
        )}
      </Router>
    </div>
  );
}

export default App;
