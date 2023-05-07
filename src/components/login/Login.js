import React from "react";
import "./Login.css";
import { Button } from "@mui/material";
import { firebaseAuth, firebaseAuthProvider } from "../../firebaseconfig";
import { useDispatch } from "react-redux";
import { login } from "../../features/appSlice";
const Login = () => {
  const dispatch = useDispatch();
  const GoogleSignIn = () => {
    console.log("google auth");
    firebaseAuth
      .signInWithPopup(firebaseAuthProvider)
      .then((result) => {
        dispatch(
          login({
            username: result.user.displayName,
            profilePic: result.user.photoURL,
            id: result.user.uid,
          })
        );
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login_container">
        <img
          src="https://scx2.b-cdn.net/gfx/news/2017/1-snapchat.jpg"
          alt="snapchat_logo"
        />
        <Button variant="outlined" onClick={GoogleSignIn}>
          Sign In
        </Button>
      </div>
    </div>
  );
};

export default Login;
