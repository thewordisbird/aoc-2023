import { readLines, lowestCommonMultiple } from '../utils';
import * as path from 'path';

//const FILE = 'day-9-test-1.txt';
//const FILE = 'day-9-test-2.txt';
const FILE = 'day-9.txt';

const dataPath = path.join(__dirname, '..', '..', 'assets', FILE);


async function parseData(path: string) {
  const data = readLines<string>(path);

  // Create 2d matrix, each row is an array
  const result: number[][] = [];
  for await (const row of data) {
    result.push(row.split(' ').map((c) => parseInt(c.trim())))
  }

  return result;
}

async function solution1() {
  const data = await parseData(dataPath);

  let totalScore = 0

  for(const d of data) {
    const reductions: number[][] = [];

    reductions.push(d);

    let dataSet = d;

    while (dataSet.filter((c) => c !== 0).length){
      const differences = dataSet.reduce((acc: number[], cur, idx, arr) => {
       if (idx + 1 ===  arr.length ) return acc;
        acc.push(arr[idx + 1] -cur);
        return acc
      },[]);

      reductions.push(differences)
      dataSet = differences;
    }

    const localScore = reductions.reduceRight((acc, cur,) => acc + cur[cur.length -1], 0);

    totalScore = totalScore + localScore;

  }
  console.log('total score', totalScore);

}
solution1();

async function solution2() {
  const data = await parseData(dataPath);

  let totalScore = 0

  for(const d of data) {
    const reductions: number[][] = [];

    reductions.push(d);

    let dataSet = d;

    while (dataSet.filter((c) => c !== 0).length){
      const differences = dataSet.reduce((acc: number[], cur, idx, arr) => {
       if (idx + 1 ===  arr.length ) return acc;
        acc.push(arr[idx + 1] -cur);
        return acc
      },[]);

      reductions.push(differences)
      dataSet = differences;
    }

    const localScore = reductions.reduceRight((acc, cur,) =>  cur[0] - acc, 0);

    totalScore = totalScore + localScore;

  }
  console.log('total score', totalScore);
}

solution2();
