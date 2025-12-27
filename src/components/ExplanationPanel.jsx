import React from 'react';
import './ExplanationPanel.css';

/**
 * ExplanationPanel Component
 * Displays explanations for operations and time complexity information
 */
const ExplanationPanel = ({ explanation, timeComplexity, operation }) => {
  return (
    <div className="explanation-panel">
      <div className="explanation-section">
        <h3>Explanation</h3>
        <p className="explanation-text">
          {explanation || 'Select an operation to see step-by-step explanations.'}
        </p>
      </div>
      
      {timeComplexity && operation && (
        <div className="complexity-section">
          <h3>Time Complexity</h3>
          <div className="complexity-grid">
            <div className="complexity-item">
              <span className="complexity-label">Best Case:</span>
              <span className="complexity-value">{timeComplexity.best}</span>
            </div>
            <div className="complexity-item">
              <span className="complexity-label">Average Case:</span>
              <span className="complexity-value">{timeComplexity.average}</span>
            </div>
            <div className="complexity-item">
              <span className="complexity-label">Worst Case:</span>
              <span className="complexity-value">{timeComplexity.worst}</span>
            </div>
          </div>
          {timeComplexity.explanation && (
            <p className="complexity-explanation">{timeComplexity.explanation}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ExplanationPanel;

