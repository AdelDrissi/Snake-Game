import React from 'react';
import SnakeSegment from './SnakeSegment';

const SnakeBoard = ({ snake, food }) => {
  return (
    <div className="game-board">
      {snake.map((segment, index) => (
        <SnakeSegment key={index} position={segment} />
      ))}
      <div
        className="food"
        style={{
          left: `${food[0][0]}%`,
          top: `${food[0][1]}%`,
        }}
      />
    </div>
  );
};

export default SnakeBoard;
