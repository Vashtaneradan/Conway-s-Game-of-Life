const row = 10;
const col = 10;

let cells = JSON.parse(JSON.stringify(Array(col).fill(Array(row).fill(0))));
let nextGen = JSON.parse(JSON.stringify(Array(col).fill(Array(row).fill(0))));

let generation = 0;
let interval;
const container = document.querySelector('.grid-container');

function makeRows(rows, cols) {
  container.style.setProperty('--grid-rows', rows);
  container.style.setProperty('--grid-cols', cols);
  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows; row++) {
      let cell = document.createElement("div");
      cell.className = `cell cell--${col}${row}`;
      container.appendChild(cell);
    }
  }
  colorizeCells(cells);
}
makeRows(row, col);

// user cell input
for (let cols = 0; cols < col; cols++) {
  for (let rows = 0; rows < row; rows++) {
    document.querySelector(`.cell--${cols}${rows}`).addEventListener('click', () => {
      document.querySelector(`.cell--${cols}${rows}`).style["background-color"] = "mediumseagreen";
      cells[cols][rows] = 1;
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
  console.table(cells);
  clearAll(nextGen);
  document.querySelector(".ticker__generation").innerHTML = generation.toString();
  generation++;

  console.table(cells);

  for (let cols = 0; cols < col; cols++) {
    for (let rows = 0; rows < row; rows++) {
      let neighbourCount = findNeighbours(cols, rows);

      if (cells[cols][rows] === 0) {
        if (neighbourCount === 3) {
          nextGen[cols][rows] = 1;
        }
      } else {
        if (neighbourCount < 2 || neighbourCount > 3) {
          nextGen[cols][rows] = 0;
        } else if (neighbourCount === 2 || neighbourCount === 3) {
          nextGen[cols][rows] = 1;
        }
      }

    }
  }
  console.log(nextGen);
  colorizeCells(nextGen);
  cells = JSON.parse(JSON.stringify(nextGen));
}

// 012
// 3x4
// 567
function findNeighbours(cols, rows) {
  let neighbourCount = 0;
  //0
  if (cols !== 0 && rows !== 0 && cells[cols - 1][rows - 1] === 1) {
    neighbourCount++;
  }
  //1
  if (cols !== 0 && cells[cols - 1][rows] === 1) {
    neighbourCount++;
  }
  //2
  if (cols !== 0 && rows !== row - 1 && cells[cols - 1][rows + 1] === 1) {
    neighbourCount++;
  }
  //3
  if (rows !== 0 && cells[cols][rows - 1] === 1) {
    neighbourCount++;
  }
  //4
  if (rows !== row - 1 && cells[cols][rows + 1] === 1) {
    neighbourCount++;
  }
  //5
  if (cols !== col - 1 && rows !== 0 && cells[cols + 1][rows - 1] === 1) {
    neighbourCount++;
  }
  //6
  if (cols !== col - 1 && cells[cols + 1][rows] === 1) {
    neighbourCount++;
  }
  //7
  if (cols !== col - 1 && rows !== row - 1 && cells[cols + 1][rows + 1] === 1) {
    neighbourCount++;
  }
  return neighbourCount;
}

function colorizeCells(cellArray) {
  for (let cols = 0; cols < col; cols++) {
    for (let rows = 0; rows < row; rows++) {
      if (cellArray[cols][rows] === 1) {
        document.querySelector(`.cell--${cols}${rows}`).style["background-color"] = "mediumseagreen";
      } else {
        document.querySelector(`.cell--${cols}${rows}`).style["background-color"] = "grey";
      }
    }
  }
}

function clearAll(cellArray) {
  cellArray = Array(col).fill(Array(row).fill(0));
  colorizeCells(cellArray);
}


function clearGame() {
  clearAll(cells);
  clearAll(nextGen);
  generation = 0;
  document.querySelector(".ticker__generation").innerHTML = generation.toString();
}
