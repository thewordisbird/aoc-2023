import { readLines, lowestCommonMultiple } from '../utils';
import * as path from 'path';

//const FILE = 'day-8-test-1.txt';
//const FILE = 'day-8-test-2.txt';
//const FILE = 'day-8-test-3.txt';
const FILE = 'day-8.txt';

const dataPath = path.join(__dirname, '..', '..', 'assets', FILE);

async function parseInput(path: string): Promise<[string, Map<string, [string, string]>]> {
  const data = readLines<string>(path);

  const directions = await data.next().then((res) => res.value);
  if (typeof directions !== "string") throw new Error('Parsting Error: Unable to parse directions');

  // Move past empty row
  await data.next()

  const map = new Map<string, [string, string]>();
  for await (const direction of data) {
    const [key, values] = direction.split(' = ');
    map.set(key, values.slice(1, values.length - 1).split(', ') as [string, string])
  }

  return [directions, map];
}
async function solution() {

  const [directions, map] = await parseInput(dataPath);

  let steps = 0;
  let idx = 0;
  let activeKey = 'AAA'
  
  while (activeKey !== 'ZZZ') {
    steps++
    const move = (directions as string)[idx % (directions as string).length] === 'L' ? 0 : 1;

    if (map.get(activeKey) === undefined) throw new Error(`Map Error: key ${activeKey} not found.`);
    const destination: string = map.get(activeKey)![move];
    activeKey = destination;

    idx++

  }

  console.log(steps);
}

solution();


async function solution2() {
  const [directions, map] = await parseInput(dataPath);

  const startingNodes: string[] = []
  map.forEach((_, key) => {
    if (key.slice(-1) === 'A') {
      startingNodes.push(key);
    }
  });

  const steps = findStepsToDestination(directions, map, startingNodes);
  console.log(lowestCommonMultiple(steps));
}

solution2()

function findStepsToDestination(directions: string, map: Map<string, [string, string]>,  nodes: string[]) {
  let steps: number[] = []

  nodes.forEach((node) => {
    let i = 0;
    let s = 0;
    let n = node;
    while (n.slice(-1) !== 'Z') {
      s++
      const move = (directions as string)[i % (directions as string).length] === 'L' ? 0 : 1;

      if (map.get(n) === undefined) throw new Error(`Map Error: key ${n} not found.`);
      const destination = map.get(n)![move];
      n = destination;

      i++
    }

    steps.push(s);


  });

  return steps

}


