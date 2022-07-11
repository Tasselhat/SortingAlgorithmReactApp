export function getSelectionSort(array) {
    let animations = [];
    let auxiliaryArray = array.slice();
    selectionSort(auxiliaryArray, animations);
    return animations;
  }



function selectionSort (auxiliaryArray, animations) {
    //avg runtime O(n^2), best case also O(n^2), slightly better than bubble and gnome
    let length = auxiliaryArray.length;
  
    for (let i = 0; i < length; i++) {
      // Set min to element in position i for current iteration of the main loop
      let min = i; 
      
      // Start second iteration comparing each element to the current minimum starting with i (current iteration of the main loop)
      for (let j = i + 1; j < length; j++) {
        animations.push([i, j]); //Compare, change color
        animations.push([i, j, -1]); //Compare, revert color
        if (auxiliaryArray[j] < auxiliaryArray[min]) {
          // If an element after element i is less than the currently recorded min, set that position of the array as current min
          min = j;
        }
      }
      
      if (min !== i) { // If there is a new minimum
        animations.push([i, auxiliaryArray[min], -1, -1]); //animate swap
        animations.push([min, auxiliaryArray[i], -1, -1]); //animate swap
        let temp = auxiliaryArray[i]; // Swap position of current min element with last element of the sorted array
        auxiliaryArray[i] = auxiliaryArray[min];
        auxiliaryArray[min] = temp;
      }
    }
  };
  