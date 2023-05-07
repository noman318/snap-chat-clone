import { Chat, RadioButtonUnchecked } from "@mui/icons-material";
import React, { useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Webcam from "react-webcam";
import { setCameraImage } from "../../features/cameraSlice";
import "./WebcamCapture.css";
import { useNavigate } from "react-router-dom";

const videoConstraints = {
  width: 250,
  height: 400,
  facingMode: "user",
};

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // eslint-disable-next-line
  const [image, setImage] = useState(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    dispatch(setCameraImage(imageSrc));
    navigate("/preview");
    // console.log("imageSrc", imageSrc);
    // setImage(imageSrc);
  }, [webcamRef, dispatch, navigate]);
  return (
    <div className="webcamCapture">
      <Webcam
        audio={false}
        height={videoConstraints.height}
        ref={webcamRef}
        width={videoConstraints.width}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
      <Chat className="chat_button" onClick={() => navigate("/chats")} />
      <RadioButtonUnchecked
        className="webcamCapture_button"
        onClick={capture}
        fontSize="large"
      />
      {/* <img src={image} alt="" /> */}
    </div>
  );
};

export default WebcamCapture;
