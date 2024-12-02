import React from 'react';

const SnakeSegment = ({ position }) => {
  return (
    <div
      className="snake-segment"
      style={{
        left: `${position[0]}%`,
        top: `${position[1]}%`,
      }}
    />
  );
};
export default SnakeSegment;
