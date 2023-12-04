import { readLines } from '../utils';
import * as path from 'path';

const FILE = 'day-3.txt';
//const FILE = 'day-3-test.txt';
//const FILE = 'day-3-edge.txt';

const dataPath = path.join(__dirname, '..', '..', 'assets', FILE);

const DIGITS = new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);

async function buildGraph() {
  const rows = readLines<string>(dataPath);

  const graph = [];

  for await (const row of rows) {
    if (!graph.length) {
      const temp = row.split('');
      graph.push(new Array(temp.length + 2).fill('.'));
      graph.push(['.', ...temp, '.']);
    } else {
      graph.push(['.', ...row.split(''), '.']);
    }
  }
  graph.push(new Array(graph[0].length + 2).fill('.'));
  return graph;
}

async function solution1() {
  const graph = await buildGraph();

  let total = 0;
  let currentNumber = '';
  let valid = false;

  for (let i = 0; i < graph.length; i++) {
    for (let j = 0; j < graph[i].length; j++) {
      const char = graph[i][j];

      // if the character is a number build number
      if (DIGITS.has(char)) {
        currentNumber = currentNumber + char;
        if (!valid) {
          valid = validateNumber(graph, i, j);
        }
      } else if (char === '.') {
        // if the character is a "." end number
        if (currentNumber !== '') {
          if (valid) {
            total = total + parseInt(currentNumber);
          }
          currentNumber = '';
          valid = false;
        }
      } else {
        // if the character is anything else validate surronding numbers
        if (currentNumber !== '') {
          total = total + parseInt(currentNumber);
          if (valid) {
          }
          currentNumber = '';
          valid = false;
        }
      }
    }
    //  handle numbers at end of line
    if (currentNumber !== '') {
      if (valid) {
        total = total + parseInt(currentNumber);
      }
      currentNumber = '';
      valid = false;
    }
  }
  console.log(total);

  function validateNumber(
    graph: string[][],
    row: number,
    col: number
  ): boolean {
    if (validateChar(row, col - 1)) {
      return true;
    }
    if (validateChar(row - 1, col - 1)) {
      return true;
    }
    if (validateChar(row - 1, col)) {
      return true;
    }
    if (validateChar(row - 1, col + 1)) {
      return true;
    }
    if (validateChar(row, col + 1)) {
      return true;
    }
    if (validateChar(row + 1, col + 1)) {
      return true;
    }
    if (validateChar(row + 1, col)) {
      return true;
    }
    if (validateChar(row + 1, col - 1)) {
      return true;
    }

    return false;

    function validateChar(row: number, col: number) {
      if (row < 0 || col < 0) return false;
      if (row >= graph.length || col >= graph[row].length) return false;
      const char = graph[row][col];
      return char !== '.' && !DIGITS.has(char);
    }
  }
}

solution1();

async function solution2() {
  const graph = await buildGraph();
  const cogs = new Map();

  for (let i = 1; i < graph.length - 1; i++) {
    for (let j = 1; j < graph[i].length - 1; j++) {
      // Find all astrisks
      if (graph[i][j] === '*') {
        //cogs.push(`${i},${j}`);
        const gears = validateCog(graph, i, j);
        if (gears.length === 2) {
          cogs.set(`${i}, ${j}`, gears);
        }
      }
    }
  }

  let total = 0;

  cogs.forEach((value, key) => {
    if (value.length !== 2) return;
    total = total + value[0] * value[1];
  });

  console.log(total);
}

function validateCog(graph: string[][], row: number, col: number) {
  const gears: string[] = [];

  // check up
  if (DIGITS.has(graph[row - 1][col])) {
    gears.push(buildNumber(graph, row - 1, col));
  } else {
    if (DIGITS.has(graph[row - 1][col - 1])) {
      gears.push(buildNumber(graph, row - 1, col - 1));
    }
    if (DIGITS.has(graph[row - 1][col + 1])) {
      gears.push(buildNumber(graph, row - 1, col + 1));
    }
  }

  // check down
  if (DIGITS.has(graph[row + 1][col])) {
    gears.push(buildNumber(graph, row + 1, col));
  } else {
    if (DIGITS.has(graph[row + 1][col - 1])) {
      gears.push(buildNumber(graph, row + 1, col - 1));
    }
    if (DIGITS.has(graph[row + 1][col + 1])) {
      gears.push(buildNumber(graph, row + 1, col + 1));
    }
  }

  // check left
  if (DIGITS.has(graph[row][col - 1])) {
    gears.push(buildNumber(graph, row, col - 1));
  }

  // check right
  if (DIGITS.has(graph[row][col + 1])) {
    gears.push(buildNumber(graph, row, col + 1));
  }

  return gears;
}

function buildNumber(graph: string[][], row: number, col: number) {
  // find start of number
  let p1 = col;
  while (DIGITS.has(graph[row][p1])) {
    p1--;
  }
  let p2 = p1 + 1;
  let num = '';
  // build number
  while (DIGITS.has(graph[row][p2])) {
    num = num + graph[row][p2];
    p2++;
  }

  return num;
}

solution2();
