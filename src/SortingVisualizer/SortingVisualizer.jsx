import React from "react";
import { mergeSortAnimations } from "../SortingAlgorithms/MergeSort.js";
import { getBubbleSort } from "../SortingAlgorithms/BubbleSort.js";
import * as shit from "../SortingAlgorithms/MergeSort.js";
import "./SortingVisualizer.css";

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
    this.shuffle(array);

    this.setState({ array });
  }

  reverseArray() {
    const array = [];
    let i = 420;
    let x = 845;
    while (i >= 0) {
      array.push(x);
      i--;
      x -= 2;
    }
    this.setState({ array });
  }

  shuffle(array) {
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

  insertionSort() {
    const javaScriptSortedArray = this.state.array
      .slice()
      .sort((a, b) => a - b);
    const sortedArray = shit.insertionSort(this.state.array);

    console.log(arraysAreEqual(javaScriptSortedArray, sortedArray));
  }

  gnomeSort() {
    const javaScriptSortedArray = this.state.array
      .slice()
      .sort((a, b) => a - b);
    const sortedArray = shit.gnomeSort(this.state.array);

    console.log(arraysAreEqual(javaScriptSortedArray, sortedArray));
  }

  selectionSort() {
    const javaScriptSortedArray = this.state.array
      .slice()
      .sort((a, b) => a - b);
    const sortedArray = shit.selectionSort(this.state.array);

    console.log(arraysAreEqual(javaScriptSortedArray, sortedArray));
  }

  bubbleSort() {
    const animations = getBubbleSort(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array_bar");
      const isColorChange = i % 4 === 0 || i % 4 === 1;
      if (isColorChange) {
        const color = i % 4 === 0 ? "red" : "royalblue";
        let [bar1Indx, bar2Indx] = animations[i];
        if (bar2Indx > 420) {
          bar2Indx = 420;
        }
        const bar1Style = arrayBars[bar1Indx].style;
        const bar2Style = arrayBars[bar2Indx].style;
        setTimeout(() => {
          bar1Style.backgroundColor = color;
          bar2Style.backgroundColor = color;
        }, 1);
      } else {
        const [bar1Indx, newHeight] = animations[i];
        if (bar1Indx === -1) {
          continue;
        }
        setTimeout(() => {
          const barStyle = arrayBars[bar1Indx].style;
          barStyle.height = `${newHeight}px`;
        }, 1);
      }
    }
  }

  mergeSort() {
    const animations = mergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array_bar");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIndx, barTwoIndx] = animations[i];
        const barOneStyle = arrayBars[barOneIndx].style;
        const barTwoStyle = arrayBars[barTwoIndx].style;
        const color = i % 3 === 0 ? "red" : "royalblue";
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * 3);
      } else {
        setTimeout(() => {
          const [barOneIndx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIndx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * 3);
      }
    }
  }

  quickSort() {}

  timSort() {}

  testSortingAlgorithms() {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const legnth = randomIntFromInterval(1, 1000);
      for (let i = 0; i < legnth; i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const gnomeSortedArray = shit.gnomeSort(array.slice());
      const insertionSortedArray = shit.insertionSort(array.slice());
      const selectionSortedArray = shit.selectionSort(array.slice());
      console.log(arraysAreEqual(javaScriptSortedArray, gnomeSortedArray));
      console.log(arraysAreEqual(javaScriptSortedArray, insertionSortedArray));
      console.log(arraysAreEqual(javaScriptSortedArray, selectionSortedArray));
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
