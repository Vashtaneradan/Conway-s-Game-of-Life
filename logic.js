let xAxis = 36;
let yAxis = 10;
let cells = JSON.parse(JSON.stringify(Array(yAxis).fill(Array(xAxis).fill(0))));
let nextGen = JSON.parse(JSON.stringify(Array(yAxis).fill(Array(xAxis).fill(0))));
let dead = 0;
let alive = 0;

let generation = 0;
let interval;
const container = document.querySelector('.grid-container');

// Load google charts
google.charts.load('current', {'packages': ['corechart']});
let googleChartLoaded = false;
let historydata;
google.charts.setOnLoadCallback(() => {
  googleChartLoaded = true;
  historydata = new google.visualization.DataTable();
  historydata.addColumn('number', 'Generation');
  historydata.addColumn('number', 'cells alive');
  historydata.addColumn('number', 'cells dead');
});

function setGrid() {
  stopTicker();

  for (let rowCounter = 0; rowCounter < yAxis; rowCounter++) {
    for (let columnCounter = 0; columnCounter < xAxis; columnCounter++) {
      let cell = document.querySelector(`.cell--${rowCounter}-${columnCounter}`);
      cell.remove();
    }
  }
  xAxis = parseInt(document.querySelector('#columnRange').value);
  yAxis = parseInt(document.querySelector('#rowRange').value);

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

  // user cell input
  for (let rowCounter = 0; rowCounter < yAxis; rowCounter++) {
    for (let columnCounter = 0; columnCounter < xAxis; columnCounter++) {
      document.querySelector(`.cell--${rowCounter}-${columnCounter}`).addEventListener('click', () => {
        document.querySelector(`.cell--${rowCounter}-${columnCounter}`).style["background-color"] = "mediumseagreen";
        cells[rowCounter][columnCounter] = cells[rowCounter][columnCounter] ? 0 : 1;
        colorizeCells(cells);
      })
    }
  }
}

makeRows(yAxis, xAxis);

function ticker() {
  interval = setInterval(runLivecycle, 800);
}

function stopTicker() {
  clearInterval(interval);
}

function runLivecycle() {
  nextGen = JSON.parse(JSON.stringify(Array(yAxis).fill(Array(xAxis).fill(0))));
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
        if (neighbourCount === 2 || neighbourCount === 3) {
          nextGen[rowCounter][columnCounter] = 1;
        }
      }

    }
  }
  colorizeCells(nextGen);
  historydata.addRow([generation, alive, dead]);
  drawChart1();
  cells = JSON.parse(JSON.stringify(nextGen));
}

// 012
// 3x4
// 567
function findNeighbours(currentRow, currentColumn) {
  let neighbourCount = 0;
  let borders = document.querySelector('.borders').checked;

  if (!borders) {
    if (currentRow !== 0 && currentColumn !== 0 && cells[currentRow - 1][currentColumn - 1] === 1) {
      neighbourCount++;
    }
    if (currentRow !== 0 && cells[currentRow - 1][currentColumn] === 1) {
      neighbourCount++;
    }
    if (currentRow !== 0 && currentColumn !== xAxis - 1 && cells[currentRow - 1][currentColumn + 1] === 1) {
      neighbourCount++;
    }
    if (currentColumn !== 0 && cells[currentRow][currentColumn - 1] === 1) {
      neighbourCount++;
    }
    if (currentColumn !== xAxis - 1 && cells[currentRow][currentColumn + 1] === 1) {
      neighbourCount++;
    }
    if (currentRow !== yAxis - 1 && currentColumn !== 0 && cells[currentRow + 1][currentColumn - 1] === 1) {
      neighbourCount++;
    }
    if (currentRow !== yAxis - 1 && cells[currentRow + 1][currentColumn] === 1) {
      neighbourCount++;
    }
    if (currentRow !== yAxis - 1 && currentColumn !== xAxis - 1 && cells[currentRow + 1][currentColumn + 1] === 1) {
      neighbourCount++;
    }
  } else {
    //0
    if (currentRow === 0) {
      if (currentColumn === 0) {
        if (cells[yAxis - 1][xAxis - 1] === 1) {
          neighbourCount++;
        }
      } else {
        if (cells[yAxis - 1][currentColumn - 1] === 1) {
          neighbourCount++;
        }
      }
    } else {
      if (currentColumn === 0) {
        if (cells[currentRow - 1][xAxis - 1] === 1) {
          neighbourCount++;
        }
      } else {
        if (cells[currentRow - 1][currentColumn - 1] === 1) {
          neighbourCount++;
        }
      }
    }
    //1
    if (currentRow === 0) {
      if (cells[yAxis - 1][currentColumn] === 1) {
        neighbourCount++;
      }
    } else {
      if (cells[currentRow - 1][currentColumn] === 1) {
        neighbourCount++;
      }
    }
    //2
    if (currentRow === 0) {
      if (currentColumn === xAxis - 1) {
        if (cells[yAxis - 1][0] === 1) {
          neighbourCount++;
        }
      } else {
        if (cells[yAxis - 1][currentColumn + 1] === 1) {
          neighbourCount++;
        }
      }
    } else {
      if (currentColumn === xAxis - 1) {
        if (cells[currentRow - 1][0] === 1) {
          neighbourCount++;
        }
      } else {
        if (cells[currentRow - 1][currentColumn + 1] === 1) {
          neighbourCount++;
        }
      }
    }
    //3
    if (currentColumn === 0) {
      if (cells[currentRow][xAxis - 1] === 1) {
        neighbourCount++;
      }
    } else {
      if (cells[currentRow][currentColumn - 1] === 1) {
        neighbourCount++;
      }
    }
    //4
    if (currentColumn === xAxis - 1) {
      if (cells[currentRow][0] === 1) {
        neighbourCount++;
      }
    } else {
      if (cells[currentRow][currentColumn + 1] === 1) {
        neighbourCount++;
      }
    }
    //5
    if (currentRow === yAxis - 1) {
      if (currentColumn === 0) {
        if (cells[0][xAxis - 1] === 1) {
          neighbourCount++;
        }
      } else {
        if (cells[0][currentColumn - 1] === 1) {
          neighbourCount++;
        }
      }
    } else {
      if (currentColumn === 0) {
        if (cells[currentRow + 1][xAxis - 1] === 1) {
          neighbourCount++;
        }
      } else {
        if (cells[currentRow + 1][currentColumn - 1] === 1) {
          neighbourCount++;
        }
      }
    }
    //6
    if (currentRow === yAxis - 1) {
      if (cells[0][currentColumn] === 1) {
        neighbourCount++;
      }
    } else {
      if (cells[currentRow + 1][currentColumn] === 1) {
        neighbourCount++;
      }
    }
    //7
    if (currentRow === yAxis - 1) {
      if (currentColumn === xAxis - 1) {
        if (cells[0][0] === 1) {
          neighbourCount++;
        }
      } else {
        if (cells[0][currentColumn + 1] === 1) {
          neighbourCount++;
        }
      }
    } else {
      if (currentColumn === xAxis - 1) {
        if (cells[currentRow + 1][0] === 1) {
          neighbourCount++;
        }
      } else {
        if (cells[currentRow + 1][currentColumn + 1] === 1) {
          neighbourCount++;
        }
      }
    }
  }
  return neighbourCount;
}

