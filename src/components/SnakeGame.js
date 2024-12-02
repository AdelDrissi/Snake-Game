import React, { useState, useEffect, useCallback } from 'react';
import '../styles/_SnakeGame.scss';

export const SnakeGame = () => {
  const [snake, setSnake] = useState([[10, 10]]); // Position initiale du serpent
  const [direction, setDirection] = useState([1, 0]); // Direction initiale (vers la droite)
  const [food, setFood] = useState([5, 5]); // Position de la nourriture
  const [score, setScore] = useState(0); // Score initial
  const [gameOver, setGameOver] = useState(false); // État de fin de jeu

  const gridSize = 20; // Taille de la grille (20x20 pour un total de 400 cases)

  const moveSnake = useCallback(() => {
    if (gameOver) return; // Ne bouge pas si le jeu est terminé

    const newHead = [
      snake[0][0] + direction[0], // Nouvelle position X
      snake[0][1] + direction[1], // Nouvelle position Y
    ];

    // Vérifie si le serpent entre en collision avec sa propre queue
    if (
      snake.some(
        (segment, index) =>
          index !== 0 && segment[0] === newHead[0] && segment[1] === newHead[1]
      )
    ) {
      setGameOver(true); // Game over si le serpent se mord la queue
      alert('Game Over! Le serpent se mord la queue !');
      return;
    }

    // Vérifie si le serpent sort de la grille
    if (
      newHead[0] < 0 ||
      newHead[0] >= gridSize ||
      newHead[1] < 0 ||
      newHead[1] >= gridSize
    ) {
      setGameOver(true); // Game over si le serpent dépasse les limites
      alert('Game Over! Le serpent a dépassé les limites !');
      return;
    }

    // Si le serpent mange la nourriture
    if (newHead[0] === food[0] && newHead[1] === food[1]) {
      setScore(score + 1); // Augmenter le score
      setFood(generateFood()); // Générer une nouvelle nourriture
    } else {
      // Supprimer la queue si le serpent n'a pas mangé
      snake.pop();
    }

    // Ajouter la nouvelle tête
    setSnake([newHead, ...snake]);
  }, [snake, direction, food, score, gameOver]); // Dépendances

  // Générer une nouvelle position pour la nourriture
  const generateFood = () => {
    const x = Math.floor(Math.random() * gridSize);
    const y = Math.floor(Math.random() * gridSize);
    return [x, y];
  };

  // Changer la direction du serpent avec les touches
  const handleKeyDown = useCallback(
    (event) => {
      if (gameOver) return; // Ne rien faire si le jeu est terminé

      switch (event.key) {
        case 'ArrowUp':
          if (direction[1] !== 1) setDirection([0, -1]); // Haut
          break;
        case 'ArrowDown':
          if (direction[1] !== -1) setDirection([0, 1]); // Bas
          break;
        case 'ArrowLeft':
          if (direction[0] !== 1) setDirection([-1, 0]); // Gauche
          break;
        case 'ArrowRight':
          if (direction[0] !== -1) setDirection([1, 0]); // Droite
          break;
        default:
          break;
      }
    },
    [direction, gameOver]
  );

  // Écouteur d'événements pour les touches
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Démarrer ou réinitialiser le jeu après un game over
  const resetGame = () => {
    setSnake([[10, 10]]);
    setDirection([1, 0]);
    setFood(generateFood());
    setScore(0);
    setGameOver(false);
  };

  useEffect(() => {
    const intervalSpeed = Math.max(100, 200 - score * 5); // Diminue le délai avec le score
    const gameInterval = setInterval(() => {
      moveSnake();
    }, intervalSpeed);

    return () => clearInterval(gameInterval);
  }, [moveSnake, score]); // Dépendances : change aussi si le score change
  return (
    <div className="game-container">
      <h1>Snake Game</h1>
      <p>Score: {score}</p>
      <div className="game-board">
        {snake.map((segment, index) => (
          <div
            key={index}
            className="snake-segment"
            style={{
              left: `${(segment[0] * 100) / gridSize}%`, // Position X
              top: `${(segment[1] * 100) / gridSize}%`, // Position Y
            }}
          />
        ))}
        <div
          className="food"
          style={{
            left: `${(food[0] * 100) / gridSize}%`, // Position X
            top: `${(food[1] * 100) / gridSize}%`, // Position Y
          }}
        />
      </div>
      {gameOver && (
        <div className="game-over">
          <p>Game Over!</p>
          <button onClick={resetGame}>Recommencer</button>
        </div>
      )}
    </div>
  );
};
