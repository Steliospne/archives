function binarySearchRec(target, arr = []) {
  let middle = arr[Math.floor(arr.length / 2)];
  let middle_pos = Math.floor(arr.length / 2);

  return middle == target
    ? ["FOUND!",middle]
    : middle > target
    ? binarySearchRec(target, arr.slice(0, middle_pos))
    : middle < target
    ? binarySearchRec(target, arr.slice(middle_pos))
    : "Not FOUND!";
}

function binarySearch(target, arr = []) {
  while (true) {
    let middle = Math.floor(arr.length / 2);
    if (target > arr[middle]) {
      arr = arr.slice(middle);
    } else if (target < arr[middle]) {
      arr = arr.slice(0, middle);
    } else {
      return ["FOUND!", arr[middle]];
    }
    if (arr.length < 1) return "Not FOUND!";
  }
}

const formatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 5,
  maximumFractionDigits: 5,
});

let arr = [];
for (let i = 1; i <= 600; i++) {
  arr[i - 1] = i;
}

let t1 = performance.now();
let result1 = binarySearch(0, arr);
let t2 = performance.now();
let t3 = performance.now();
let result2 = binarySearchRec(0, arr);
let t4 = performance.now();

console.log(`
Result:" [${result1}] ${formatter.format(t2 - t1)} ms \n
Result:" [${result2}] ${formatter.format(t4 - t3)} ms \n
`);
