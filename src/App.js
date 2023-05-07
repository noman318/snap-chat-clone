import React from "react";
import WebcamCapture from "./components/webcam/WebcamCapture";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Preview from "./components/preview/Preview";
import "./App.css";
import Chats from "./components/chats/Chats";
import ChatView from "./components/chatview/ChatView";

function App() {
  return (
    <div className="app">
      <Router>
        <div className="app_body">
          <Routes>
            <Route path="/" element={<WebcamCapture />} />
            <Route path="/preview" element={<Preview />} />
            <Route path="/chats" element={<Chats />} />
            <Route path="/chats/view" element={<ChatView />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
