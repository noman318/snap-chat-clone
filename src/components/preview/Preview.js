import React, { useEffect } from "react";
import "./Preview.css";
import {
  resetCameraImage,
  selectCameraImage,
} from "../../features/cameraSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  AttachFile,
  Close,
  Create,
  Crop,
  MusicNote,
  TextFields,
  Timer,
} from "@mui/icons-material";

const Preview = () => {
  const cameraImage = useSelector(selectCameraImage);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // console.log("cameraImage", cameraImage);
  useEffect(() => {
    if (!cameraImage) {
      navigate("/", { replace: true });
    }
  }, [cameraImage, navigate]);
  const closePreview = () => {
    dispatch(resetCameraImage());
  };
  return (
    <div className="preview">
      <Close className="preview_close" onClick={closePreview} />
      <div className="preview_toolbarRight">
        <TextFields />
        <Create />
        <MusicNote />
        <AttachFile />
        <Crop />
        <Timer />
      </div>
      <img src={cameraImage} alt="preview_of_image" />
    </div>
  );
};

export default Preview;
