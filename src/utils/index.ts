import { group } from 'console';
import * as fs from 'fs';
import * as readline from 'readline';

export async function* readLines<T>(filePath: string) {
  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity,
  });
  for await (const line of rl) {
    yield line as T;
  }
}

export async function* groupByDelimiter<T>(
  delimiter: string,
  generator: AsyncGenerator<T>
) {
  while (true) {
    const group = await createGroup();
    if (!group.length) return;
    yield group;
  }

  async function createGroup() {
    const itemGroup: Array<T> = [];
    for await (const item of generator) {
      if (item === delimiter) return itemGroup;
      itemGroup.push(item);
    }
    return itemGroup;
  }
}

export async function* groupBySize<T>(
  groupSize: number,
  gen: AsyncGenerator<T>
) {
  while (true) {
    const group = await createGroup();
    if (!group.length) return;
    yield group;
  }

  async function createGroup() {
    const itemGroup: Array<T> = [];
    for await (const item of gen) {
      itemGroup.push(item);
      if (itemGroup.length === groupSize) return itemGroup;
    }
    return itemGroup;
  }
}

type Compare = 1 | 0 | -1;
export class MaxHeap<T> {
  private heap: T[] = [];
  public size = 0;

  constructor(private compareFn: (a: T, b: T) => Compare) {}

  public push(node: T): void {
    this.heap.push(node);
    this.size++;

    if (this.size > 1) {
      this.heapifyUp(this.size - 1);
    }
  }

  public pop(): T | undefined {
    const result = this.heap[0];

    // swap head and tail and heapify down
    this.heap[0] = this.heap[this.size - 1];
    this.heap.pop();
    this.size--;

    if (this.size > 1) {
      this.heapifyDown(0);
    }

    return result;
  }

  private heapifyUp(idx: number): void {
    const parentIdx = this.findParentIdx(idx);

    if (parentIdx < 0) return;

    const parent = this.heap[parentIdx];
    const child = this.heap[idx];

    if (this.compareFn(child, parent) === 1) {
      this.heap[parentIdx] = child;
      this.heap[idx] = parent;
      this.heapifyUp(parentIdx);
    }
  }

  private heapifyDown(idx: number): void {
    const maxChildIdx = this.findMaxChildIdx(idx);

    if (maxChildIdx > this.size - 1) return;

    const parent = this.heap[idx];
    const maxChild = this.heap[maxChildIdx];

    if (this.compareFn(maxChild, parent) === 1) {
      this.heap[idx] = maxChild;
      this.heap[maxChildIdx] = parent;
      this.heapifyDown(maxChildIdx);
    }
  }

  private findParentIdx(idx: number): number {
    return Math.floor((idx - 1) / 2);
  }

  private findMaxChildIdx(idx: number): number {
    const leftIdx = 2 * idx + 1;
    const rightIdx = 2 * idx + 2;

    if (rightIdx > this.size - 1) return leftIdx;

    const left = this.heap[leftIdx];
    const right = this.heap[rightIdx];

    if (this.compareFn(left, right) === 1) {
      return leftIdx;
    }
    return rightIdx;
  }
}

export function primeFactors(num: number) {
  const primes = [];
  let n = num;
  let p = 2;

  while (n >= p * p) {
    if (n % p === 0){
      primes.push(p)
      n = n/p;
    } else {
      p = p + 1;
    }
  }
  primes.push(n);
  return primes;
}

export function lowestCommonMultiple(nums: number[]) {
  const primes = new Set<number>();

  nums.forEach((num) => {
    const factors = primeFactors(num);
    factors.forEach((factor) => {primes.add(factor)})

  })

  let lcm = 1
  primes.forEach((prime) => {
    lcm = lcm * prime;
  })

  return lcm
}

