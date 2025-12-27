import React, { useState } from 'react';
import { createStack, pushStack, popStack, getTimeComplexity } from '../logic/stackOps';
import ExplanationPanel from './ExplanationPanel';
import './StackVisualizer.css';

/**
 * StackVisualizer Component
 * Visualizes stack operations step by step (LIFO)
 */
const StackVisualizer = () => {
  const [stack, setStack] = useState(createStack([10, 20, 30]));
  const [inputValue, setInputValue] = useState('');
  const [currentExplanation, setCurrentExplanation] = useState('Welcome! Use the controls to perform stack operations. Stack follows LIFO (Last In, First Out) principle.');
  const [timeComplexity, setTimeComplexity] = useState(null);

  const handlePush = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      alert('Please enter a valid number');
      return;
    }
    
    const newStack = pushStack(stack, value);
    setStack(newStack);
    setCurrentExplanation(newStack.steps[0]?.explanation || '');
    setTimeComplexity(getTimeComplexity('push'));
    setInputValue('');
  };

  const handlePop = () => {
    const newStack = popStack(stack);
    setStack(newStack);
    setCurrentExplanation(newStack.steps[0]?.explanation || '');
    setTimeComplexity(getTimeComplexity('pop'));
  };

  const handleNextStep = () => {
    if (stack.steps && stack.currentStep < stack.steps.length - 1) {
      const nextStep = stack.currentStep + 1;
      const newStack = { ...stack, currentStep: nextStep };
      setStack(newStack);
      setCurrentExplanation(stack.steps[nextStep]?.explanation || '');
    }
  };

  const handleReset = () => {
    setStack(createStack([10, 20, 30]));
    setCurrentExplanation('Welcome! Use the controls to perform stack operations. Stack follows LIFO (Last In, First Out) principle.');
    setTimeComplexity(null);
    setInputValue('');
  };

  const currentElements = stack.steps && stack.steps.length > 0 
    ? stack.steps[stack.currentStep]?.elements || stack.elements
    : stack.elements;
  
  const highlighted = stack.steps && stack.steps.length > 0
    ? stack.steps[stack.currentStep]?.highlighted || []
    : [];

  const currentMessage = stack.steps && stack.steps.length > 0
    ? stack.steps[stack.currentStep]?.message || ''
    : '';

  return (
    <div className="visualizer-container">
      <div className="visualizer-main">
        <h2>Stack Visualizer (LIFO)</h2>
        
        <div className="controls">
          <div className="input-group">
            <input
              type="text"
              placeholder="Value to push"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="input-field"
            />
          </div>
          
          <div className="button-group">
            <button onClick={handlePush} className="btn btn-primary">Push</button>
            <button onClick={handlePop} className="btn btn-secondary">Pop</button>
            <button 
              onClick={handleNextStep} 
              className="btn btn-info"
              disabled={!stack.steps || stack.currentStep >= stack.steps.length - 1}
            >
              Next Step
            </button>
            <button onClick={handleReset} className="btn btn-warning">Reset</button>
          </div>
        </div>

        <div className="visualization-area">
          <div className="stack-container">
            <div className="stack-label">Top</div>
            {currentElements.length > 0 ? (
              currentElements.map((value, index) => {
                const isTop = index === currentElements.length - 1;
                const isHighlighted = highlighted.includes(index);
                return (
                  <div
                    key={index}
                    className={`stack-element ${isHighlighted ? 'highlighted' : ''} ${isTop ? 'top' : ''}`}
                  >
                    <div className="element-value">{value}</div>
                    {isTop && <div className="top-label">TOP</div>}
                  </div>
                );
              })
            ) : (
              <div className="empty-state">Stack is empty</div>
            )}
            <div className="stack-label">Bottom</div>
          </div>
          {currentMessage && (
            <div className="operation-message">{currentMessage}</div>
          )}
        </div>
      </div>

      <ExplanationPanel 
        explanation={currentExplanation}
        timeComplexity={timeComplexity}
        operation={stack.operation}
      />
    </div>
  );
};

export default StackVisualizer;

