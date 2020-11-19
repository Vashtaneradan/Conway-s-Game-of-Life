let cells = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

let nextGen = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

let generation = 1;
let interval;

colorizeAliveCells(cells);

function ticker() {
  interval = setInterval(runLivecycle, 800);
}

function stopTicker() {
  clearInterval(interval);
  // generation = 1;
  // document.querySelector(".ticker__generation").innerHTML = generation.toString();
}

function runLivecycle() {
  clearAll(nextGen);
  document.querySelector(".ticker__generation").innerHTML = generation.toString();
  generation++;

  for (let col = 0; col < cells.length; col++) {
    for (let row = 0; row < cells[col].length; row++) {
      let neighbourCount = findNeighbours(col, row);

      if (cells[col][row] === 0) {
        if (neighbourCount === 3) {
          nextGen[col][row] = 1;
        }
      } else {
        if (neighbourCount < 2 || neighbourCount > 3) {
          nextGen[col][row] = 0;
        } else if (neighbourCount === 2 || neighbourCount === 3) {
          nextGen[col][row] = 1;
        }
      }

    }
  }
  colorizeAliveCells(nextGen);
  cells = JSON.parse(JSON.stringify(nextGen));
}

// 012
// 3x4
// 567
function findNeighbours(col, row) {
  let neighbourCount = 0;
  //0
  if (col !== 0 && row !== 0 && cells[col - 1][row - 1] === 1) {
    neighbourCount++;
  }
  //1
  if (col !== 0 && cells[col - 1][row] === 1) {
    neighbourCount++;
  }
  //2
  if (col !== 0 && row !== cells.length - 1 && cells[col - 1][row + 1] === 1) {
    neighbourCount++;
  }
  //3
  if (row !== 0 && cells[col][row - 1] === 1) {
    neighbourCount++;
  }
  //4
  if (row !== cells.length - 1 && cells[col][row + 1] === 1) {
    neighbourCount++;
  }
  //5
  if (col !== cells.length - 1 && row !== 0 && cells[col + 1][row - 1] === 1) {
    neighbourCount++;
  }
  //6
  if (col !== cells.length - 1 && cells[col + 1][row] === 1) {
    neighbourCount++;
  }
  //7
  if (col !== cells.length - 1 && row !== cells.length - 1 && cells[col + 1][row + 1] === 1) {
    neighbourCount++;
  }
  return neighbourCount;
}

function colorizeAliveCells(cellArray) {
  for (let col = 0; col < cellArray.length; col++) {
    for (let row = 0; row < cellArray[col].length; row++) {
      if (cellArray[col][row] === 1) {
        document.querySelector(`.cell--${col}${row}`).style["background-color"] = "orange";
      } else {
        document.querySelector(`.cell--${col}${row}`).style["background-color"] = "grey";
      }
    }
  }
}

function clearAll(cellArray){
  cellArray = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  colorizeAliveCells(cellArray);
}

// user cell input
for (let col = 0; col < cells.length; col++) {
  for (let row = 0; row < cells[col].length; row++) {
      document.querySelector(`.cell--${col}${row}`).addEventListener('click', () => {
        document.querySelector(`.cell--${col}${row}`).style["background-color"] = "orange";
        cells[col][row] = 1;
    })
  }
}
