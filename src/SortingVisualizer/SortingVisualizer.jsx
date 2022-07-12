import React from "react";
import { getMergeSort } from "../SortingAlgorithms/MergeSort.js";
import { getBubbleSort } from "../SortingAlgorithms/BubbleSort.js";
import { getInsertionSort } from "../SortingAlgorithms/InsertionSort.js";
import { getGnomeSort } from "../SortingAlgorithms/GnomeSort.js";
import { getSelectionSort } from "../SortingAlgorithms/SelectionSort";
import { getQuickSort } from "../SortingAlgorithms/QuickSort.js";
import "./SortingVisualizer.css";

const speed = 1;
const SLOW_ALG_ANIMATION_SPEED_MS = 0.05 * speed;
const FAST_ALG_ANIMATION_SPEED_MS = 2 * speed;
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
    while (i <= 420) {
      array.push(randomIntFromInterval(6, 800));
      i++;
    }
    this.setState({ array });
  }

  linearArray() {
    const array = [];
    let i = 0;
    let x = 5;
    while (i <= 420) {
      array.push(x);
      i++;
      x += 2;
    }
    shuffle(array);

    this.setState({ array });
  }

  reverseArray() {
    const array = [];
    let i = 0;
    let x = 845;
    while (i <= 420) {
      array.push(x);
      i++;
      x -= 2;
    }
    this.setState({ array });
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

  insertionSort() {
    const animations = getInsertionSort(this.state.array);
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

  bubbleSort() {
    const animations = getBubbleSort(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array_bar");
      const isColorChange = i % 4 === 0 || i % 4 === 1;
      if (isColorChange) {
        const color = i % 4 === 0 ? SECONDARY_COLOR : DEFAULT_COLOR;
        let [bar1Indx, bar2Indx] = animations[i];
        if (bar2Indx > 420) {
          bar2Indx = 420;
        }
        const bar1Style = arrayBars[bar1Indx].style;
        const bar2Style = arrayBars[bar2Indx].style;
        setTimeout(() => {
          bar1Style.backgroundColor = color;
          bar2Style.backgroundColor = color;
        }, i * SLOW_ALG_ANIMATION_SPEED_MS);
      } else {
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

  timSort() {}

  testSortingAlgorithms() {
    for (let i = 0; i < 10; i++) {
      const array = [];
      const legnth = randomIntFromInterval(1, 100);
      for (let i = 0; i < legnth; i++) {
        array.push(randomIntFromInterval(-1000, 1000));
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
        <button onClick={() => this.resetArray()}>
          Generate New Random Array
        </button>
        <button onClick={() => this.linearArray()}>
          Generate New Linear Array
        </button>
        <button onClick={() => this.reverseArray()}>
          Generate New Reversed Array
        </button>
        <button onClick={() => this.bubbleSort()}> Bubble sort </button>
        <button onClick={() => this.insertionSort()}> Insertion Sort </button>
        <button onClick={() => this.gnomeSort()}> Gnome Sort </button>
        <button onClick={() => this.selectionSort()}> Selection Sort </button>
        <button onClick={() => this.mergeSort()}> Merge Sort </button>
        <button onClick={() => this.quickSort()}> Quick Sort </button>
        <button onClick={() => this.timSort()}> Tim Sort </button>
        <button onClick={() => this.testSortingAlgorithms()}>
          Test Sorting Algorithms
        </button>
      </div>
    );
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
