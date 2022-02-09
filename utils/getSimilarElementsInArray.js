export const getSimilarElementsInArray = (arr1 = [], arr2 = []) => {
  return arr1.filter((v) => arr2.includes(v));
};
