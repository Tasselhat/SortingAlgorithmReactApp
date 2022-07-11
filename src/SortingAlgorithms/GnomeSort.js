export function getGnomeSort(array) {
    let animations = [];
    let auxiliaryArray = array.slice();
    gnomeSort(auxiliaryArray, animations);
    return animations;
  }

function gnomeSort (auxiliaryArray, animations) {
  // Avg runtime O(n^2), performs better on partially sorted arrays, generally pretty bad
  let length = auxiliaryArray.length;

  let index = 0;

  while (index < length) {
    // Scan through the entire array
    if (index === 0) {
      // If you are at the end move up
      index++;
    }
    animations.push([index,index-1]); //Comparison, change colors
    animations.push([index,index-1]); //Comparison, revert colors
    if (auxiliaryArray[index] >= auxiliaryArray[index - 1]) {
      // If you are not at the end and the current element is greater than the previous one move up
      index++;
    } else {
      // If you are not at the end and the current element is less than the previous element 
      // swap them and move down to compare again
      animations.push([index, auxiliaryArray[index-1],-1]); //animate swap
      animations.push([index-1, auxiliaryArray[index],-1]); //animate swap
      let temp = 0;
      temp = auxiliaryArray[index];
      auxiliaryArray[index] = auxiliaryArray[index - 1];
      auxiliaryArray[index - 1] = temp;
      index--;
    }
  }
};