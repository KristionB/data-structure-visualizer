/**
 * Array Operations Logic
 * Handles step-by-step array operations for visualization
 */

export const createArray = (initialValues = []) => {
  return {
    elements: [...initialValues],
    steps: [],
    currentStep: 0,
    operation: null
  };
};

export const insertArray = (array, value, index = null) => {
  const newArray = { ...array };
  const steps = [];
  
  // If index not specified, append to end
  const insertIndex = index !== null ? index : newArray.elements.length;
  
  if (insertIndex < 0 || insertIndex > newArray.elements.length) {
    steps.push({
      type: 'error',
      message: `Cannot insert at index ${insertIndex}. Valid range: 0-${newArray.elements.length}`,
      explanation: `Array indices must be within the valid range. Attempting to insert at an invalid index would cause an error.`
    });
    return { ...newArray, steps, operation: 'insert' };
  }
  
  // Step 1: Show current state
  steps.push({
    type: 'state',
    elements: [...newArray.elements],
    highlighted: [],
    message: `Preparing to insert ${value} at index ${insertIndex}`,
    explanation: `We're about to insert the value ${value} into the array. The array currently has ${newArray.elements.length} elements.`
  });
  
  // Step 2: Show insertion point
  steps.push({
    type: 'highlight',
    elements: [...newArray.elements],
    highlighted: [insertIndex],
    message: `Inserting ${value} at index ${insertIndex}`,
    explanation: `We'll insert the new element at position ${insertIndex}. Elements at and after this index will shift to make room.`
  });
  
  // Step 3: Insert the value
  newArray.elements.splice(insertIndex, 0, value);
  steps.push({
    type: 'insert',
    elements: [...newArray.elements],
    highlighted: [insertIndex],
    message: `Inserted ${value} at index ${insertIndex}`,
    explanation: `The value ${value} has been successfully inserted. The array now has ${newArray.elements.length} elements.`
  });
  
  return {
    ...newArray,
    steps,
    currentStep: 0,
    operation: 'insert'
  };
};

export const removeArray = (array, index) => {
  const newArray = { ...array };
  const steps = [];
  
  if (index < 0 || index >= newArray.elements.length) {
    steps.push({
      type: 'error',
      message: `Cannot remove at index ${index}. Valid range: 0-${newArray.elements.length - 1}`,
      explanation: `Array indices must be within the valid range. Attempting to remove from an invalid index would cause an error.`
    });
    return { ...newArray, steps, operation: 'remove' };
  }
  
  const valueToRemove = newArray.elements[index];
  
  // Step 1: Show current state
  steps.push({
    type: 'state',
    elements: [...newArray.elements],
    highlighted: [],
    message: `Preparing to remove element at index ${index}`,
    explanation: `We're about to remove the element at index ${index}, which contains the value ${valueToRemove}.`
  });
  
  // Step 2: Highlight element to remove
  steps.push({
    type: 'highlight',
    elements: [...newArray.elements],
    highlighted: [index],
    message: `Removing element ${valueToRemove} at index ${index}`,
    explanation: `The element at index ${index} (value: ${valueToRemove}) will be removed. Elements after this index will shift left to fill the gap.`
  });
  
  // Step 3: Remove the element
  newArray.elements.splice(index, 1);
  steps.push({
    type: 'remove',
    elements: [...newArray.elements],
    highlighted: [],
    message: `Removed element at index ${index}`,
    explanation: `The element has been successfully removed. The array now has ${newArray.elements.length} elements.`
  });
  
  return {
    ...newArray,
    steps,
    currentStep: 0,
    operation: 'remove'
  };
};

export const getTimeComplexity = (operation) => {
  const complexities = {
    insert: {
      best: 'O(1)',
      average: 'O(n)',
      worst: 'O(n)',
      explanation: 'Insertion at the end is O(1), but inserting at a specific index requires shifting elements, which is O(n) in the worst case.'
    },
    remove: {
      best: 'O(1)',
      average: 'O(n)',
      worst: 'O(n)',
      explanation: 'Removal from the end is O(1), but removing from a specific index requires shifting elements, which is O(n) in the worst case.'
    }
  };
  
  return complexities[operation] || { best: 'O(1)', average: 'O(1)', worst: 'O(1)', explanation: '' };
};

