import React from "react";
import WebcamCapture from "./components/webcam/WebcamCapture";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Preview from "./components/preview/Preview";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Router>
        <div className="app_body">
          <Routes>
            <Route path="/" element={<WebcamCapture />} />
            <Route path="/preview" element={<Preview />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
