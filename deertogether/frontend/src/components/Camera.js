import React, { useRef, useState } from "react";
import { Button, Container } from "react-bootstrap";
import Webcam from "react-webcam";
import image from "../sea.jpg";

export default function Camera() {
  const [playing, setPlaying] = useState(false);
  const handle_playing = () => {
    setPlaying(!playing);
  };
  const videoRef = useRef(null);

  return (
    <Container>
      <Button onClick={handle_playing}>{playing ? "OFF" : "ON"}</Button>
      <Container className="mt-3">
        {playing ? (
          <div style={{ position: "relative" }}>
            <img src={image} width={800} />
            <Webcam
              audio={false}
              height={250}
              ref={videoRef}
              width={250}
              style={{ position: "absolute", top: 313, left: 550 }}
            />
          </div>
        ) : (
          ""
        )}
      </Container>
    </Container>
  );
}
