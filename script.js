$(document).ready(function() {
  $('.node').on('click', makeNull);
  assignNode();
  displayIndex();
  $('.reset').on('click', function() {
    location.reload();
  });
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
    $('.node').eq(i).text(stuff);
  }
}; //end display index

//A* algorithm
var openList = [];
var closedList = [$('.start')];
var gRunning = 0;

//add current node to closed list
//add adjacent cells that are not null to the open list
//add moving cost to nodes on open list - g
//calculate f - g + h
//empty closed list
//add lowest f score node(s) to closed list

//find g for adjacent nodes
var findG = function(index) {
  $('.node').eq(index);
};
