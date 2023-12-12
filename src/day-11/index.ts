import { readLines } from '../utils';
import * as path from 'path';

//const FILE = 'day-11-test-1.txt';
const FILE = 'day-11.txt';

const dataPath = path.join(__dirname, '..', '..', 'assets', FILE);


async function parseData(path: string) {
  const data = readLines<string>(path);

  const matrix: string[][]= [];

  for await (const row of data){
    matrix.push(row.split(''));
  }

  return matrix;
};

function findPoints(graph: string[][], multi: number) {
  const points: [number, number][] = [] 
  const rows: number[] = []
  const cols: number[] = []

  for (let row = 0; row < graph.length; row++) {
    if (!graph[row].includes('#')) {
      rows.push(rows[row - 1] ? rows[row - 1] + multi : multi)
    } else {
      rows.push(rows[row-1] ? rows[row - 1] + 1: row)
    }
  }

  for (let col = 0; col < graph[0].length; col++) {
    const column: string[] = [];
    let isEmpty = true;
    for (let row = 0; row < graph.length; row++) {
      column.push(graph[row][col]);
      if (graph[row][col] === '#') isEmpty = false
    }
    if (isEmpty) {
      cols.push(cols[col - 1] ? cols[col - 1] + multi : multi)
    } else {
      cols.push(cols[col-1] ? cols[col - 1] + 1: col)
    }
  }

  for (let i = 0; i < graph.length; i++) {
    for (let j = 0; j < graph[i].length; j++) {
      if (graph[i][j] === '#') {
        points.push([rows[i], cols[j]])
      }
    }
  }

  return points;
  }

async function solution(multiplier: number) {
  const data = await parseData(dataPath);

  const points = findPoints(data, multiplier);

  const distances: number[] = [];
  // find shortests distances
  for (let i = 0; i < points.length- 1; i++) {
    for (let j =  i + 1; j < points.length; j++) {
      const distance = Math.abs(points[i][0] - points[j][0]) + Math.abs(points[i][1] - points[j][1])
      distances.push(distance)
    }
  }

  const result = distances.reduce((acc, cur) => acc + cur, 0)
  console.log(result);
}

// Solution part 1
solution(2);

// Solution part 2
solution(1000000);
