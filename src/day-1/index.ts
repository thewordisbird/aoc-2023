import { readLines } from '../utils';
import * as path from 'path';

const nums = new Set(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']);
const stringNumbers = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
};

type Key = keyof typeof stringNumbers

const dataPath = path.join(__dirname, '..', '..', 'assets', 'day-1.txt');
async function calibrate(parser: (str: string) => number) {
  const lineItems = readLines<string>(dataPath);
  let total = 0;

  for await (const line of lineItems) {
    total = total + parser(line);
  }

  console.log(total);
}

calibrate(basicParser);
calibrate(advancedParser);

/* Parsers */
function basicParser(str: string) {
  const arr: string[] = [];

  for (let i = 0; i < str.length; i++) {
    if (nums.has(str[i])) {
      arr.push(str[i]);
    }
  }

  return  parseInt(arr[0]) * 10 + parseInt(arr[arr.length - 1]);
}

function advancedParser(str: string) {
  let first: string | undefined;
  let last: string | undefined;
  let token = '';

  // find first number;
  for (let i = 0; i < str.length; i++) {
    if (nums.has(str[i])) {
      first = str[i];
    }

    token = token + str[i];
    for (let key of Object.keys(stringNumbers)) {
      if (token.includes(key)) {
        first = stringNumbers[key as Key];
      }
    }
    if (first) break;
  }

  // find last number;
  token = '';
  for (let j = str.length - 1; j > -1; j--) {
    if (nums.has(str[j])) {
      last = str[j];
    }

    token = str[j] + token;
    for (let key of Object.keys(stringNumbers)) {
      if (token.includes(key)) {
        last = stringNumbers[key as Key];
      }
    }
    if (last) break;
  }

  return parseInt(first! + last!);
}
