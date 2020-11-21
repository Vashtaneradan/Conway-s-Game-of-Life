let xAxis = 20;
let yAxis = 20;
let cells = JSON.parse(JSON.stringify(Array(yAxis).fill(Array(xAxis).fill(0))));
let nextGen = JSON.parse(JSON.stringify(Array(yAxis).fill(Array(xAxis).fill(0))));

let generation = 0;
let interval;
const container = document.querySelector('.grid-container');

function setGrid() {
  for (let rowCounter = 0; rowCounter < yAxis; rowCounter++) {
    for (let columnCounter = 0; columnCounter < xAxis; columnCounter++) {
      let cell = document.querySelector(`.cell--${rowCounter}-${columnCounter}`);
      cell.remove();
    }
  }
  xAxis = parseInt(document.querySelector('#quantityX').value);
  yAxis = parseInt(document.querySelector('#quantityY').value);

  cells = JSON.parse(JSON.stringify(Array(yAxis).fill(Array(xAxis).fill(0))));
  nextGen = JSON.parse(JSON.stringify(Array(yAxis).fill(Array(xAxis).fill(0))));
  makeRows(yAxis, xAxis);
}

function makeRows(y, x) {
  container.style.setProperty('--grid-rows', y);
  container.style.setProperty('--grid-cols', x);
  for (let rowCounter = 0; rowCounter < y; rowCounter++) {
    for (let columnCounter = 0; columnCounter < x; columnCounter++) {
      let cell = document.createElement("div");
      cell.className = `cell cell--${rowCounter}-${columnCounter}`;
      container.appendChild(cell);
    }
  }
  colorizeCells(cells);
}
makeRows(yAxis, xAxis);

// user cell input
for (let rowCounter = 0; rowCounter < yAxis; rowCounter++) {
  for (let columnCounter = 0; columnCounter < xAxis; columnCounter++) {
    document.querySelector(`.cell--${rowCounter}-${columnCounter}`).addEventListener('click', () => {
      document.querySelector(`.cell--${rowCounter}-${columnCounter}`).style["background-color"] = "mediumseagreen";
      cells[rowCounter][columnCounter] = 1;
    })
  }
}

function ticker() {
  interval = setInterval(runLivecycle, 800);
}

function stopTicker() {
  clearInterval(interval);
}

function runLivecycle() {
  clearArray(nextGen);
  generation++;
  document.querySelector(".ticker__generation").innerHTML = generation.toString();

  for (let rowCounter = 0; rowCounter < yAxis; rowCounter++) {
    for (let columnCounter = 0; columnCounter < xAxis; columnCounter++) {
      let neighbourCount = findNeighbours(rowCounter, columnCounter);

      if (cells[rowCounter][columnCounter] === 0) {
        if (neighbourCount === 3) {
          nextGen[rowCounter][columnCounter] = 1;
        }
      } else {
        if (neighbourCount < 2 || neighbourCount > 3) {
          nextGen[rowCounter][columnCounter] = 0;
        } else if (neighbourCount === 2 || neighbourCount === 3) {
          nextGen[rowCounter][columnCounter] = 1;
        }
      }

    }
  }
  colorizeCells(nextGen);
  cells = JSON.parse(JSON.stringify(nextGen));
}

// 012
// 3x4
// 567
function findNeighbours(currentRow, currentColumn) {
  let neighbourCount = 0;
  //0
  if (currentRow !== 0 && currentColumn !== 0 && cells[currentRow - 1][currentColumn - 1] === 1) {

    neighbourCount++;
  }
  //1
  if (currentRow !== 0 && cells[currentRow - 1][currentColumn] === 1) {
    neighbourCount++;
  }
  //2
  if (currentRow !== 0 && currentColumn !== xAxis - 1 && cells[currentRow - 1][currentColumn + 1] === 1) {
    neighbourCount++;
  }
  //3
  if (currentColumn !== 0 && cells[currentRow][currentColumn - 1] === 1) {
    neighbourCount++;
  }
  //4
  if (currentColumn !== xAxis - 1 && cells[currentRow][currentColumn + 1] === 1) {
    neighbourCount++;
  }
  //5
  if (currentRow !== yAxis - 1 && currentColumn !== 0 && cells[currentRow + 1][currentColumn - 1] === 1) {
    neighbourCount++;
  }
  //6
  if (currentRow !== yAxis - 1 && cells[currentRow + 1][currentColumn] === 1) {
    neighbourCount++;
  }
  //7
  if (currentRow !== yAxis - 1 && currentColumn !== xAxis - 1 && cells[currentRow + 1][currentColumn + 1] === 1) {
    neighbourCount++;
  }
  return neighbourCount;
}

function colorizeCells(cellArray) {
  for (let rowCounter = 0; rowCounter < yAxis; rowCounter++) {
    for (let columnCounter = 0; columnCounter < xAxis; columnCounter++) {
      if (cellArray[rowCounter][columnCounter] === 1) {
        document.querySelector(`.cell--${rowCounter}-${columnCounter}`).style["background-color"] = "mediumseagreen";
      } else {
        document.querySelector(`.cell--${rowCounter}-${columnCounter}`).style["background-color"] = "grey";
      }
    }
  }
}

function clearArray(cellArray) {
  cellArray = JSON.parse(JSON.stringify(Array(yAxis).fill(Array(xAxis).fill(0))));
  colorizeCells(cellArray);
}

function clearGame() {
  stopTicker();
  clearArray(cells);
  clearArray(nextGen);
  generation = 0;
  document.querySelector(".ticker__generation").innerHTML = generation.toString();
}
