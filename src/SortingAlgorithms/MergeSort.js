export let getMergeSort = (array) => {
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
    animations.push([i, j]); //Compare, change color
    animations.push([i, j]); //Compare, revert color
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // Overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // Overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIndx) {
    animations.push([i, i]); //Compare, change color
    animations.push([i, i]); //Compare, revert color
    // Overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIndx) {
    animations.push([j, j]); //Compare, change color
    animations.push([j, j]); //Compare, revert color
    // Overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}
