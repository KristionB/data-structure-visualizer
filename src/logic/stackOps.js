/**
 * Stack Operations Logic
 * Handles step-by-step stack operations for visualization
 * Stack follows LIFO (Last In, First Out) principle
 */

export const createStack = (initialValues = []) => {
  return {
    elements: [...initialValues],
    steps: [],
    currentStep: 0,
    operation: null
  };
};

export const pushStack = (stack, value) => {
  const newStack = { ...stack };
  const steps = [];
  
  // Step 1: Show current state
  steps.push({
    type: 'state',
    elements: [...newStack.elements],
    highlighted: [],
    message: `Preparing to push ${value} onto the stack`,
    explanation: `We're about to push the value ${value} onto the stack. In a stack, new elements are always added to the top (end of the array).`
  });
  
  // Step 2: Show where it will be added
  if (newStack.elements.length > 0) {
    steps.push({
      type: 'highlight',
      elements: [...newStack.elements],
      highlighted: [newStack.elements.length - 1],
      message: `Current top of stack: ${newStack.elements[newStack.elements.length - 1]}`,
      explanation: `The current top of the stack is ${newStack.elements[newStack.elements.length - 1]}. The new element will be placed on top of it.`
    });
  }
  
  // Step 3: Push the value
  newStack.elements.push(value);
  steps.push({
    type: 'push',
    elements: [...newStack.elements],
    highlighted: [newStack.elements.length - 1],
    message: `Pushed ${value} onto the stack`,
    explanation: `The value ${value} has been successfully pushed onto the stack. It is now at the top of the stack and will be the first element removed (LIFO - Last In, First Out).`
  });
  
  return {
    ...newStack,
    steps,
    currentStep: 0,
    operation: 'push'
  };
};

export const popStack = (stack) => {
  const newStack = { ...stack };
  const steps = [];
  
  if (newStack.elements.length === 0) {
    steps.push({
      type: 'error',
      message: 'Cannot pop from an empty stack',
      explanation: 'A stack must have at least one element to perform a pop operation. This is called a "stack underflow" error.'
    });
    return { ...newStack, steps, operation: 'pop' };
  }
  
  const valueToPop = newStack.elements[newStack.elements.length - 1];
  
  // Step 1: Show current state
  steps.push({
    type: 'state',
    elements: [...newStack.elements],
    highlighted: [],
    message: `Preparing to pop from the stack`,
    explanation: `We're about to pop an element from the stack. In a stack, we always remove from the top (the most recently added element).`
  });
  
  // Step 2: Highlight top element
  steps.push({
    type: 'highlight',
    elements: [...newStack.elements],
    highlighted: [newStack.elements.length - 1],
    message: `Top of stack: ${valueToPop}`,
    explanation: `The top element of the stack is ${valueToPop}. This is the element that will be removed (LIFO - Last In, First Out).`
  });
  
  // Step 3: Pop the value
  newStack.elements.pop();
  steps.push({
    type: 'pop',
    elements: [...newStack.elements],
    highlighted: [],
    message: `Popped ${valueToPop} from the stack`,
    explanation: `The value ${valueToPop} has been successfully removed from the stack. The stack now has ${newStack.elements.length} elements.`
  });
  
  return {
    ...newStack,
    steps,
    currentStep: 0,
    operation: 'pop'
  };
};

export const getTimeComplexity = (operation) => {
  const complexities = {
    push: {
      best: 'O(1)',
      average: 'O(1)',
      worst: 'O(1)',
      explanation: 'Push operation always adds to the end of the array, which is a constant time operation.'
    },
    pop: {
      best: 'O(1)',
      average: 'O(1)',
      worst: 'O(1)',
      explanation: 'Pop operation always removes from the end of the array, which is a constant time operation.'
    }
  };
  
  return complexities[operation] || { best: 'O(1)', average: 'O(1)', worst: 'O(1)', explanation: '' };
};

