import React, { useEffect } from "react";
import "./Preview.css";
import { selectCameraImage } from "../../features/cameraSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Preview = () => {
  const cameraImage = useSelector(selectCameraImage);
  const navigate = useNavigate();

  // console.log("cameraImage", cameraImage);
  useEffect(() => {
    if (!cameraImage) {
      navigate("/");
    }
  }, [cameraImage, navigate]);
  return (
    <div className="preview">
      <h1>Preview</h1>
      <img src={cameraImage} alt="preview_of_image" />
    </div>
  );
};

export default Preview;
