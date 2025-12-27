import React, { useState } from 'react';
import { createBST, insertBST, removeBST, searchBST, getTimeComplexity } from '../logic/bstOps';
import ExplanationPanel from './ExplanationPanel';
import './BSTVisualizer.css';

/**
 * BSTVisualizer Component
 * Visualizes Binary Search Tree operations step by step
 */
const BSTVisualizer = () => {
  const [bst, setBST] = useState(createBST([10, 5, 15, 3, 7, 12, 18]));
  const [inputValue, setInputValue] = useState('');
  const [currentExplanation, setCurrentExplanation] = useState('Welcome! Use the controls to perform BST operations. BST property: left child < parent < right child.');
  const [timeComplexity, setTimeComplexity] = useState(null);

  const handleInsert = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      alert('Please enter a valid number');
      return;
    }
    
    const newBST = insertBST(bst, value);
    setBST(newBST);
    setCurrentExplanation(newBST.steps[0]?.explanation || '');
    setTimeComplexity(getTimeComplexity('insert'));
    setInputValue('');
  };

  const handleRemove = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      alert('Please enter a valid number');
      return;
    }
    
    const newBST = removeBST(bst, value);
    setBST(newBST);
    setCurrentExplanation(newBST.steps[0]?.explanation || '');
    setTimeComplexity(getTimeComplexity('remove'));
    setInputValue('');
  };

  const handleSearch = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      alert('Please enter a valid number');
      return;
    }
    
    const newBST = searchBST(bst, value);
    setBST(newBST);
    setCurrentExplanation(newBST.steps[0]?.explanation || '');
    setTimeComplexity(getTimeComplexity('search'));
    setInputValue('');
  };

  const handleNextStep = () => {
    if (bst.steps && bst.currentStep < bst.steps.length - 1) {
      const nextStep = bst.currentStep + 1;
      const newBST = { ...bst, currentStep: nextStep };
      setBST(newBST);
      setCurrentExplanation(bst.steps[nextStep]?.explanation || '');
    }
  };

  const handleReset = () => {
    setBST(createBST([10, 5, 15, 3, 7, 12, 18]));
    setCurrentExplanation('Welcome! Use the controls to perform BST operations. BST property: left child < parent < right child.');
    setTimeComplexity(null);
    setInputValue('');
  };

  const currentRoot = bst.steps && bst.steps.length > 0 
    ? bst.steps[bst.currentStep]?.root || bst.root
    : bst.root;
  
  const highlighted = bst.steps && bst.steps.length > 0
    ? bst.steps[bst.currentStep]?.highlighted || []
    : [];

  const currentMessage = bst.steps && bst.steps.length > 0
    ? bst.steps[bst.currentStep]?.message || ''
    : '';

  // Calculate tree dimensions for rendering
  const getTreeHeight = (node) => {
    if (!node) return 0;
    return 1 + Math.max(getTreeHeight(node.left), getTreeHeight(node.right));
  };

  const height = getTreeHeight(currentRoot);

  // Render tree node recursively
  const renderNode = (node, level = 0, position = 0, maxLevel = height) => {
    if (!node) return null;

    const isHighlighted = highlighted.includes(node.value);
    const stepType = bst.steps && bst.steps.length > 0 
      ? bst.steps[bst.currentStep]?.type 
      : null;
    
    let nodeClass = 'tree-node';
    if (isHighlighted) {
      if (stepType === 'found') {
        nodeClass += ' found';
      } else if (stepType === 'notfound') {
        nodeClass += ' notfound';
      } else {
        nodeClass += ' highlighted';
      }
    }

    return (
      <div key={`${node.value}-${level}-${position}`} className={nodeClass}>
        <div className="node-content">
          <div className="node-value">{node.value}</div>
        </div>
        {(node.left || node.right) && (
          <div className="node-children">
            {renderNode(node.left, level + 1, position * 2, maxLevel)}
            {renderNode(node.right, level + 1, position * 2 + 1, maxLevel)}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="visualizer-container">
      <div className="visualizer-main">
        <h2>Binary Search Tree Visualizer</h2>
        
        <div className="controls">
          <div className="input-group">
            <input
              type="text"
              placeholder="Value"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="input-field"
            />
          </div>
          
          <div className="button-group">
            <button onClick={handleInsert} className="btn btn-primary">Insert</button>
            <button onClick={handleRemove} className="btn btn-secondary">Remove</button>
            <button onClick={handleSearch} className="btn btn-success">Search</button>
            <button 
              onClick={handleNextStep} 
              className="btn btn-info"
              disabled={!bst.steps || bst.currentStep >= bst.steps.length - 1}
            >
              Next Step
            </button>
            <button onClick={handleReset} className="btn btn-warning">Reset</button>
          </div>
        </div>

        <div className="visualization-area">
          <div className="bst-container">
            {currentRoot ? (
              <div className="tree-wrapper">
                {renderNode(currentRoot)}
              </div>
            ) : (
              <div className="empty-state">Tree is empty</div>
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
        operation={bst.operation}
      />
    </div>
  );
};

export default BSTVisualizer;

