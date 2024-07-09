const mergeSort = require("../../algorithms/sort/mergeSort.js");

class Node {
  constructor(value) {
    this.value = value;
    this.left = this.right = null;
  }
}

class Tree {
  static root;

  static buildTree(arr) {
    const middle = Math.floor(arr.length / 2);
    if (arr.length === 0) return null;
    const root = new Node(arr[middle]);
    root.left = this.buildTree(arr.slice(0, middle));
    root.right = this.buildTree(arr.slice(middle + 1));

    this.root = root;

    return root;
  }

  static insertNode(node, value) {
    if (!node) return new Node(value);

    if (value < node.value) {
      node.left = this.insertNode(node.left, value);
    } else {
      node.right = this.insertNode(node.right, value);
    }

    return node;
  }

  static remove(value) {
    const node = this.find(value)
    if(node && !(node.left && node.right)){
      return this.buildTree(this.inOrder(this.root).filter(item=>item!==value))
    } else if(node && (node.left || node.right)){
      node.left ? node = node.left: node = node.right
      return this.root
    } else {
      return this.buildTree(this.inOrder(root).filter(item=>item!==value))
    }
    return false
  }

  static preOrder(root) {
    const resultArr = [];
    const result = function traverse(root) {
      if (!root) return;
      resultArr.push(root.value);
      traverse(root.left);
      traverse(root.right);
      return resultArr;
    };
    return result(root);
  }

  static inOrder(root) {
    const resultArr = [];
    const result = function traverse(root) {
      if (root) {
        traverse(root.left);
        resultArr.push(root.value);
        traverse(root.right);
      }

      return resultArr;
    };
    return result(root);
  }

  static postOrder(root) {
    const resultArr = [];
    const result = function traverse(root) {
      if (root) {
        traverse(root.right);
        resultArr.push(root.value);
        traverse(root.left);
      }

      return resultArr;
    };
    return result(root);
  }

  static breadthTraversal(node) {
    const queue = [];
    const result = [];
    let currentNode;
    if (!node) return;
    queue.push(node);
    while (queue.length !== 0) {
      currentNode = queue[0];
      result.push(currentNode.value);
      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
      queue.shift();
    }
    return result;
  }

  static levelOrder(callback) {
    if (callback) {
      return this.breadthTraversal(this.root).map((item) => callback(item));
    }
    return this.breadthTraversal(this.root);
  }

  static find(value) {
    const queue = [];
    const result = [];
    const node = this.root;
    let currentNode;
    if (!node) return;
    queue.push(node);
    while (queue.length !== 0) {
      currentNode = queue[0];
      result.push(currentNode);
      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
      queue.shift();
    }
    return result.length === 0
      ? false
      : result.filter((node) => node.value === value);
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const testArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const prepareArr = (arr) => {
  const set = new Set();

  for (let el of arr) {
    set.add(el);
  }

  const equalizedArr = Array.from(set);
  const sortedArr = mergeSort(equalizedArr);

  return sortedArr;
};