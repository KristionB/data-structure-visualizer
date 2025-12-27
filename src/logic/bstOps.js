/**
 * Binary Search Tree Operations Logic
 * Handles step-by-step BST operations for visualization
 * BST property: left child < parent < right child
 */

export class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export const createBST = (initialValues = []) => {
  const root = null;
  const bst = {
    root: root,
    steps: [],
    currentStep: 0,
    operation: null
  };
  
  // Build tree from initial values
  let tree = bst;
  initialValues.forEach(val => {
    tree = insertBST(tree, val);
  });
  
  return {
    ...tree,
    steps: [],
    currentStep: 0,
    operation: null
  };
};

const copyTree = (node) => {
  if (!node) return null;
  const newNode = new TreeNode(node.value);
  newNode.left = copyTree(node.left);
  newNode.right = copyTree(node.right);
  return newNode;
};

export const insertBST = (bst, value) => {
  const newBST = {
    ...bst,
    root: copyTree(bst.root)
  };
  const steps = [];
  
  // Step 1: Show current state
  steps.push({
    type: 'state',
    root: copyTree(newBST.root),
    highlighted: [],
    message: `Preparing to insert ${value} into the BST`,
    explanation: `We're about to insert the value ${value} into the binary search tree. We'll start from the root and follow the BST property: left child < parent < right child.`
  });
  
  // Step 2: Insert with step tracking
  const insertRecursive = (node, val, path = []) => {
    if (!node) {
      steps.push({
        type: 'insert',
        root: copyTree(newBST.root),
        highlighted: [...path],
        newValue: val,
        message: `Inserting ${val} at this position`,
        explanation: `We've found the correct position for ${val}. Since this is a null node, we'll create a new node here.`
      });
      return new TreeNode(val);
    }
    
    // Highlight current node
    const currentPath = [...path, node.value];
    steps.push({
      type: 'traverse',
      root: copyTree(newBST.root),
      highlighted: currentPath,
      message: `Comparing ${val} with ${node.value}`,
      explanation: `We compare ${val} with ${node.value}. Since ${val < node.value ? val + ' < ' + node.value : val + ' > ' + node.value}, we'll go ${val < node.value ? 'left' : 'right'}.`
    });
    
    if (val < node.value) {
      node.left = insertRecursive(node.left, val, currentPath);
    } else if (val > node.value) {
      node.right = insertRecursive(node.right, val, currentPath);
    } else {
      steps.push({
        type: 'error',
        root: copyTree(newBST.root),
        highlighted: currentPath,
        message: `Value ${val} already exists in the tree`,
        explanation: `The value ${val} is already present in the BST. Binary search trees typically don't allow duplicate values.`
      });
      return node;
    }
    
    return node;
  };
  
  newBST.root = insertRecursive(newBST.root, value);
  
  // Final step
  steps.push({
    type: 'complete',
    root: copyTree(newBST.root),
    highlighted: [],
    message: `Successfully inserted ${value} into the BST`,
    explanation: `The value ${value} has been successfully inserted while maintaining the BST property: all left descendants are less than the node, and all right descendants are greater.`
  });
  
  return {
    ...newBST,
    steps,
    currentStep: 0,
    operation: 'insert'
  };
};

