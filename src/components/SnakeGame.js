import React, { useState, useEffect } from 'react';

// Composant principal du jeu Snake
export const SnakeGame = () => {
  const [score, setScore] = useState(0); // État pour le score

  useEffect(() => {
    // Logique d'initialisation du jeu ou écoute des événements
  }, []);

  return (
    <div className="game-container">
      <h1>Snake Game</h1>
      <p>Score: {score}</p>
      <div className="game-board"></div>
    </div>
  );
};
