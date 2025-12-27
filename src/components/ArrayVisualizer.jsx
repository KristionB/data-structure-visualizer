import React, { useState } from 'react';
import { createArray, insertArray, removeArray, getTimeComplexity } from '../logic/arrayOps';
import ExplanationPanel from './ExplanationPanel';
import './ArrayVisualizer.css';

/**
 * ArrayVisualizer Component
 * Visualizes array operations step by step
 */
const ArrayVisualizer = () => {
  const [array, setArray] = useState(createArray([10, 20, 30]));
  const [inputValue, setInputValue] = useState('');
  const [indexValue, setIndexValue] = useState('');
  const [currentExplanation, setCurrentExplanation] = useState('Welcome! Use the controls to perform array operations.');
  const [timeComplexity, setTimeComplexity] = useState(null);

  const handleInsert = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      alert('Please enter a valid number');
      return;
    }
    
    const index = indexValue === '' ? null : parseInt(indexValue);
    if (indexValue !== '' && (isNaN(index) || index < 0)) {
      alert('Please enter a valid index (non-negative integer)');
      return;
    }
    
    const newArray = insertArray(array, value, index);
    setArray(newArray);
    setCurrentExplanation(newArray.steps[0]?.explanation || '');
    setTimeComplexity(getTimeComplexity('insert'));
    setInputValue('');
    setIndexValue('');
  };

  const handleRemove = () => {
    const index = parseInt(indexValue);
    if (isNaN(index) || index < 0) {
      alert('Please enter a valid index (non-negative integer)');
      return;
    }
    
    const newArray = removeArray(array, index);
    setArray(newArray);
    setCurrentExplanation(newArray.steps[0]?.explanation || '');
    setTimeComplexity(getTimeComplexity('remove'));
    setIndexValue('');
  };

  const handleNextStep = () => {
    if (array.steps && array.currentStep < array.steps.length - 1) {
      const nextStep = array.currentStep + 1;
      const newArray = { ...array, currentStep: nextStep };
      setArray(newArray);
      setCurrentExplanation(array.steps[nextStep]?.explanation || '');
    }
  };

  const handleReset = () => {
    setArray(createArray([10, 20, 30]));
    setCurrentExplanation('Welcome! Use the controls to perform array operations.');
    setTimeComplexity(null);
    setInputValue('');
    setIndexValue('');
  };

  const currentElements = array.steps && array.steps.length > 0 
    ? array.steps[array.currentStep]?.elements || array.elements
    : array.elements;
  
  const highlighted = array.steps && array.steps.length > 0
    ? array.steps[array.currentStep]?.highlighted || []
    : [];

  const currentMessage = array.steps && array.steps.length > 0
    ? array.steps[array.currentStep]?.message || ''
    : '';

  return (
    <div className="visualizer-container">
      <div className="visualizer-main">
        <h2>Array Visualizer</h2>
        
        <div className="controls">
          <div className="input-group">
            <input
              type="text"
              placeholder="Value"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Index (optional for insert)"
              value={indexValue}
              onChange={(e) => setIndexValue(e.target.value)}
              className="input-field"
            />
          </div>
          
          <div className="button-group">
            <button onClick={handleInsert} className="btn btn-primary">Insert</button>
            <button onClick={handleRemove} className="btn btn-secondary">Remove</button>
            <button 
              onClick={handleNextStep} 
              className="btn btn-info"
              disabled={!array.steps || array.currentStep >= array.steps.length - 1}
            >
              Next Step
            </button>
            <button onClick={handleReset} className="btn btn-warning">Reset</button>
          </div>
        </div>

        <div className="visualization-area">
          <div className="array-container">
            {currentElements.map((value, index) => (
              <div
                key={index}
                className={`array-element ${highlighted.includes(index) ? 'highlighted' : ''}`}
              >
                <div className="element-value">{value}</div>
                <div className="element-index">{index}</div>
              </div>
            ))}
            {currentElements.length === 0 && (
              <div className="empty-state">Array is empty</div>
            )}
          </div>
          {currentMessage && (
            <div className="operation-message">{currentMessage}</div>
          )}
        </div>
      </div>

      <ExplanationPanel 
        explanation={currentExplanation}
        timeComplexity={timeComplexity}
        operation={array.operation}
      />
    </div>
  );
};

export default ArrayVisualizer;

