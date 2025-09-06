function knightMoves(start, end) {
  if (!isValid(start[0], start[1]) || !isValid(end[0], end[1])) {
    return console.log("Position is outside of the board.");
  }

  function isValid(x, y) {
    return x >= 0 && x < 8 && y >= 0 && y < 8;
  }

  function getNeighbours(node) {
    let neighbours = [];
    const moves = [
      [2, 1],
      [2, -1],
      [-2, 1],
      [-2, -1],
      [1, 2],
      [-1, 2],
      [1, -2],
      [-1, -2],
    ];

    for (let [a, b] of moves) {
      let nx = node[0] + a;
      let ny = node[1] + b;
      if (isValid(nx, ny)) {
        neighbours.push([nx, ny]);
      }
    }

    return neighbours;
  }

  function findAllPathsFrom(start) {
    // Initialize two queues, one for current layer and other for next layer
    let currQueue = [];
    let nextQueue = [];

    // Initialize a dictionary to store parent node for each node
    // * each node will have only one parent node
    const prev = {};

    // Add the start node to the current layer queue and mark it as visited
    currQueue.push(start);
    prev[JSON.stringify(start)] = null;
    // the value of start node is null because it doesn't have a parent node,
    // and null is used to stop the loop when reconstructing the path

    // while current queue is not empty
    while (currQueue.length > 0) {
      let node = currQueue.shift(0);
      let neighbours = getNeighbours(node);
      neighbours.forEach((neighbour) => {
        let isVisited = prev[JSON.stringify(neighbour)] !== undefined;
        if (!isVisited) {
          nextQueue.push(neighbour);
          prev[JSON.stringify(neighbour)] = node;
        }
      });
      // If the current layer queue is empty, swap the current and next layer queues
      if (currQueue.length === 0) {
        [currQueue, nextQueue] = [nextQueue, currQueue];
      }
    }
    return prev;
  }
  function reconstructPath(prev, end) {
    const path = [];
    // Start from the end node and follow the parent pointers to the start node
    let currentNode = end;
    while (currentNode !== null) {
      path.unshift(currentNode);
      currentNode = prev[JSON.stringify(currentNode)];
    }
    return path;
  }

  let prev = findAllPathsFrom(start);
  let path = reconstructPath(prev, end);
  console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
  console.log(path);
}

knightMoves([3, 3], [4, 3]);
