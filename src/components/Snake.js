import React from 'react';

const Snake = ({ snake }) => {
  const canvasRef = React.useRef(null); // Référence au canvas
};

React.useEffect(() => {
  const ctx = canvasRef.current.getContext('2d');
  ctx.clearRect(0, 0, 400, 400); // Efface le canvas

  ctx.fillStyle = 'green'; // Couleur du serpent
  snake.forEach((segment) => {
    ctx.fillRect(segment.x * 20, segment.y * 20, 20, 20); // Dessine chaque segment
  });
}, [snake]);

return <canvas ref={canvasRef} width={400} height={400}></canvas>;

export default Snake;
