var openSet = [];
var closedSet = [0];
var gRunning = 0;

$(document).ready(function() {
  $('.node').on('click', makeNull);
  assignNode();
  $('.reset').on('click', function() {
    location.reload();
  });
  findG(26);
  compareF(openSet);
  // displayIndex();
  // $('.run').on('click', astar());
});

//toggles divs black & sets data status false or true
var makeNull = function() {
  $(this).toggleClass('nodeNull');
  if ($(this).hasClass('nodeNull')) {
    $(this).data('status', true);
  } else {
    $(this).data('status', false);
  }
};

//adds data to each node object on the DOM
function assignNode() {
  for (var i = 0; i < 49; i++) {
    var thisIndex = $('.node').eq(i);
    //add column information to nodes
    if ((i + 1) % 7 === 0) {
      thisIndex.data('column', 6);
    } else {
      thisIndex.data('column', (((i + 1) % 7) - 1));
    } //end column data adder thing
    //add row information to nodes
    var row = (((i + 1) - (thisIndex.data('column') + 1)) / 7);
    thisIndex.data('row', row); //end add row information
    //add heuristic value to each node
    var hValue = Math.abs((thisIndex.data('row') - 6) + (thisIndex.data('column') - 6));
    thisIndex.data('hValue', hValue);
  }
} //end assign node

//display index, column, and row of each node
var displayIndex = function() {
  for (var i = 0; i < 49; i++) {
    var stuff = i;
    // stuff += (" c" + $('.node').eq(i).data('column'));
    // stuff += (" r" + $('.node').eq(i).data('row'));
    // stuff += (" h" + $('.node').eq(i).data('hValue'));
    stuff += (" g" + $('.node').eq(i).data('gValue'));
    // stuff += (" f" + $('.node').eq(i).data('fValue'));
    $('.node').eq(i).text(stuff);
  }
}; //end display index

//apply g to surrounding nodes excluding certain nodes, get f values
var findG = function(index) {
  //$('.node').eq(index);
  var row = $('.node').eq(index).data('row');
  var column = $('.node').eq(index).data('column');
  //loop through all nodes and check for adjacent
  for (var i = 0; i < 49; i++) {
    //$('.node').eq(i).data('row')
    //filter out indeces in closed list
    for (var j = 0; j < closedSet.length; j++) {
      if (i != j) {
        //filter out input node
        if (i != index) {
          //filters out null blocks
          if (($('.node').eq(i).data('status'))) {
            //filters out nodes not adjacent to current node
            if (Math.abs(row - $('.node').eq(i).data('row')) <= 1 && Math.abs(column - $('.node').eq(i).data('column')) <= 1) {
              var rDif = row == $('.node').eq(i).data('row');
              var cDif = column == $('.node').eq(i).data('column');
              //affect only diagnals
              if (!(rDif || cDif) && !(rDif && cDif)) {
                var g = gRunning + 14;
                $('.node').eq(i).data('gValue', g);
                calcF(i);
                openSet.push(i);
              }
              //affect only adjacents
              if (cDif || rDif) {
                var g = gRunning + 10;
                $('.node').eq(i).data('gValue', g);
                calcF(i);
                openSet.push(i);
              }
            }
          }
        }
      }
    }
  }
};

//loops through openSet and returns index of lowest f score and assign parent node
function compareF(arr) {
  var lowestFIndex = [];
  var lowestF = 9999;
  for (var i = 0; i < arr.length; i++) {
    if ($('.node').eq(arr[i]).data('fValue') < lowestF) {
      lowestFIndex = [];
      lowestFIndex.push(i);
      lowestF = $('.node').eq(arr[i]).data('fValue');
    } else if ($('.node').eq(arr[i]).data('fValue') === lowestF) {
      lowestFIndex.push(i);
    } else {
      arr.splice(i, 1);
    }
  }
  console.log(arr);
  console.log(lowestFIndex);
}

//calculate f score for any give node
function calcF(index) {
  var f = $('.node').eq(index).data('hValue') + $('.node').eq(index).data('gValue');
  $('.node').eq(index).data('fValue', f);
} //end f calculator

/*
astar function
get lowest fscore item on list
move to closed list
get adjacent available squares - loop:
  ignore if in closedSet
  if not in openSet add and calc its score
*/




//astar
//start node in closed set 0
//calculate g score of surrounding nodes
//push neighbors to openSet
//calculate f scores of open sets
//push lowest f score to closed set
