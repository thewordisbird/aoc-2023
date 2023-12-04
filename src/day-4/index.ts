import { readLines } from '../utils';
import * as path from 'path';

//const FILE = 'day-4-test.txt';
const FILE = 'day-4.txt';

const dataPath = path.join(__dirname, '..', '..', 'assets', FILE);

async function solution1() {
  const cards = readLines<string>(dataPath);

  let total = 0;
  for await (const card of cards) {
    const [_, numbers] = card.split(':');
    const [winning, picks] = numbers.split('|');

    const winningArr = winning.trim().split(' ');
    const picksArr = picks.trim().split(' ');

    let score = 0;
    let flag = false;

    picksArr.forEach((num) => {
      if (winningArr.includes(num)) {
        if (num === '') return;
        if (flag === false) {
          score = 1;
          flag = true;
        } else {
          score = 2 * score;
        }
      }
    });

    total = total + score;
  }
  console.log(total);
}

solution1();

async function solution2() {
  const cards = readLines<string>(dataPath);

  let cardNumber = 0;
  const scratchCards: number[] = [0];

  for await (const card of cards) {
    cardNumber++;

    if (scratchCards[cardNumber]) {
      scratchCards[cardNumber] = scratchCards[cardNumber] + 1;
    } else {
      scratchCards.push(1);
    }

    const [_, numbers] = card.split(':');
    const [winning, picks] = numbers.split('|');

    const winningArr = winning
      .trim()
      .split(' ')
      .filter((cur) => cur !== '');
    const picksArr = picks
      .trim()
      .split(' ')
      .filter((cur) => cur !== '');

    let winningPicks = 0;
    picksArr.forEach((num) => {
      if (winningArr.includes(num)) {
        winningPicks++;
      }
    });

    for (let i = cardNumber + 1; i <= cardNumber + winningPicks; i++) {
      if (scratchCards[i]) {
        scratchCards[i] = scratchCards[i] + scratchCards[cardNumber];
      } else {
        scratchCards.push(scratchCards[cardNumber]);
      }
    }
  }

  const total = scratchCards.reduce((acc, cur) => acc + cur, 0);
  console.log(total);
}

solution2();
