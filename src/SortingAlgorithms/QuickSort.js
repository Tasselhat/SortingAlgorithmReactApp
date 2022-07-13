let animations = [];

export function getQuickSort(array) {
  animations = [];
  let auxiliaryArray = array.slice();
  quickSort(auxiliaryArray, 0, auxiliaryArray.length - 1);
  return animations;
}

function quickSort(array, startIndx, endIndx) {
  // Base case or terminating case
  if (startIndx >= endIndx) {
    return;
  }

  // Returns pivotIndex
  let index = partition(array, startIndx, endIndx, animations);

  // Recursively apply the same logic to the left and right subarrays
  quickSort(array, startIndx, index - 1);
  quickSort(array, index + 1, endIndx);
}

function partition(array, startIndx, endIndx, animations) {
  // Taking the last element as the pivot
  const pivotValue = array[endIndx];
  let pivotIndex = startIndx;
  for (let i = startIndx; i < endIndx; i++) {
    animations.push([i, endIndx]); //Compare, change color
    animations.push([i, endIndx]); //Compare, revert color
    if (array[i] < pivotValue) {
      // Swapping elements
      animations.push([i, array[pivotIndex], -1]); //Animate swap
      animations.push([pivotIndex, array[i], -1]); //Animate swap
      let temp = array[i];
      array[i] = array[pivotIndex];
      array[pivotIndex] = temp;
      // Moving to next element
      pivotIndex++;
    }
  }

  // Putting the pivot value in the middle
  animations.push([endIndx, array[pivotIndex], -1]); //Animate swap
  animations.push([pivotIndex, array[endIndx], -1]); //Animate swap
  let temp = array[endIndx];
  array[endIndx] = array[pivotIndex];
  array[pivotIndex] = temp;
  return pivotIndex;
}
