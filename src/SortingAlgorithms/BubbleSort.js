export function getBubbleSort(array) {
    let animations = [];
    let auxiliaryArray = array.slice();
    bubbleSort(auxiliaryArray, animations);
    array = auxiliaryArray;
    return animations;
}

function bubbleSort(auxiliaryArray, animations) {
    //avg runtime O(n^2), already sorted array is O(n) which is good
    const length = auxiliaryArray.length;
    let swapped = false;
    for (let i = 0; i < length; i++) {
      //start iterative loop that runs n times
      swapped = false; //set boolean to check if the array is already sorted
      for (let j = 0; j < length; j++) { // second iteration to compare each element of the array and swap the smaller one to the left, or do nothing if the smaller is already left
        animations.push([j,j+1]);
        animations.push([j,j+1]);
        if (auxiliaryArray[j] > auxiliaryArray[j + 1]) {
          animations.push([j,auxiliaryArray[j+1]]);
          animations.push([(j+1),auxiliaryArray[j]]);
          let temp = auxiliaryArray[j];
          auxiliaryArray[j] = auxiliaryArray[j+1];
          auxiliaryArray[j+1] = temp;
          swapped = true; //if a swap is made continue the loop
        } else {
            animations.push([-1,-1]);
            animations.push([-1,-1]);
        }
      }
  
      if (!swapped) {
        //once no elements are swapper or the main loop runs n number of times break
        return;
      }
    }
  }