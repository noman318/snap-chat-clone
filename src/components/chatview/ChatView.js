import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selecSelectedtImage } from "../../features/appSlice";
import { useNavigate } from "react-router-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "./ChatView.css";

const ChatView = () => {
  const selectedImage = useSelector(selecSelectedtImage);
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const exitView = () => {
    // console.log("exit from view image screen");
    navigate("/chats", { replace: true });
  };
  useEffect(() => {
    if (!selectedImage) {
      exitView();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedImage]);

  return (
    <div className="chatview">
      <img
        src={selectedImage}
        onClick={exitView}
        onLoad={handleImageLoad}
        alt="snap_image"
      />
      <div className="chatview_timer">
        {imageLoaded && (
          <CountdownCircleTimer
            isPlaying
            duration={10}
            strokeWidth={6}
            size={50}
            colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
            colorsTime={[7, 5, 2, 0]}
          >
            {({ remainingTime }) => {
              if (remainingTime === 0) {
                exitView();
              }
              return remainingTime;
            }}
          </CountdownCircleTimer>
        )}
      </div>
    </div>
  );
};

export default ChatView;
