import React from "react";
import ReactSlider from "react-slider";
import { getBubbleSort } from "../SortingAlgorithms/BubbleSort.js";
import { getGnomeSort } from "../SortingAlgorithms/GnomeSort.js";
import { getInsertionSort } from "../SortingAlgorithms/InsertionSort.js";
import { getMergeSort } from "../SortingAlgorithms/MergeSort.js";
import { getQuickSort } from "../SortingAlgorithms/QuickSort.js";
import { getSelectionSort } from "../SortingAlgorithms/SelectionSort";
import "./SortingVisualizer.css";
import "../index.css"

const arraySizeMediaQ1 = window.matchMedia("(min-width: 551px) and (max-width: 1000px)");
const arraySizeMediaQ2 = window.matchMedia("(min-width: 1001px) and (max-width: 1600px)");
const arraySizeMediaQ3 = window.matchMedia("(min-width: 1601px) and (max-width: 2559px)");
const arraySizeMediaQ4 = window.matchMedia("(min-width: 2560px) and (max-width: 2959px)");
const arraySizeMediaQ5 = window.matchMedia("(min-width: 2960px)");
const SPEED = 2;
const SLOW_ALG_ANIMATION_SPEED_MS = 0.05 * SPEED;
const FAST_ALG_ANIMATION_SPEED_MS = 1 * SPEED;
let ARRAY_SIZE = 100;
if(arraySizeMediaQ1.matches) {
  ARRAY_SIZE = 150;
} else if (arraySizeMediaQ2.matches) {
  ARRAY_SIZE = 200;
} else if (arraySizeMediaQ3.matches) {
  ARRAY_SIZE = 350;
} else if (arraySizeMediaQ4.matches) {
  ARRAY_SIZE = 550;
} else if (arraySizeMediaQ5.matches) {
  ARRAY_SIZE = 800;
}
const DEFAULT_COLOR = "royalblue";
const SECONDARY_COLOR = "red";

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    let i = 0;
    while (i <= ARRAY_SIZE) {
      array.push(randomIntFromInterval(6, 800));
      i++;
    }

    this.setState({ array });
    this.forceUpdate();
  }

  linearArray() {
    const array = [];
    let i = 0;
    let x = 5;
    while (i <= ARRAY_SIZE) {
      array.push(x);
      i++;
      if(arraySizeMediaQ1.matches) {
        x += 5;
      } else if (arraySizeMediaQ2.matches) {
        x += 4;
      } else if (arraySizeMediaQ3.matches) {
        x += 2;
      } else if (arraySizeMediaQ4.matches) {
        x += 2;
      } else if (arraySizeMediaQ5.matches) {
        x += 2;
      } else {
        x += 6;
      }
    }
    shuffle(array);

    this.setState({ array });
    this.forceUpdate();
  }

  reversedArray() {
    const array = [];
    let i = 0;
    let startBarHeight = 800;
    while (i <= ARRAY_SIZE) {
      array.push(startBarHeight);
      i++;
      if(arraySizeMediaQ1.matches) {
        startBarHeight -= 5;
      } else if (arraySizeMediaQ2.matches) {
        startBarHeight -= 4;
      } else if (arraySizeMediaQ3.matches) {
        startBarHeight -= 2;
      } else if (arraySizeMediaQ4.matches) {
        startBarHeight -= 1;
      } else if (arraySizeMediaQ5.matches) {
        startBarHeight -= 1;
      } else {
        startBarHeight -= 8;
      }
    }

    this.setState({ array });
    this.forceUpdate();
  }

  selectionSort() {
    const animations = getSelectionSort(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array_bar");
      const isColorChange = animations[i].length < 4;
      if (isColorChange) {
        let color = SECONDARY_COLOR;
        if (i >= 1) {
          if (animations[i].length === 3 && animations[i - 1].length === 2) {
            color = DEFAULT_COLOR;
          }
        }
        const [bar1Indx, bar2Indx] = animations[i];
        const bar1Style = arrayBars[bar1Indx].style;
        const bar2Style = arrayBars[bar2Indx].style;
        setTimeout(() => {
          bar1Style.backgroundColor = color;
          bar2Style.backgroundColor = color;
        }, i * SLOW_ALG_ANIMATION_SPEED_MS);
      } else if (animations[i].length === 4) {
        const [bar1Indx, newHeight] = animations[i];
        if (bar1Indx === -1) {
          continue;
        }
        setTimeout(() => {
          const barStyle = arrayBars[bar1Indx].style;
          barStyle.height = `${newHeight}px`;
        }, i * SLOW_ALG_ANIMATION_SPEED_MS);
      }
    }
  }

  gnomeSort() {
    const animations = getGnomeSort(this.state.array);
    animateSlow(animations);
  }

  insertionSort() {
    const animations = getInsertionSort(this.state.array);
    animateSlow(animations);
  }

  bubbleSort() {
    const animations = getBubbleSort(this.state.array);
    animateSlow(animations);
  }

  mergeSort() {
    const animations = getMergeSort(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array_bar");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIndx, barTwoIndx] = animations[i];
        const barOneStyle = arrayBars[barOneIndx].style;
        const barTwoStyle = arrayBars[barTwoIndx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : DEFAULT_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * FAST_ALG_ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIndx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIndx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * FAST_ALG_ANIMATION_SPEED_MS);
      }
    }
  }

  quickSort() {
    const animations = getQuickSort(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array_bar");
      const isColorChange = animations[i].length === 2;
      if (isColorChange) {
        let color = SECONDARY_COLOR;
        if (i >= 1) {
          if (animations[i].length === 2 && animations[i - 1].length === 2) {
            color = DEFAULT_COLOR;
          }
        }
        const [bar1Indx, bar2Indx] = animations[i];
        const bar1Style = arrayBars[bar1Indx].style;
        const bar2Style = arrayBars[bar2Indx].style;
        setTimeout(() => {
          bar1Style.backgroundColor = color;
          bar2Style.backgroundColor = color;
        }, i * FAST_ALG_ANIMATION_SPEED_MS);
      } else if (animations[i].length === 3) {
        const [bar1Indx, newHeight] = animations[i];
        if (bar1Indx === -1) {
          continue;
        }
        setTimeout(() => {
          const barStyle = arrayBars[bar1Indx].style;
          barStyle.height = `${newHeight}px`;
        }, i * FAST_ALG_ANIMATION_SPEED_MS);
      }
    }
  }

  render() {
    const { array } = this.state;

    return (
      <div className="container">
        <div className="array_container">
          {array.map((value, idx) => (
            <div
              className="array_bar"
              key={idx}
              style={{ height: `${value}px` }}
              ></div>
              ))}
        </div>
        <div className="control_container">
        <ReactSlider
         className="speedSlider"
         trackClassName="speedSlider_track"
         thumbClassName="speedSlider_thumb"
        />
        <button onClick={() => this.resetArray()}>
          Generate New Random Array
        </button>
        <button onClick={() => this.linearArray()}>
          Generate New Random Linear Array
        </button>
        <button onClick={() => this.reversedArray()}>
          Generate New Reversed Array
        </button>
        <button onClick={() => this.bubbleSort()}> Bubble sort </button>
        <button onClick={() => this.insertionSort()}> Insertion Sort </button>
        <button onClick={() => this.gnomeSort()}> Gnome Sort </button>
        <button onClick={() => this.selectionSort()}> Selection Sort </button>
        <button onClick={() => this.mergeSort()}> Merge Sort </button>
        <button onClick={() => this.quickSort()}> Quick Sort </button>
         </div>
      </div>
    );
  }
}

