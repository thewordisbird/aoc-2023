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
