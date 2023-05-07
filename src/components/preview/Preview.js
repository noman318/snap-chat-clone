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
  Send,
  TextFields,
  Timer,
} from "@mui/icons-material";
import { v4 as uuid } from "uuid";
import firebase from "firebase/compat/app";
import { firebaseStorage, firebaseDb } from "../../firebaseconfig";

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
  const sendPost = () => {
    const id = uuid();
    const uploadTask = firebaseStorage
      .ref(`posts/${id}`)
      .putString(cameraImage, "data_url");
    uploadTask.on(
      "state_change",
      null,
      (error) => {
        console.log("error", error);
      },
      () => {
        firebaseStorage
          .ref("posts")
          .child(id)
          .getDownloadURL()
          .then((url) => {
            firebaseDb.collection("posts").add({
              imageUrl: url,
              user: "Noman",
              read: false,
              //profile,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
            navigate("/chats", { replace: true });
          });
      }
    );
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
      <div className="preview_footer" onClick={sendPost}>
        <h2>Send Now</h2>
        <Send fontSize="small" className="preveiw_sendIcon" />
      </div>
    </div>
  );
};

export default Preview;
