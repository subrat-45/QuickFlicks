import React from "react";

const BlurCircle = ({
  top = "auto",
  left = "auto",
  right = "auto",
  bottom = "auto",
}) => {
  return (
    <div
      className="absolute -z-50 w-0 h-0 lg:h-48 lg:w-48 aspect-square bg-primary/30 blur-3xl rounded-full pointer-events-none"
      style={{ 
        top: top, 
        left: left, 
        bottom: bottom, 
        right: right,
        transform: 'translateZ(0)',
        willChange: 'transform'
      }}
    ></div>
  );
};

export default BlurCircle;