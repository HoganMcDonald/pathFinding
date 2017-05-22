//variables
var grid = [];
var openSet = [];
var closedSet = [];
var rows = 6;
var columns = 6;

$(document).ready(function() {
  fillGrid(grid);
});

//Node constructor function
var Node = function(row, column, index) {
  this.row = row;
  this.column = column;
  this.gValue = function() {
    return Math.abs((this.row - 6) + (this.column) - 6);
  };
  this.status = true;
  //index number cooresponding to div number on DOM
  this.index = index;
}; //end Node constructor

//fill grid with array of arrays where grid[row][column]
var fillGrid = function(arr) {
  for (var i = 0; i <= rows; i++) {
    arr[i] = [];
    for (var j = 0; j <= columns; j++) {
      arr[i].push(new Node(i, j, (i * (columns + 1)) + j));
    }
  }
}; //end fill grid
