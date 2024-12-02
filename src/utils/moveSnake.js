export const moveSnake = (
  snake,
  direction,
  setSnake,
  food,
  setFood,
  setScore
) => {
  const newHead = [snake[0][0] + direction[0], snake[0][1] + direction[1]];

  const newSnake = [newHead, ...snake.slice(0, -1)];

  // Vérifie si le serpent mange la nourriture
  if (newHead[0] === food[0][0] && newHead[1] === food[0][1]) {
    setScore((prevScore) => prevScore + 1);
    setFood(generateFood()); // Génère une nouvelle nourriture
    setSnake([newHead, ...snake]); // Ajoute une nouvelle partie au serpent
  } else {
    setSnake(newSnake); // Déplace le serpent
  }
};
