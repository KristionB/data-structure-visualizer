import React, { useState } from 'react';
import './App.css';
import ArrayVisualizer from './components/ArrayVisualizer';
import StackVisualizer from './components/StackVisualizer';
import QueueVisualizer from './components/QueueVisualizer';
import BSTVisualizer from './components/BSTVisualizer';

function App() {
  const [activeTab, setActiveTab] = useState('array');

  const tabs = [
    { id: 'array', label: 'Array', component: ArrayVisualizer },
    { id: 'stack', label: 'Stack', component: StackVisualizer },
    { id: 'queue', label: 'Queue', component: QueueVisualizer },
    { id: 'bst', label: 'Binary Search Tree', component: BSTVisualizer }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || ArrayVisualizer;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Data Structures Visualizer</h1>
        <p className="subtitle">Interactive visualization of core data structures</p>
      </header>
      
      <div className="tab-container">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <main className="App-main">
        <ActiveComponent />
      </main>
    </div>
  );
}

export default App;
