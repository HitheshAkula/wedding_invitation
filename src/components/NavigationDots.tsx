import React from 'react';

interface NavigationDotsProps {
  currentScene: number;
  totalScenes: number;
  onSelectScene: (index: number) => void;
  sceneLabels: string[];
}

export const NavigationDots: React.FC<NavigationDotsProps> = ({
  currentScene,
  totalScenes,
  onSelectScene,
  sceneLabels,
}) => {
  return (
    <nav className="wedding-nav-dots" aria-label="Scene navigation">
      {Array.from({ length: totalScenes }).map((_, idx) => {
        const isActive = currentScene === idx;
        return (
          <button
            key={idx}
            onClick={() => onSelectScene(idx)}
            className="wedding-nav-dot-btn"
            aria-label={`Jump to ${sceneLabels[idx] || `Scene ${idx + 1}`}`}
            title={sceneLabels[idx]}
          >
            <span
              className={`wedding-nav-dot-pill ${isActive ? 'active' : ''}`}
            />
          </button>
        );
      })}
    </nav>
  );
};
