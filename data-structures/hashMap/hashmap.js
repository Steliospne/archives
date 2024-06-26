class hashMap {
  static #bucketList = Array.from({ length: 16 }, () => null);
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
    // if (
    //   hashCode < 0 ||
    //   hashCode == undefined ||
    //   hashCode > this.#bucketList.length - 1
    // ) {
    //   const error = new RangeError();
    //   error.message = "index provided is out of range";
    //   throw error;
    // }
    if(this.#bucketList[hashCode] === null) 
      this.#entries_count++;
    this.#bucketList[hashCode] = new Node(key, value);

    if (this.#entries_count > this.#bucketList.length * this.#load_factor) {
      const oldList = this.#bucketList;
      this.#bucketList = Array.from({ length: 16 * 2 }, () => null);

      for (let item of oldList) {
        if (item) {
          hashMap.set(item.key, item.value);
          this.#entries_count--;
        }
      }
    }
  }

  static get(key) {
    for (let item of this.#bucketList) {
      if (item) {
        return item.key === key ? item.value : null;
      }
    }
  }

  static has(key) {
    if (
      this.#bucketList[this.#position(key)] &&
      this.#bucketList[this.#position(key)].key === key
    )
      return true;
    return false;
  }

  static remove(key) {
    if (hashMap.has(key)) {
      this.#bucketList[this.#position(key)] = null;
      this.#entries_count--
      return true;
    }
    return false;
  }

  static length() {
    return this.#entries_count;
  }

  // static length() {
  //   let sum = 0;
  //   this.#bucketList.forEach((el) => {
  //     if (el !== undefined) {
  //       sum++;
  //     }
  //   });
  //   return sum;
  // }

  // static clear() {
  //   this.#bucketList = [...Array(16)];
  // }

  // static keys() {
  //   return this.#keyList.filter((el) => el !== undefined);
  // }

  // static values() {
  //   return this.#bucketList.filter((el) => el !== undefined);
  // }

  // static entries() {
  //   const temp = [];
  //   for (let i = 0; i < this.#bucketList.length; i++) {
  //     if (this.#bucketList[i] !== undefined)
  //       temp.push([this.#keyList[i], this.#bucketList[i]]);
  //   }

  //   return temp;
  // }

  static debug() {
    console.log(this.#bucketList);
  }
}

class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.nextNode = null;
  }
}

hashMap.set('apple', 'red')
hashMap.set('banana', 'yellow')
hashMap.set('carrot', 'orange')
hashMap.set('dog', 'brown')
hashMap.set('elephant', 'gray')
hashMap.set('frog', 'green')
hashMap.set('grape', 'purple')
hashMap.set('hat', 'black')
hashMap.set('ice cream', 'white')
hashMap.set('jacket', 'blue')
hashMap.set('kite', 'pink')
hashMap.set('lion', 'golden')
hashMap.set('moon', 'silver')



// console.log(hashMap.get("moon"));
// console.log(hashMap.remove("moon"));
console.log(hashMap.length());
// console.log(hashMap.remove("Stelios"));
// console.log(hashMap.length());
// console.log(hashMap.keys());
// console.log(hashMap.values());
// console.log(hashMap.entries());

hashMap.debug();
