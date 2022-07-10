export const selectionSort = (array) => {
  //avg runtime O(n^2), best case also O(n^2), slightly better than bubble and gnome

  let length = array.length;

  for (let i = 0; i < length; i++) {
    let min = i; //set min to element in position i for current iteration of the main loop
    for (let j = i + 1; j < length; j++) {
      //start second iteration comparing each element to the current minimum starting with i (current iteration of the main loop)
      if (array[j] < array[min]) {
        //if an element after element i is less than the currently recorded min, set that position of the array as current min
        min = j;
      }
    }
    if (min !== i) {
      //if first element is already the minimum don't swap
      let temp = array[i]; //else swap position of current min element with first element of current iteration
      array[i] = array[min];
      array[min] = temp;
    }
  }
  return array;
};

export const insertionSort = (array) => {
  //avg runtime O(n^2), fast for checking if an array is sorted, or if sample size is small, best quadratic sorting alg in most cases

  let length = array.length;

  for (let i = 1; i < length; i++) {
    //main loop for each element in array, starts at 1 so first element is already in the "sorted" array

    let current = array[i]; //current element of main loop

    let j = i - 1; //compare to previous element of our array

    while (i > -1 && current < array[j]) {
      //if current element is both in the array and less than previous element
      array[j + 1] = array[j]; //push larger element right
      j--; //move to the previous element in the array
    }
    array[j + 1] = current; //place the current element one step lower in the array
  }
  return array;
};

export const gnomeSort = (array) => {
  //avg runtime O(n^2), performs better on partially sorted arrays, generally pretty bad
  let length = array.length;

  let index = 0;

  while (index < length) {
    //scan through the entire array
    if (index === 0) {
      //if you are at the end move up
      index++;
    }
    if (array[index] >= array[index - 1]) {
      //if you are not at the end and the current element is greater than the previous one move up
      index++;
    } else {
      //if you are not at the end and the current element is less than the previous element swap them and move down to compare again
      let temp = 0;
      temp = array[index];
      array[index] = array[index - 1];
      array[index - 1] = temp;
      index--;
    }
  }
  return array;
};

export let mergeSortAnimations = (array) => {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
};

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMergeSort(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations
  );
}

function doMergeSort(
  mainArray,
  startIndx,
  middleIndx,
  endIndx,
  auxiliaryArray,
  animations
) {
  let k = startIndx;
  let i = startIndx;
  let j = middleIndx + 1;
  while (i <= middleIndx && j <= endIndx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIndx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIndx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}
