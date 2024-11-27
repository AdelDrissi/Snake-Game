import React, { useState, useEffect } from 'react';
import '../styles/_SnakeGame.scss';

// Composant principal du jeu Snake
export const SnakeGame = () => {
  const [snake, setSnake] = useState([[10, 10]]); // État pour le serpent
  const [direction, setDirection] = useState([[-1, 1]]); // État pour le serpent
  const [food, setFood] = useState([[5, 5]]); // État pour la nourriture
  const [score, setScore] = useState([[0, 0]]); // État pour le score du joueur

  useEffect(() => {
    // Logique d'initialisation du jeu ou écoute des événements
    const gameInterval = setInterval(() => {
      moveSnake();
    });

    return () => clearInterval(gameInterval);
  }, [snake , direction]);

  const moveSnake = () => {
    const newHead = [
      snake[(0, 0)] + direction[0],
      snake[(0, 1)] + direction[1],
    ];
  };

  // Vérifie si le serpent arrive a manger la nourriture
  if (newHead[0][0] === food[0] && newHead[1] === food[1]) {
    setScore(score + 1); // Augmente le score de + 1 
    setFood(generateFood)// Génére une nouvelle nourriture 
  } 
  else {
    snake.pop() // Supprime la queu si il n'y a aucunes nourritures
  }

  // Ajoute une nouvelle tête
  setSnake([newHead,...snake])


  
  //JSX
  return (
    <div className="game-container">
      <h1>Snake Game</h1>
      <p>Score: {}</p>
      <div className="game-board"></div>
    </div>
  );
};
