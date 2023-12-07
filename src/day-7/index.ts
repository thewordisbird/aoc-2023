import { readLines, MaxHeap } from '../utils';
import * as path from 'path';

//const FILE = 'day-7-test.txt';
const FILE = 'day-7.txt';

const dataPath = path.join(__dirname, '..', '..', 'assets', FILE);

type Type = 1 | 2 | 3 | 4 | 5 | 6 | 7;
type Hand = {
  value: string;
  bid: number;
  type?: Type;
};

// Part 1 Solution
const part1Cards = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'T',
  'J',
  'Q',
  'K',
  'A',
];
solution(part1Cards, classifyHand).then((res) =>
  console.log('Part 1 Solution:', res)
);
// Part 2 Solution
const part2Cards = [
  'J',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'T',
  'Q',
  'K',
  'A',
];
solution(part2Cards, classifyHandJoker).then((res) =>
  console.log('Part 2 Solution:', res)
);

async function solution(cards: string[], classifier: (hand: Hand) => Type) {
  const rounds = readLines<string>(dataPath);
  function compareFn(hand1: Hand, hand2: Hand) {
    //return compareHands(CARDS, hand1, hand2, classifyHand);
    return compareHands(cards, hand1, hand2, classifier);
  }
  const maxHeap = new MaxHeap(compareFn);

  for await (const round of rounds) {
    const [cards, bid] = round.split(' ');
    const hand: Hand = { value: cards, bid: parseInt(bid) };

    maxHeap.push(hand);
  }

  let score = 0;

  while (maxHeap.size > 0) {
    const rank = maxHeap.size;
    const winnings = maxHeap.pop()?.bid;

    if (!winnings) break;
    score = score + rank * winnings;
  }

  return score;
}

function compareHands(
  cards: string[],
  hand1: Hand,
  hand2: Hand,
  classifier: (hand: Hand) => Type
) {
  // returns 1 if hand1 > hand2
  // returns 0 if hand1 === hand2
  // returns -1 if hand1 < hand2
  if (!hand1.type) hand1.type = classifier(hand1);
  if (!hand2.type) hand2.type = classifier(hand2);

  // Compare based on types
  if (hand1.type > hand2.type) return 1;
  if (hand1.type < hand2.type) return -1;

  // If they are the same types compare by cards
  for (let i = 0; i < hand1.value.length; i++) {
    const rank1 = cards.indexOf(hand1.value[i]);
    const rank2 = cards.indexOf(hand2.value[i]);

    if (rank1 > rank2) return 1;
    if (rank1 < rank2) return -1;
  }

  // If they are the same, which shouldn't happen return 0
  return 0;
}

function classifyHand(hand: Hand): Type {
  // Group cards by like cards
  const map = new Map();
  for (let card of hand.value) {
    if (map.get(card)) {
      map.set(card, map.get(card) + 1);
    } else {
      map.set(card, 1);
    }
  }

  // Five Of A Kind
  if (map.size === 1) return 7;

  // Four Of A Kind or Full House
  if (map.size === 2) return findMax() === 4 ? 6 : 5;

  // Three Of A Kind or Two Pair
  if (map.size === 3) return findMax() === 3 ? 4 : 3;

  // One Pair
  if (map.size === 4) return 2;

  // High Card
  if (map.size === 5) return 1;

  throw new Error('Invalid Hand');

  function findMax() {
    let max = 0;
    for (const c of map.values()) {
      if (c > max) max = c;
    }
    return max;
  }
}

function classifyHandJoker(hand: Hand): Type {
  // Group cards by like cards
  const map = new Map();

  for (let card of hand.value) {
    if (map.get(card)) {
      map.set(card, map.get(card) + 1);
    } else {
      map.set(card, 1);
    }
  }

  let type: Type | undefined = undefined;

  // Five Of A Kind (7)
  if (map.size === 1) {
    return 7;
  }

  // Four Of A Kind (6) or Full House (5)
  if (map.size === 2) {
    if (map.get('J') === 1) return 7;
    if (map.get('J') === 2) return 7;
    if (map.get('J') === 3) return 7;
    if (map.get('J') === 4) return 7;

    return findMax() === 4 ? 6 : 5;
  }

  // Three Of A Kind (4) or Two Pair (3)
  if (map.size === 3) {
    if (map.get('J') === 3) return 6;
    if (map.get('J') === 2) return 6;
    if (map.get('J') === 1) {
      return findMax() === 3 ? 6 : 5;
    }
    return findMax() === 3 ? 4 : 3;
  }

  // One Pair (2)
  if (map.size === 4) {
    if (map.get('J') === 2) return 4;
    if (map.get('J') === 1) return 4;
    return 2;
  }

  // High Card (1)
  if (map.size === 5) {
    if (map.get('J') === 1) return 2;
    return 1;
  }

  throw new Error(`Invalid Hand - ${hand.value}, ${map}`);

  function findMax() {
    let max = 0;
    for (const c of map.values()) {
      if (c > max) max = c;
    }
    return max;
  }
}
