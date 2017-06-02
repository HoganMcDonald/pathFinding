# pathFinding


One of the first major problems I encountered while learning to code involved pathfinding. I was practicing fundementals of JavaScript and stumbled accross [this](https://edabit.com/challenge/bfBTeRqsZ3Jwmyz6P) problem.

On the surface the problem seemed simple, navigate from point a to point b in the shortest possible path, but quickly I learned how complex it really was. 

### Setup

The first thing I had to study was the different approaches commonly taken in pathfinding problems. I understood that it would be infeasible to create a program that simply found all possible paths from begining to end and compared them. 

After some research I decided to pursue using the [Astar search algorithm](https://en.wikipedia.org/wiki/A*_search_algorithm). This was for a few reasons:

- It takes into consideration the actual distance between two nodes in a given network as well as an estimate of how far away a given node is from the end.
- It seems to test fewer possible paths than other search algorithms like [Dijkstra's.](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm)
- There was quite a bit of documentation available on how to impliment it in javascript. This was especially helpful because When I first took on this project, I hardly understood what classes were.

I chose to take on this project because I was interested in learning implimentation of algorithms in code and expanding my understanding of both JavaScript and JQuery.

### JQuery

My first approach involved mostly JQuery. At first it made sense to me to do this because I was having difficulty conceptualizing how to update the DOM while paths were being evaluated in the back end. Since I wanted to make a webpage that would visually display the algorithm, this problem was central to how I chose to write it. 

This involved treating each div like an object in JavaScript. I ended up using the .data() method quite a bit in my first attempt which resulted in very messy code. It became difficult to parse what each function was doing because of the very cluttered syntax of JQuery. I later abandoned this approach.

### Object Oriented Approach

My next solution involved creating a class for the nodes and storing the nodes in a two dimensional array. This made it easier to manipulate the nodes, but more difficult from my perspective to display the process. 

What I decided to do was write a method for the class that would assign a uniqe index to each node. This index would correspond with the index of the div on the DOM. This way I could create a single function that would update the DOM and call it whenever a particular nodes status was changed. Below are some photos of the program working currently. It's clear that my implimentation of AStar is not correct yet, because the paths that this program finds are not the most efficient, but they are pretty close. I will touch on this more in the next section.

![program on load](/img1.png "empty grid")
![basic path found](/img2.png "path found")
![creating obstacles](/img3.png "creating obstacles")
![path found](/img4.png "path found")


### Next
