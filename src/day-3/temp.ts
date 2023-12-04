/*
async function solution2() {
  const graph = await buildGraph();

  const gears = [];
  // Find all cogs -> "*"
  for (let i = 0; i < graph.length; i++) {
    for (let j = 0; j < graph[i].length; j++) {
      const char = graph[i][j];
      if (char === '*') {
        evaluateGear(graph, i, j);
        gears.push(`${i}, ${j}`);
      }
    }
  }

  console.log(gears);
}

function evaluateGear(graph: string[][], row: number, col: number): number {
  const parts: number[] = [];
  // search all adjenct cells.
  //  a. if a gear has only 1 or less numbers adjecent return 0
  //  b. if a gear has 2 numbers adjacent return the product of the numbers

  // up
  function evalUp() {
    const value = evaluateAdj(row - 1, col);
    if (value > 0) {
      parts.push(value);
      evalRight();
    }
    evalUpRight();
  }

  // up right
  function evalUpRight() {
    const value = evaluateAdj(row - 1, col + 1);
    if (value > 0) {
      parts.push(value);
    }
    evalRight();
  }

  // right
  function evalRight() {
    const value = evaluateAdj(row, col + 1);
    if (value > 0) {
      parts.push(value);
    }
    evalDownRight();
  }

  // down right
  function evalDownRight() {
    const value = evaluateAdj(row + 1, col + 1);
    if (value > 0) {
      parts.push(value);
    }
    evalDown();
  }

  // down
  function evalDown() {
    const value = evaluateAdj(row + 1, col);
    if (value > 0) {
      parts.push(value);
      evalRight();
    }
    evalUpRight();
  }

  // down left
  function evalDownLeft() {}

  // left
  function evalLeft() {}

  // up left
  function evalUpLeft() {}

  return parts.reduce((acc, cur) => acc * cur, 0);

  function evaluateAdj(r: number, c: number) {
    if (r < 0 || c < 0) return 0;
    if (r >= graph.length || c >= graph[r].length) return 0;

    const adj = graph[r][c];
    if (DIGITS.has(adj)) {
      return buildNumber(r, c);
    }

    function buildNumber(r: number, c: number) {
      // find start of number
      let p1 = c;
      while (DIGITS.has(graph[r][p1])) {
        p1--;
      }
      let p2 = p1;
      let num = '';
      // build number
      while (DIGITS.has(graph[r][p2])) {
        num = num + graph[r][p2];
        p2++;
      }

      return parseInt(num);
    }
    return 0;
  }
}
solution2();
*/
