import React from 'react';
import { SnakeGame } from './components/SnakeGame';

// Composant principal de l'application
const App = () => {
  return (
    <div className="app-container">
      <SnakeGame />
    </div>
  );
};

export default App; // Exportation du composant pour l'utiliser ailleurs