export const removeBST = (bst, value) => {
  const newBST = {
    ...bst,
    root: copyTree(bst.root)
  };
  const steps = [];
  
  if (!newBST.root) {
    steps.push({
      type: 'error',
      root: null,
      highlighted: [],
      message: 'Cannot remove from an empty tree',
      explanation: 'The binary search tree is empty, so there are no elements to remove.'
    });
    return { ...newBST, steps, operation: 'remove' };
  }
  
  // Step 1: Show current state
  steps.push({
    type: 'state',
    root: copyTree(newBST.root),
    highlighted: [],
    message: `Preparing to remove ${value} from the BST`,
    explanation: `We're about to remove the value ${value} from the binary search tree. We'll first search for the node, then handle its removal.`
  });
  
  const findMin = (node) => {
    while (node.left) {
      node = node.left;
    }
    return node;
  };
  
  const removeRecursive = (node, val, path = []) => {
    if (!node) {
      steps.push({
        type: 'error',
        root: copyTree(newBST.root),
        highlighted: path,
        message: `Value ${val} not found in the tree`,
        explanation: `We've reached a null node while searching for ${val}, which means the value doesn't exist in the BST.`
      });
      return null;
    }
    
    const currentPath = [...path, node.value];
    
    if (val < node.value) {
      steps.push({
        type: 'traverse',
        root: copyTree(newBST.root),
        highlighted: currentPath,
        message: `Comparing ${val} with ${node.value}, going left`,
        explanation: `Since ${val} < ${node.value}, we continue searching in the left subtree.`
      });
      node.left = removeRecursive(node.left, val, currentPath);
    } else if (val > node.value) {
      steps.push({
        type: 'traverse',
        root: copyTree(newBST.root),
        highlighted: currentPath,
        message: `Comparing ${val} with ${node.value}, going right`,
        explanation: `Since ${val} > ${node.value}, we continue searching in the right subtree.`
      });
      node.right = removeRecursive(node.right, val, currentPath);
    } else {
      // Found the node to remove
      steps.push({
        type: 'highlight',
        root: copyTree(newBST.root),
        highlighted: currentPath,
        message: `Found node ${val} to remove`,
        explanation: `We've found the node containing ${val}. Now we need to handle its removal based on how many children it has.`
      });
      
      // Case 1: No children
      if (!node.left && !node.right) {
        steps.push({
          type: 'remove',
          root: copyTree(newBST.root),
          highlighted: currentPath,
          message: `Removing leaf node ${val}`,
          explanation: `Node ${val} has no children (it's a leaf), so we can simply remove it.`
        });
        return null;
      }
      
      // Case 2: One child
      if (!node.left) {
        steps.push({
          type: 'remove',
          root: copyTree(newBST.root),
          highlighted: currentPath,
          message: `Removing node ${val} with right child only`,
          explanation: `Node ${val} has only a right child. We replace it with its right child.`
        });
        return node.right;
      }
      if (!node.right) {
        steps.push({
          type: 'remove',
          root: copyTree(newBST.root),
          highlighted: currentPath,
          message: `Removing node ${val} with left child only`,
          explanation: `Node ${val} has only a left child. We replace it with its left child.`
        });
        return node.left;
      }
      
      // Case 3: Two children
      steps.push({
        type: 'traverse',
        root: copyTree(newBST.root),
        highlighted: currentPath,
        message: `Node ${val} has two children, finding inorder successor`,
        explanation: `Node ${val} has two children. We'll find the inorder successor (smallest value in right subtree) to replace it.`
      });
      
      const successor = findMin(node.right);
      steps.push({
        type: 'highlight',
        root: copyTree(newBST.root),
        highlighted: [...currentPath, successor.value],
        message: `Found successor: ${successor.value}`,
        explanation: `The inorder successor is ${successor.value}. We'll replace ${val} with ${successor.value} and remove the original successor node.`
      });
      
      node.value = successor.value;
      node.right = removeRecursive(node.right, successor.value, currentPath);
    }
    
    return node;
  };
  
  newBST.root = removeRecursive(newBST.root, value);
  
  // Final step
  steps.push({
    type: 'complete',
    root: copyTree(newBST.root),
    highlighted: [],
    message: `Successfully removed ${value} from the BST`,
    explanation: `The value ${value} has been successfully removed while maintaining the BST property.`
  });
  
  return {
    ...newBST,
    steps,
    currentStep: 0,
    operation: 'remove'
  };
};

export const searchBST = (bst, value) => {
  const newBST = {
    ...bst,
    root: copyTree(bst.root)
  };
  const steps = [];
  
  if (!newBST.root) {
    steps.push({
      type: 'error',
      root: null,
      highlighted: [],
      message: 'Cannot search in an empty tree',
      explanation: 'The binary search tree is empty, so the search value cannot be found.'
    });
    return { ...newBST, steps, operation: 'search' };
  }
  
  // Step 1: Show current state
  steps.push({
    type: 'state',
    root: copyTree(newBST.root),
    highlighted: [],
    message: `Searching for ${value} in the BST`,
    explanation: `We're about to search for the value ${value} in the binary search tree. We'll start from the root and follow the BST property.`
  });
  
  const searchRecursive = (node, val, path = []) => {
    if (!node) {
      steps.push({
        type: 'notfound',
        root: copyTree(newBST.root),
        highlighted: path,
        message: `Value ${val} not found in the tree`,
        explanation: `We've reached a null node, which means ${val} doesn't exist in the BST. The search path we followed was correct based on the BST property.`
      });
      return false;
    }
    
    const currentPath = [...path, node.value];
    
    if (val === node.value) {
      steps.push({
        type: 'found',
        root: copyTree(newBST.root),
        highlighted: currentPath,
        message: `Found ${val} in the tree!`,
        explanation: `We've successfully found ${val} in the BST. The search path we followed was: ${path.length > 0 ? path.join(' → ') + ' → ' : ''}${val}.`
      });
      return true;
    }
    
    steps.push({
      type: 'traverse',
      root: copyTree(newBST.root),
      highlighted: currentPath,
      message: `Comparing ${val} with ${node.value}, going ${val < node.value ? 'left' : 'right'}`,
      explanation: `We compare ${val} with ${node.value}. Since ${val < node.value ? val + ' < ' + node.value : val + ' > ' + node.value}, we continue searching in the ${val < node.value ? 'left' : 'right'} subtree.`
    });
    
    if (val < node.value) {
      return searchRecursive(node.left, val, currentPath);
    } else {
      return searchRecursive(node.right, val, currentPath);
    }
  };
  
  searchRecursive(newBST.root, value);
  
  return {
    ...newBST,
    steps,
    currentStep: 0,
    operation: 'search'
  };
};

export const getTimeComplexity = (operation) => {
  const complexities = {
    insert: {
      best: 'O(log n)',
      average: 'O(log n)',
      worst: 'O(n)',
      explanation: 'In a balanced BST, insertion is O(log n). In the worst case (unbalanced tree), it becomes O(n).'
    },
    remove: {
      best: 'O(log n)',
      average: 'O(log n)',
      worst: 'O(n)',
      explanation: 'In a balanced BST, removal is O(log n). In the worst case (unbalanced tree), it becomes O(n).'
    },
    search: {
      best: 'O(log n)',
      average: 'O(log n)',
      worst: 'O(n)',
      explanation: 'In a balanced BST, search is O(log n). In the worst case (unbalanced tree), it becomes O(n).'
    }
  };
  
  return complexities[operation] || { best: 'O(1)', average: 'O(1)', worst: 'O(1)', explanation: '' };
};

