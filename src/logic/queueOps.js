/**
 * Queue Operations Logic
 * Handles step-by-step queue operations for visualization
 * Queue follows FIFO (First In, First Out) principle
 */

export const createQueue = (initialValues = []) => {
  return {
    elements: [...initialValues],
    steps: [],
    currentStep: 0,
    operation: null
  };
};

export const enqueueQueue = (queue, value) => {
  const newQueue = { ...queue };
  const steps = [];
  
  // Step 1: Show current state
  steps.push({
    type: 'state',
    elements: [...newQueue.elements],
    highlighted: [],
    message: `Preparing to enqueue ${value} into the queue`,
    explanation: `We're about to enqueue the value ${value} into the queue. In a queue, new elements are always added to the rear (end of the array).`
  });
  
  // Step 2: Show where it will be added
  if (newQueue.elements.length > 0) {
    steps.push({
      type: 'highlight',
      elements: [...newQueue.elements],
      highlighted: [0],
      message: `Current front of queue: ${newQueue.elements[0]}`,
      explanation: `The current front of the queue is ${newQueue.elements[0]}. The new element will be added to the rear (end), and ${newQueue.elements[0]} will remain at the front.`
    });
  }
  
  // Step 3: Enqueue the value
  newQueue.elements.push(value);
  steps.push({
    type: 'enqueue',
    elements: [...newQueue.elements],
    highlighted: [newQueue.elements.length - 1],
    message: `Enqueued ${value} into the queue`,
    explanation: `The value ${value} has been successfully added to the rear of the queue. It will be the last element removed (FIFO - First In, First Out).`
  });
  
  return {
    ...newQueue,
    steps,
    currentStep: 0,
    operation: 'enqueue'
  };
};

export const dequeueQueue = (queue) => {
  const newQueue = { ...queue };
  const steps = [];
  
  if (newQueue.elements.length === 0) {
    steps.push({
      type: 'error',
      message: 'Cannot dequeue from an empty queue',
      explanation: 'A queue must have at least one element to perform a dequeue operation. This is called a "queue underflow" error.'
    });
    return { ...newQueue, steps, operation: 'dequeue' };
  }
  
  const valueToDequeue = newQueue.elements[0];
  
  // Step 1: Show current state
  steps.push({
    type: 'state',
    elements: [...newQueue.elements],
    highlighted: [],
    message: `Preparing to dequeue from the queue`,
    explanation: `We're about to dequeue an element from the queue. In a queue, we always remove from the front (the oldest element).`
  });
  
  // Step 2: Highlight front element
  steps.push({
    type: 'highlight',
    elements: [...newQueue.elements],
    highlighted: [0],
    message: `Front of queue: ${valueToDequeue}`,
    explanation: `The front element of the queue is ${valueToDequeue}. This is the element that will be removed (FIFO - First In, First Out).`
  });
  
  // Step 3: Dequeue the value
  newQueue.elements.shift();
  steps.push({
    type: 'dequeue',
    elements: [...newQueue.elements],
    highlighted: [],
    message: `Dequeued ${valueToDequeue} from the queue`,
    explanation: `The value ${valueToDequeue} has been successfully removed from the front of the queue. The queue now has ${newQueue.elements.length} elements.`
  });
  
  return {
    ...newQueue,
    steps,
    currentStep: 0,
    operation: 'dequeue'
  };
};

export const getTimeComplexity = (operation) => {
  const complexities = {
    enqueue: {
      best: 'O(1)',
      average: 'O(1)',
      worst: 'O(1)',
      explanation: 'Enqueue operation always adds to the end of the array, which is a constant time operation.'
    },
    dequeue: {
      best: 'O(1)',
      average: 'O(n)',
      worst: 'O(n)',
      explanation: 'Dequeue operation removes from the front, which requires shifting all remaining elements. In a real implementation, a circular buffer or linked list would make this O(1).'
    }
  };
  
  return complexities[operation] || { best: 'O(1)', average: 'O(1)', worst: 'O(1)', explanation: '' };
};

