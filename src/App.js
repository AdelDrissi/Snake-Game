import React from 'react';
import { SnakeGame } from './components/SnakeGame';

// Composant principal de l'application
const App = () => {
  return (
    <div className="app-container">
      <h1>Jeu Snake</h1>
      <SnakeGame/>
    </div>
  );
};

export default App; // Exportation du composant pour l'utiliser ailleurs
