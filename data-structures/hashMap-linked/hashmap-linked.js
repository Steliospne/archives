const linkedList = require("../keydLinkedList/linkedlist.js");

class hashMap {
  static #bucketList = Array.from({ length: 16 }, () => new linkedList());
  static #entries_count = 0;
  static #load_factor = 0.75;

  static #hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  }

  static #position(key) {
    return Math.floor(this.#hash(key) % 16);
  }

  static set(key, value) {
    const hashCode = this.#position(key);
    if (
      hashCode < 0 ||
      hashCode == undefined ||
      hashCode > this.#bucketList.length - 1
    ) {
      const error = new RangeError();
      error.message = "index provided is out of range";
      throw error;
    }
    
    this.#bucketList[hashCode].append(key, value);
    this.#entries_count++;

    if (this.#entries_count >= this.#load_factor * this.#bucketList.length) {
      const prevBucket = this.#bucketList;
      this.#bucketList = Array.from({ length: 16 * 2 }, () => new linkedList());

    let temp = {}
      for (let item of prevBucket) {
        if (item.head) {
          temp = item.head
          
          while (temp != null) {
            hashMap.set(temp.key, temp.value);
            temp = temp.nextNode
            this.#entries_count--
          }
        }
      }
    }
  }

  static get(key) {
    for (let item of this.#bucketList) {
      if (item.head) {
        let temp = item.head;
        while (temp !== null) {
          // console.log(temp.key)
          if (temp.key === key && temp.nextNode === null) {
            return temp.value;
          } else {
            temp = temp.nextNode;
          }
        }
      }
    }
    return null;
  }

  static has(key) {
    for (let item of this.#bucketList) {
      if (item.head) {
        let temp = item.head;
        while (temp !== null) {
          // console.log(temp.key)
          if (temp.key === key && temp.nextNode === null) {
            return true;
          } else {
            temp = temp.nextNode;
          }
        }
      }
    }
    return false;
  }

  static length() {
    let count = 0;
    for (let item of this.#bucketList) {
      if (item.head) {
        count += item.size;
      }
    }
    return count;
  }

  static clear() {
    this.#bucketList = Array.from({ length: 16 }, () => new linkedList());
  }

  static keys() {
    const result = [];
    for (let item of this.#bucketList) {
      if (item.head) {
        let temp = item.head;
        while (temp !== null) {
          result.push(temp.key);
          temp = temp.nextNode;
        }
      }
    }

    return result;
  }

  static values() {
    const result = [];
    for (let item of this.#bucketList) {
      if (item.head) {
        let temp = item.head;
        while (temp !== null) {
          result.push(temp.value);
          temp = temp.nextNode;
        }
      }
    }

    return result;
  }

  static entries() {
    const result = [];
    for (let item of this.#bucketList) {
      if (item.head) {
        let temp = item.head;
        while (temp !== null) {
          result.push([temp.key, temp.value]);
          temp = temp.nextNode;
        }
      }
    }

    return result;
  }

  static debug() {
    console.log(this.#bucketList);
  }
}

// hashMap.set("stelios", "mage");
// hashMap.set("maria_", "cook");
// hashMap.set("maria_", "suchef");
// hashMap.set("maria_", "chef");

hashMap.set("apple_", "red");
hashMap.set("apple_", "redish");
hashMap.set("banana", "yellow");
hashMap.set("carrot", "orange");
hashMap.set("dog", "brown");
hashMap.set("elephant", "gray");
hashMap.set("frog", "green");
hashMap.set("grape", "purple");
hashMap.set("hat", "black");
hashMap.set("ice cream", "white");
hashMap.set("jacket", "blue");
hashMap.set("kite", "pink");
hashMap.set("lion", "golden");

hashMap.debug();
// console.log(hashMap.get("stelios"));
// console.log(hashMap.has("stelios"));
// console.log(hashMap.length());
// console.log(hashMap.keys());
// console.log(hashMap.values());
// console.log(hashMap.entries());
