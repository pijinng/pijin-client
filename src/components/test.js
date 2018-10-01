function juicy(array, test) {
  arr = [];
  for (let element of array) {
    if (test(element)) {
      arr.push(element);
    }
  }
  return arr;
}
console.log(
  juicy(
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    n => n % 2 === 0
  )
);
