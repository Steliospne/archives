 module.exports = class linkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
  append(key, value) {
    const node = new Node(key, value);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.nextNode = node;
      this.tail = node;
    }
    this.size += 1;
  }

  prepend(key, value) {
    const node = new Node(key, value);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.head = node;
      this.head.nextNode = this.tail;
    }
    this.size += 1;
  }

  at(index) {
    let current = this.head;
    let counter = 0;
    while (current && counter < index) {
      current = current.nextNode;
      counter += 1;
    }
    return current;
  }

  pop() {
    let temp = this.head;
    let counter = 0;
    while (counter < this.size - 2) {
      temp = temp.nextNode;
      counter++;
    }
    this.size--;
    // console.log(temp)
    temp.nextNode = null;
    this.tail = temp;
  }

  containsValue(value) {
    let temp = this.head;
    while (temp !== null) {
      if (value == temp.value) return true;
      temp = temp.nextNode;
    }
    return false;
  }

  containsKey(key) {
    let temp = this.head;
    while (temp !== null) {
      if (key == temp.key) return true;
      temp = temp.nextNode;
    }
    return false;
  }

  // static find(value) {
  //   let temp = [];
  //   for (let el of this.#list) {
  //     if (el.value == value) {
  //       temp.push(this.#list.indexOf(el));
  //     } else {
  //       continue;
  //     }
  //   }
  //   if (temp.length == 1) return temp[0];
  //   if (temp.length !== 0) return temp;
  //   return null;
  // }

  toString() {
    let temp = this.head;
    let tempString = "";
    while (temp !== null) {
      tempString += `(${temp.key},${temp.value}) => `;
      temp = temp.nextNode;
    }
    tempString += "null";
    return tempString;
  }

  // static insertAt(value, index) {
  //   if (index < 0 || index == undefined || index > this.#list.length - 1) {
  //     const error = new RangeError();
  //     error.message = "index provided is out of range";
  //     throw error;
  //   }

  //   const node = new Node();
  //   node.value = value;

  //   if (index == 0) {
  //     this.#list.unshift(node);
  //   } else if (index == this.#list.length - 1) {
  //     this.#list.push(node);
  //   } else {
  //     const leftSplit = this.#list.slice(0, index);
  //     const rightSplit = this.#list.slice(index);
  //     node.nextNode = rightSplit[0];
  //     leftSplit[leftSplit.length - 1].nextNode = node;
  //     leftSplit.push(node);
  //     this.#list = leftSplit.concat(rightSplit);
  //   }
  // }

  // static removeAt(index) {
  //   if (index < 0 || index == undefined || index > this.#list.length - 1) {
  //     const error = new RangeError();
  //     error.message = "index provided is out of range";
  //     throw error;
  //   }

  //   if (index == 0) {
  //     this.#list.shift();
  //   } else if (index == this.#list.length - 1) {
  //     this.#list.pop();
  //     this.#list[this.#list.length - 1].nextNode = null;
  //   } else {
  //     this.#list = this.#list.filter((el) => this.#list.indexOf(el) !== index);
  //     this.#list[index - 1].nextNode = this.#list[index];
  //   }
  // }

  // static head() {
  //   return this.#list.length == 0 ? "Empty" : this.#list[0];
  // }

  // static tail() {
  //   return this.#list.length == 0 ? "Empty" : this.#list[this.#list.length - 1];
  // }

  // static size() {
  //   return this.#list.length;
  // }

  // static debug() {
  //   return this.#list;
  // }
}

class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.nextNode = null;
  }
}

// const test = new linkedList();
// test.append("stelios", "engineer");
// test.prepend("marc", "engineer");
// test.append("robert", "engineer");
// test.append("maria", "engineer");
// test.append("takis", "engineer");
// test.append("george", "engineer");

// test.pop();
// console.log(test);
// console.log(test.containsValue("engineer"));
// console.log(test.containsKey("George"));
// console.log(test.toString());
// console.log(test.head)
// console.log(test.tail)
// console.log(test.size)
