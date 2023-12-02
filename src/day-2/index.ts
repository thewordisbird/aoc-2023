import { readLines } from '../utils';
import * as path from 'path';

const dataPath = path.join(__dirname, '..', '..', 'assets', 'day-2.txt');
const limits = {red: 12, green: 13, blue: 14} 

type Color = keyof typeof limits;

async function solution1 () {
  const games = readLines<string>(dataPath);
  let total = 0;

  for await (const game of games) {
    const [gameNumber, sets] =   game.split(":");
    let valid = true;

    const sanitizeSet = sets.replaceAll(";", ",");

    sanitizeSet.split(",").forEach(set => {
      const [_, count, color] =set .split(" ");
      if (parseInt(count) > limits[color as Color]) {
        valid = false;
      }
      });

    if (valid) {
      total += parseInt(gameNumber.split(" ")[1]);
    }
  };
  console.log(total);
}

solution1();

async function solution2 () {
  const games = readLines<string>(dataPath);
  let total = 0;

  for await (const game of games) {
    const [gameNumber, sets] =   game.split(":");
    const minCubes = {red: 0, green: 0,  blue: 0};

    const sanitizeSet = sets.replaceAll(";", ",");

    sanitizeSet.split(",").forEach(set => {
      const [_, count, color] =set .split(" ");
      if (parseInt(count) > minCubes[color as Color]) {
        minCubes[color as Color] = parseInt(count)
      }
      });

    const power = minCubes.red * minCubes.green * minCubes.blue
    total = total + power
  };
  console.log(total);
}

solution2();
