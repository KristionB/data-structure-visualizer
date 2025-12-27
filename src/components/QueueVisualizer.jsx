import React, { useState } from 'react';
import { createQueue, enqueueQueue, dequeueQueue, getTimeComplexity } from '../logic/queueOps';
import ExplanationPanel from './ExplanationPanel';
import './QueueVisualizer.css';

/**
 * QueueVisualizer Component
 * Visualizes queue operations step by step (FIFO)
 */
const QueueVisualizer = () => {
  const [queue, setQueue] = useState(createQueue([10, 20, 30]));
  const [inputValue, setInputValue] = useState('');
  const [currentExplanation, setCurrentExplanation] = useState('Welcome! Use the controls to perform queue operations. Queue follows FIFO (First In, First Out) principle.');
  const [timeComplexity, setTimeComplexity] = useState(null);

  const handleEnqueue = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      alert('Please enter a valid number');
      return;
    }
    
    const newQueue = enqueueQueue(queue, value);
    setQueue(newQueue);
    setCurrentExplanation(newQueue.steps[0]?.explanation || '');
    setTimeComplexity(getTimeComplexity('enqueue'));
    setInputValue('');
  };

  const handleDequeue = () => {
    const newQueue = dequeueQueue(queue);
    setQueue(newQueue);
    setCurrentExplanation(newQueue.steps[0]?.explanation || '');
    setTimeComplexity(getTimeComplexity('dequeue'));
  };

  const handleNextStep = () => {
    if (queue.steps && queue.currentStep < queue.steps.length - 1) {
      const nextStep = queue.currentStep + 1;
      const newQueue = { ...queue, currentStep: nextStep };
      setQueue(newQueue);
      setCurrentExplanation(queue.steps[nextStep]?.explanation || '');
    }
  };

  const handleReset = () => {
    setQueue(createQueue([10, 20, 30]));
    setCurrentExplanation('Welcome! Use the controls to perform queue operations. Queue follows FIFO (First In, First Out) principle.');
    setTimeComplexity(null);
    setInputValue('');
  };

  const currentElements = queue.steps && queue.steps.length > 0 
    ? queue.steps[queue.currentStep]?.elements || queue.elements
    : queue.elements;
  
  const highlighted = queue.steps && queue.steps.length > 0
    ? queue.steps[queue.currentStep]?.highlighted || []
    : [];

  const currentMessage = queue.steps && queue.steps.length > 0
    ? queue.steps[queue.currentStep]?.message || ''
    : '';

  return (
    <div className="visualizer-container">
      <div className="visualizer-main">
        <h2>Queue Visualizer (FIFO)</h2>
        
        <div className="controls">
          <div className="input-group">
            <input
              type="text"
              placeholder="Value to enqueue"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="input-field"
            />
          </div>
          
          <div className="button-group">
            <button onClick={handleEnqueue} className="btn btn-primary">Enqueue</button>
            <button onClick={handleDequeue} className="btn btn-secondary">Dequeue</button>
            <button 
              onClick={handleNextStep} 
              className="btn btn-info"
              disabled={!queue.steps || queue.currentStep >= queue.steps.length - 1}
            >
              Next Step
            </button>
            <button onClick={handleReset} className="btn btn-warning">Reset</button>
          </div>
        </div>

        <div className="visualization-area">
          <div className="queue-container">
            <div className="queue-labels">
              <span className="queue-label front">Front</span>
              <span className="queue-label rear">Rear</span>
            </div>
            {currentElements.length > 0 ? (
              <div className="queue-elements">
                {currentElements.map((value, index) => {
                  const isFront = index === 0;
                  const isRear = index === currentElements.length - 1;
                  const isHighlighted = highlighted.includes(index);
                  return (
                    <div
                      key={index}
                      className={`queue-element ${isHighlighted ? 'highlighted' : ''} ${isFront ? 'front' : ''} ${isRear ? 'rear' : ''}`}
                    >
                      <div className="element-value">{value}</div>
                      {isFront && <div className="front-label">FRONT</div>}
                      {isRear && <div className="rear-label">REAR</div>}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="empty-state">Queue is empty</div>
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
        operation={queue.operation}
      />
    </div>
  );
};

export default QueueVisualizer;

