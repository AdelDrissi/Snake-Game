import React, { useState, useEffect } from 'react';
import '../styles/_SnakeGame.scss';

// Composant principal du jeu Snake
export const SnakeGame = () => {
  const [Snake, setSnake] = useState([[10, 10]]); // État pour le serpent
  const [direction, setDirection] = useState([[-1, 1]]); // État pour le serpent

  useEffect(() => {
    // Logique d'initialisation du jeu ou écoute des événements
    const gameInterval = setInterval(() => {
      moveSnake();
    });

    return () => clearInterval(gameInterval);
  }, [direction]);

  const moveSnake = () => {
    const newHead = [
      Snake[(0, 0)] + direction[0],
      Snake[(0, 1)] + direction[1],
    ];
  };

  //JSX
  return (
    <div className="game-container">
      <h1>Snake Game</h1>
      <p>Score: {}</p>
      <div className="game-board"></div>
    </div>
  );
};
