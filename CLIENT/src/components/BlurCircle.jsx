import React from "react";

const BlurCircle = ({
  top = "auto",
  left = "auto",
  right = "auto",
  bottom = "auto",
}) => {
  return (
    <div
      className="absolute -z-50 w-54 h-54 aspect-square bg-primary/30 blur-3xl rounded-full"
      style={{ top: top, left: left, bottom: bottom, right: right }}
    ></div>
  );
};

export default BlurCircle;
