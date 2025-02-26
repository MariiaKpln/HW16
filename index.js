function myReduce(array, callback, initialValue) {
  let acc = initialValue ?? array[0];
  const index = initialValue == undefined ? 1 : 0;
  for (let i = 0; i < array.length; i += 1) {
    acc = callback(acc, array[i], i, array);
  }
  return acc;
}
function minMax(arr) {
    const res = myReduce(arr, (axx, curr) => [acc[0]] > curr ? curr : acc[0], acc[1] < curr ? curr : acc[1],
    [arr[0], arr[0]]);
    return res;
  //TODO
  //arr is an array containing either strings or numbers
  // returns array with two elemnts: first is min value, second is max value
  //requirement: to use myReduce method described above
}
