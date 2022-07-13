export function getBubbleSort(array) {
  let animations = [];
  let auxiliaryArray = array.slice();
  bubbleSort(auxiliaryArray, animations);
  return animations;
}

function bubbleSort(auxiliaryArray, animations) {
  // Avg runtime O(n^2), already sorted array is O(n) which is good
  const length = auxiliaryArray.length;
  let swapped = false;

  for (let i = 0; i < length; i++) {
    // Start iterative loop that runs n times
    // Set boolean to check if the array is already sorted
    swapped = false;
    for (let j = 0; j < length; j++) {
      // Second iteration to compare each element of the array
      // and swap the smaller one to the left, or do nothing if the smaller is already left
      animations.push([j, j + 1]); //Compare, change color
      animations.push([j, j + 1]); //Compare, revert color

      if (auxiliaryArray[j] > auxiliaryArray[j + 1]) {
        animations.push([j, auxiliaryArray[j + 1], -1]); //Animate swap
        animations.push([j + 1, auxiliaryArray[j], -1]); //Animate swap

        let temp = auxiliaryArray[j];
        auxiliaryArray[j] = auxiliaryArray[j + 1];
        auxiliaryArray[j + 1] = temp;
        swapped = true; // If a swap is made continue the loop
      }
    }

    if (!swapped) {
      //Once no elements are swapped or the main loop runs n number of times break
      return;
    }
  }
}
