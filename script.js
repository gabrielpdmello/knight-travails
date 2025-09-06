function knigthMoves(start, end) {
  if (
    start[0] < 0 ||
    start[0] > 7 ||
    start[1] < 0 ||
    start[1] > 7 ||
    end[0] < 0 ||
    end[0] > 7 ||
    end[1] < 0 ||
    end[1] > 7
  ) {
    return console.log("Position is outside of the board.");
  }

  function getNeighbours(node) {
    let neighbours = [];

    // check if the knight can move 2 positions up,
    // then check if it can move one to the left and/or one to the right
    if (node[1] <= 5) {
      if (node[0] > 0) {
        neighbours.push([node[0] - 1, node[1] + 2]);
      }
      if (node[0] < 7) {
        neighbours.push([node[0] + 1, node[1] + 2]);
      }
    }
    // repeat same algorithm for the right, bottom, and left, respectively
    if (node[0] <= 5) {
      if (node[1] < 7) {
        neighbours.push([node[0] + 2, node[1] + 1]);
      }
      if (node[1] > 0) {
        neighbours.push([node[0] + 2, node[1] - 1]);
      }
    }
    if (node[1] >= 2) {
      if (node[0] < 7) {
        neighbours.push([node[0] + 1, node[1] - 2]);
      }
      if (node[0] > 0) {
        neighbours.push([node[0] - 1, node[1] - 2]);
      }
    }
    if (node[0] >= 2) {
      if (node[1] > 0) {
        neighbours.push([node[0] - 2, node[1] - 1]);
      }
      if (node[1] < 7) {
        neighbours.push([node[0] - 2, node[1] + 1]);
      }
    }

    return neighbours;
  }

  function compareArrays(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
  }

  function findAllPathsFrom(start) {
    // Initialize two queues, one for current layer and other for next layer
    let currQueue = [];
    let nextQueue = [];
    // Initialize a dictionary to store parent node for each node
    // * each node will have only one parent node
    const prev = {};

    // Add the start node to the current layer queue and add it to prev
    currQueue.push(start);
    // the value of start node is null because it doesn't have a parent node,
    // and null is used to stop the loop when reconstructing the path
    prev[JSON.stringify(start)] = null;

    // the visited nodes will be saved in a list
    let visited = [];
    visited.push(start);

    // while current queue is not empty
    while (currQueue.length) {
      let node = currQueue.shift(0);
      let neighbours = getNeighbours(node);
      neighbours.forEach((neighbour) => {
        let isVisited = visited.find((item) => compareArrays(item, neighbour));
        if (!isVisited) {
          visited.push(neighbour);
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

  function reconstructPath(prev, start, end) {
    const path = [];

    // Start from the end node and follow the parent pointers to the start node
    let currentNode = end;
    while (currentNode !== null) {
      // add node to the start of path
      path.unshift(currentNode);
      // set the parent node of current node as current node
      currentNode = prev[JSON.stringify(currentNode)];
    }

    if (compareArrays(path[0], start)) return path;
    return [];
  }

  let prev = findAllPathsFrom(start);
  let path = reconstructPath(prev, start, end);
  console.log(
    `You made it in ${Object.keys(path).length - 1} moves! Here's your path:`
  );
  console.log(path);
}

knigthMoves([1, 3], [7, 3]);