function animateSlow (animations) {
  for (let i = 0; i < animations.length; i++) {
    const arrayBars = document.getElementsByClassName("array_bar");
    const isColorChange = animations[i].length === 2;
    if (isColorChange) {
      let color = SECONDARY_COLOR;
      if (i >= 1) {
        if (animations[i].length === 2 && animations[i - 1].length === 2) {
          color = DEFAULT_COLOR;
        }
      }
      const [bar1Indx, bar2Indx] = animations[i];
      if (bar2Indx > ARRAY_SIZE) { //This is for bubble sort, returns an animation bar2Indx value outside the array index due to comparing i to i+1 in it's iterations.
        continue;
      }
      const bar1Style = arrayBars[bar1Indx].style;
      const bar2Style = arrayBars[bar2Indx].style;
      setTimeout(() => {
        bar1Style.backgroundColor = color;
        bar2Style.backgroundColor = color;
      }, i * SLOW_ALG_ANIMATION_SPEED_MS);
    } else if (animations[i].length === 3) {
      const [bar1Indx, newHeight] = animations[i];
      if (bar1Indx === -1) {
        continue;
      }
      setTimeout(() => {
        const barStyle = arrayBars[bar1Indx].style;
        barStyle.height = `${newHeight}px`;
      }, i * SLOW_ALG_ANIMATION_SPEED_MS);
    }
  }
}


function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(array1, array2) {
  if (array1.length !== array2.length) return false;
  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) return false;
  }
  return true;
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

