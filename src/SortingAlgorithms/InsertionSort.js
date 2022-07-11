export function getInsertionSort(array) {
  let animations = [];
  let auxiliaryArray = array.slice();
  insertionSort(auxiliaryArray, animations);
  return animations;
}

function insertionSort(auxiliaryArray, animations) {
  // Avg runtime O(n^2), fast for checking if an array is sorted,
  // or if sample size is small, best quadratic sorting alg in most cases

  let length = auxiliaryArray.length;

  for (let i = 1; i < length; i++) {
    // Main loop for each element in array,
    // Atarts at 1 so theres space for the first element in the "sorted" pile/array
    let current = auxiliaryArray[i]; // Current element of main loop

    let j = i - 1; // Compare to previous element of our array

    while (i > -1 && current < auxiliaryArray[j]) {
      animations.push([i, j]); //Compare, change color
      animations.push([i, j]); //Compare, revert color
      // If current element is both in the array and less than previous element
      // Push larger element right
      auxiliaryArray[j + 1] = auxiliaryArray[j];
      animations.push([j + 1, auxiliaryArray[j], -1]); //Animate swap
      // Move to the previous element in the array
      j--;
    }
    // Place the current element one step lower in the array
    auxiliaryArray[j + 1] = current;
    animations.push([j + 1, current, -1]); //Animate swap
  }
}
