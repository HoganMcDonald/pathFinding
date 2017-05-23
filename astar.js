//variables
var grid = [];
var openSet = [];
var closedSet = [];
var rows = 6;
var columns = 6;

$(document).ready(function() {
  //populate grid with Node objects
  fillGrid(grid);
  assignNeighbors(grid);

  //on DOM
  //toggle class for div and toggle status for Nodes
  $('.node').on('click', toggleStatus);
  //refresh page when reset is clicked
  $('.reset').on('click', function() {
    location.reload();
  });
  // $('.run').on('click', aStar(grid[0][0], grid[6], [6]));
});

//Node constructor function
var Node = function(row, column, index) {
  this.row = row;
  this.column = column;
  this.hValue = function() {
    return Math.abs((this.row - 6) + (this.column) - 6);
  };
  this.gValue = 0;
  this.fValue = function() {
    return this.hValue + this.gValue;
  };
  this.status = true;
  //index number cooresponding to div number on DOM
  this.index = index;
  this.neighbors = [];

  //add all neighbors to neighbors
  this.addNeighbors = function() {
    var x = this.row;
    var y = this.column;
    if (x < columns) {
      //bottom
      this.neighbors.push(grid[x + 1][y]);
    }
    if (x < columns && y < rows) {
      //bottom right
      this.neighbors.push(grid[x + 1][y + 1]);
    }
    if (y < rows) {
      //right
      this.neighbors.push(grid[x][y + 1]);
    }
    if (x > 0 && y < rows) {
      //top right
      this.neighbors.push(grid[x - 1][y + 1]);
    }
    if (x > 0) {
      //top
      this.neighbors.push(grid[x - 1][y]);
    }
    if (x > 0 && y > 0) {
      //top left
      this.neighbors.push(grid[x - 1][y - 1]);
    }
    if (y > 0) {
      //left
      this.neighbors.push(grid[x][y - 1]);
    }
    if (x < columns && y > 0) {
      //bottom left
      this.neighbors.push(grid[x + 1][y - 1]);
    }
  }; //end addNeighbors
  this.calcF = function() {
    this.fValue = this.gValue + this.hValue;
  };
}; //end Node constructor

//fill grid with array of arrays where grid[row][column]
var fillGrid = function(arr) {
  for (var i = 0; i <= rows; i++) {
    arr[i] = [];
    for (var j = 0; j <= columns; j++) {
      arr[i][j] = new Node(i, j, (i * (columns + 1)) + j);
    }
  }
}; //end fill grid

//populates .neighbors for each node
var assignNeighbors = function(arr) {
  for (var i = 0; i <= rows; i++) {
    for (var j = 0; j <= columns; j++) {
      arr[i][j].addNeighbors();
    }
  }
}; //end assign neighbors

var removeFromArray = function(array, element) {
  for (var i = array.length - 1; i <= 0; i--) {
    if (array[i] == element) {
      array.splice(i, 1);
    }
  }
};

//changes the stauts of Node to false when clicked vice-versa
var toggleStatus = function() {
  $(this).toggleClass('nodeNull');
  //searches for node in grid with same index as div and toggles its status so null = false
  for (var i = 0; i <= rows; i++) {
    for (var j = 0; j <= columns; j++) {
      if ($(this).index() === grid[i][j].index) {
        grid[i][j].status = !grid[i][j].status;
        console.log(grid[i][j].neighbors);
      }
    }
  }
  console.log();
}; //end toggle status

//begin astar sorting
var aStar = function(start, goal) {
  openSet.push(start);
  while (openSet.length > 0) {
    //index in open set that has the lowest f value
    var lowestIndex = 0;
    //find lowest f value index
    for (var i = 0; i < openSet.length; i++) {
      //loop through open set and
      if (openSet[i].fValue < openSet[lowestIndex].fValue) {
        lowestIndex = i;
      }
    }
    var current = openSet[lowestIndex];
    if ($('.node').eq(current).hasClass('end')) {
      console.log("done!!!!!!!!!!!!!");
    }
    //openSet.remove(current);
    removeFromArray(openSet, current);
    //push current to closed set
    closedSet.push(current);

    var neighbors = current.neighbors;
    for (var j = 0; j < neighbors.length; j++) {
      var neighbor = neighbors[i];
      //if neighbor is not in the closed set
      if (!closedSet.includes(neighbor)) {
        //if neighbor is diagonal to current
        if ((neighbor.row != current.row) && (neighbor.column != current.column)) {
          var tempG = current.gValue + 14;
          //if neighbor is in open set
          if (openSet.includes(neighbor)) {
            //if potential g value is smaller than neighbor's g value
            if (tempG < neighbor.gvalue) {
              neighbor.gValue = tempG;
            }
          }
          //if neighbor is adjacent to current
        } else {
          var tempG = current.gValue + 10;
          //if neighbor is in open set
          if (openSet.includes(neighbor)) {
            //if potential g value is smaller than neighbor's g value
            if (tempG < neighbor.gvalue) {
              neighbor.gValue = tempG;
            }
          }
        }
      }
    }
  }
};
