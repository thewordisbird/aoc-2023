import { argv0 } from 'process';
import { readLines } from '../utils';
import * as path from 'path';

//const FILE = 'day-5-test.txt';
const FILE = 'day-5.txt';

const dataPath = path.join(__dirname, '..', '..', 'assets', FILE);

const seeds: number[] = [];
const seed2soil: number[][] = [];
const soil2fert: number[][] = [];
const fert2water: number[][] = [];
const water2light: number[][] = [];
const light2temp: number[][] = [];
const temp2humid: number[][] = [];
const humid2loc: number[][]= [];

async function parseMap() {
  const lines =  readLines<string>(dataPath);

  seeds.push(...await lines.next().then((res) => res.value!.split(':').at(1)?.split(' ').filter((item) => item !== '').map(c => parseInt(c)) as number[]));

  for await (const line of lines) {
    switch (line) {
      case "seed-to-soil map:":
        let v1 = await lines.next().then(res => res.value);;
        while (v1 !== '') {
          seed2soil.push(v1!.split(' ').map(c => parseInt(c)));
         v1= await lines.next().then(res => res.value);
        }
        break;
      case "soil-to-fertilizer map:":
        let v2 = await lines.next().then(res => res.value);
        while (v2 !== '') {
          soil2fert.push(v2!.split(' ').map(c => parseInt(c)));
         v2 = await lines.next().then(res => res.value);
        }
        break;
      case "fertilizer-to-water map:":
        let v3 = await lines.next().then(res => res.value);
        while (v3 !== '') {
          fert2water.push(v3!.split(' ').map(c => parseInt(c)));
         v3 = await lines.next().then(res => res.value);
        }
        break;
      case "water-to-light map:":
        let v4 = await lines.next().then(res => res.value);
        while (v4 !== '') {
          water2light.push(v4!.split(' ').map(c => parseInt(c)));
         v4 = await lines.next().then(res => res.value);
        }
        break;
      case "light-to-temperature map:":
        let v5 = await lines.next().then(res => res.value);
        while (v5 !== '') {
          light2temp.push(v5!.split(' ').map(c => parseInt(c)));
         v5 = await lines.next().then(res => res.value);
        }
        break;
      case "temperature-to-humidity map:":
        let v6 = await lines.next().then(res => res.value);
        while (v6 !== '') {
          temp2humid.push(v6!.split(' ').map(c => parseInt(c)));
         v6 = await lines.next().then(res => res.value);
        }
        break;
      case "humidity-to-location map:":
        let v7 = await lines.next().then(res => res.value);
        while (v7 !== '') {
          humid2loc.push(v7!.split(' ').map(c => parseInt(c)));
        const res = await lines.next();
        if (res.done) break;
        v7 = res.value
        }
        break;
      default:
    }
  }
}
async function solution1() {
   await parseMap();

  if(!seeds) return;
  let  minLoc = Infinity;
  for (const seed of seeds) {

    // find soil
    const soil = getValue(seed, seed2soil);
    //console.log('soil', soil);

    // find  fert
    const fert = getValue(soil, soil2fert)
    //console.log('fert', fert);

    // find water
    const water = getValue(fert, fert2water);
    //console.log('water', water);

    // find light
    const light = getValue(water, water2light);
    //console.log('light', light);

    // find temp
    const temp = getValue(light, light2temp);
    //console.log('temp', temp);

    // find humidity
    const humidity = getValue(temp, temp2humid);
    //console.log('humidity', humidity);

    // find location
    const location = getValue(humidity, humid2loc);
    //console.log('location', seedVal, location);
    if (location < minLoc) {
      minLoc = location
    }
  }

  console.log('minLoc', minLoc);
}

function getValue(source: number, map: number[][]) {
    let dest= source 
    for (const row of map){
      if (row[1] <= source && source < row[1] + row[2]) {
        // in range!
        const gap = source - row[1];
        dest = row[0] + gap;
        break;
      }
    }
  return dest
    }

solution1();

async function solution2() {
   await parseMap();

  if(!seeds) return;
  let  minLoc = Infinity;
  
  const seedMap: number[][] = [];
  let idx = 0;

  while (idx < seeds.length) {
    seedMap.push([seeds[idx], seeds[idx+1]])
    idx = idx + 2

  }

  console.log(seedMap);


  for (const range of seedMap) {
    for (let seed = range[0]; seed < range[0]+range[1]; seed++) {
      //console.log('seed', seedVal);

      // find soil
      const soil = getValue(seed, seed2soil);
      //console.log('soil', soil);

      // find  fert
      const fert = getValue(soil, soil2fert)
      //console.log('fert', fert);

      // find water
      const water = getValue(fert, fert2water);
      //console.log('water', water);

      // find light
      const light = getValue(water, water2light);
      //console.log('light', light);

      // find temp
      const temp = getValue(light, light2temp);
      //console.log('temp', temp);

      // find humidity
      const humidity = getValue(temp, temp2humid);
      //console.log('humidity', humidity);

      // find location
      const location = getValue(humidity, humid2loc);
      //console.log('location', seedVal, location);
      if (location < minLoc) {
        minLoc = location
      }
    }
  }

  console.log('minLoc', minLoc);
}

//solution2();
