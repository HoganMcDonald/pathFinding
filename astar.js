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
  $('.run').on('click', aStar);
});

//Node constructor function
var Node = function(row, column, index) {
  this.row = row;
  this.column = column;
  this.hValue = 0;
  this.gValue = 999;
  this.fValue = 0;
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
  this.calcH = function() {
    this.hValue = Math.abs((this.row - 6) + (this.column) - 6);
  };
}; //end Node constructor

//fill grid with array of arrays where grid[row][column]
var fillGrid = function(arr) {
  for (var i = 0; i <= rows; i++) {
    arr[i] = [];
    for (var j = 0; j <= columns; j++) {
      arr[i][j] = new Node(i, j, (i * (columns + 1)) + j);
      arr[i][j].calcH();
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
      }
    }
  }
}; //end toggle status

//delivers the distance between two neighbor nodes
var findGForNeighbor = function(node, nodeNeighbor) {
  var tempG = 0;
  //if diagonal to node
  if ((nodeNeighbor.row != node.row) && (nodeNeighbor.column != node.column)) {
    var tempG = node.gValue + 14;
    //if neighbor is adjacent to node
  } else {
    var tempG = node.gValue + 10;
  }
  return tempG
}; //end find G - returns g of current node plus distance to neighbor

var updateDisplay = function() {
  for (var i = 0; i < openSet.length; i++) {
    $('.node').eq(openSet[i].index).addClass('openSet');
  }
  for (var i = 0; i < closedSet.length; i++) {
    $('.node').eq(closedSet[i].index).addClass('closedSet');
  }
};

//find the lowest fValue in any array
var findLowestF = function(arr) {
  //running lowest
  var lowestF = 9999;
  var lowestI = 0;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].fValue < lowestF) {
      lowestF = arr[i].fValue;
      lowestI = i;
    }
    return i;
  }
}; //end find lowest f - returns index of lowest f

var aStar = function() {
  //diable the run button
  $(this).hide();
  //establish the start and end
  var start = grid[0][0];
  start.gValue = 0;
  var end = grid[6][6];
  openSet.push(start);
  updateDisplay();
  //^works

  //loop through open set.
  while (openSet.length > 0) {
    //current is the last item in openSet (most recently added)
    var current = openSet[findLowestF(openSet)];
    //add current to closedSet
    closedSet.push(current);
    //remove current from openSet
    openSet.pop();
    updateDisplay();
    //return if path is done
    if (current.index === end.index) {
      console.log('Done!');
      return;
    }
    //loops through the neighbors of current
    for (var i = 0; i < current.neighbors.length; i++) {
      var thisNeighbor = current.neighbors[i];
      //check status to see if it is traversable and if neighbor is in closedSet
      if (thisNeighbor.status && !closedSet.includes(thisNeighbor)) {
        console.log(thisNeighbor);
        //---------------------------------
        //if neighbor is in openSet or if current path to neighbor is less than existing path
        if (current.gValue + findGForNeighbor(current, thisNeighbor) < thisNeighbor.gValue) {
          console.log(thisNeighbor);
          //find g and f values for neighbor
          thisNeighbor.gValue = current.gValue + findGForNeighbor(current, thisNeighbor);
          thisNeighbor.calcF();
          //set parent of neighbor
          thisNeighbor.parent = current;
          if (!openSet.includes(thisNeighbor)) {
            openSet.push(thisNeighbor);
            updateDisplay();
          } //check if open set includes neighbor
        } //end chek if current path is less than existing
      } //end check if traversable
    } //end loop through current.neighbors
  } //end loop while openSet is not empty
};

/*
-loop
-        current = node in OPEN with the lowest f_cost
-        remove current from OPEN
-        add current to CLOSED

-        if current is the target node //path has been found
-                return

-        foreach neighbour of the current node
-                if neighbour is not traversable or neighbour is in CLOSED
-                        skip to the next neighbour
-
-                if new path to neighbour is shorter OR neighbour is not in OPEN
-                        set f_cost of neighbour
-                        set parent of neighbour to current
-                        if neighbour is not in OPEN
-                          add neighbour to OPEN
*/
