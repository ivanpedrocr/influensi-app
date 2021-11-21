export const findLastIndex = (arr, callback) => {
  let index = arr.length;
  while (index--) {
    if (callback(arr[index], index, arr)) {
      return index;
    }
    return -1;
  }
};