function colorizeCells(cellArray) {
  dead = 0;
  alive = 0;
  for (let rowCounter = 0; rowCounter < yAxis; rowCounter++) {
    for (let columnCounter = 0; columnCounter < xAxis; columnCounter++) {
      if (cellArray[rowCounter][columnCounter] === 1) {
        document.querySelector(`.cell--${rowCounter}-${columnCounter}`).style["background-color"] = "mediumseagreen";
        alive++;
      } else {
        document.querySelector(`.cell--${rowCounter}-${columnCounter}`).style["background-color"] = "grey";
        dead++;
      }
    }
  }
  drawChart(alive, dead);
}

function clearGame() {
  stopTicker();
  cells = JSON.parse(JSON.stringify(Array(yAxis).fill(Array(xAxis).fill(0))));
  nextGen = JSON.parse(JSON.stringify(Array(yAxis).fill(Array(xAxis).fill(0))));
  colorizeCells(cells);
  generation = 0;
  document.querySelector(".ticker__generation").innerHTML = generation.toString();
  historydata.removeRows(0, historydata.getNumberOfRows());
}

// slide control
let sliderRow = document.querySelector("#rowRange");
let sliderColumn = document.querySelector("#columnRange");
let outputRow = document.querySelector("#rowAmount");
let columnAmount = document.querySelector("#columnAmount");

outputRow.innerHTML = sliderRow.value;
columnAmount.innerHTML = sliderColumn.value;

sliderRow.oninput = function () {
  outputRow.innerHTML = this.value;
}

sliderColumn.oninput = function () {
  columnAmount.innerHTML = this.value;
}

// Draw the chart and set the chart values
function drawChart(alive, dead) {
  if (googleChartLoaded === false) {
    return;
  }
  let currentdata = google.visualization.arrayToDataTable([
    ['Task', 'Hours per Day'],
    ['cells alive', alive],
    ['cells dead', dead]
  ]);

  let options = {
    title: 'Current cells',
    width: 550,
    height: 400,
    colors: ['#3CB371', '#ec8f6e']
  };

  // Display the chart inside the <div> element
  let chart = new google.visualization.PieChart(document.getElementById('piechart'));
  chart.draw(currentdata, options);
}

// Draw the chart and set the chart values
function drawChart1() {
  if (googleChartLoaded === false) {
    return;
  }
  let options = {
    title: 'History:',
    width: 550,
    height: 400,
    isStacked: true,
    vAxis: {minValue: 0, maxValue: xAxis * yAxis},
    animation: {
      duration: 1000,
      easing: 'out'
    },
    colors: ['#3CB371', '#ec8f6e']
  };

  // Display the chart inside the <div> element with id="piechart"
  let chart = new google.visualization.AreaChart(document.getElementById('linechart'));
  chart.draw(historydata, options);
}
