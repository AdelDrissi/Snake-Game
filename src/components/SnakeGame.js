import React, { useState, useEffect, useCallback } from 'react';
import '../styles/_SnakeGame.scss';

// Composant principal du jeu Snake
export const SnakeGame = () => {
  const [snake, setSnake] = useState([[10, 10]]); // État pour le serpent
  const [direction, setDirection] = useState([0, -1]); // Direction initiale (vers le haut)
  const [food, setFood] = useState([5, 5]); // Position initiale de la nourriture
  const [score, setScore] = useState(0); // Score initial
  const [speed, setSpeed] = useState(200); // Vitesse initiale (ms)

  // Mouvement du serpent
  const moveSnake = useCallback(() => {
    const newHead = [
      snake[0][0] + direction[0], // Nouvelle position X
      snake[0][1] + direction[1], // Nouvelle position Y
    ];

    // Vérifie si le serpent mange la nourriture
    if (newHead[0] === food[0] && newHead[1] === food[1]) {
      setScore(score + 1); // Augmente le score
      setFood(generateFood()); // Génère une nouvelle nourriture

      // Mise à jour fonctionnelle de setSpeed pour éviter les dépendances inutiles
      setSpeed((prevSpeed) => {
        if (prevSpeed > 50) {
          return prevSpeed  - 50; // Réduit la vitesse
        }
        return prevSpeed; // Maintient la vitesse minimale
      });
    } else {
      // Supprime la queue si aucune nourriture n'est mangée
      snake.pop();
    }

    // Ajoute la nouvelle tête
    setSnake([newHead, ...snake]);
  }, [snake, direction, food, score, setSpeed]);

  // Génération d'une nouvelle position de nourriture
  const generateFood = () => {
    const x = Math.floor(Math.random() * 20); // Génère une position X aléatoire
    const y = Math.floor(Math.random() * 20); // Génère une position Y aléatoire
    return [x, y];
  };

  // Gestion des touches pour changer la direction
  const handleKeyDown = useCallback(
    (event) => {
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
    [direction]
  );

  // Ajout d'un écouteur d'événements pour les touches
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Déclenchement du mouvement à intervalle régulier
  useEffect(() => {
    const gameInterval = setInterval(() => {
      moveSnake();
    }, speed); // Vitesse du serpent

    return () => clearInterval(gameInterval); // Nettoyage à chaque changement
  }, [moveSnake, speed]);

  // Rendu du composant
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
              left: `${segment[0]}%`,
              top: `${segment[1]}%`,
            }}
          />
        ))}
        <div
          className="food"
          style={{
            left: `${food[0]}%`,
            top: `${food[1]}%`,
          }}
        />
      </div>
    </div>
  );
};
