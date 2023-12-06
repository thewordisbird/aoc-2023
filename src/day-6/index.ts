const testData = [[7,9], [15,40], [30, 200]]
const partOneData = [[51,377], [69, 1171], [98, 1224], [78, 1505]]
const partTwoData = [[51699878,377117112241505]]

function solution(races: number[][]) {

  let product = 1
  for (let race of races) {
    const [T, R] = race;
    const x1 = T/2 + Math.sqrt((T*T) - (4*R))/-2;
    const x2 = T/2 - Math.sqrt((T*T) - (4*R))/-2;

    product = product * ((Math.ceil(x2) - Math.floor(x1))-1);
  }
  return product
}

const testSolution = solution(testData);
const partOneSolution = solution(partOneData);
const partTwoSolution = solution(partTwoData);

console.log('Test:', testSolution);
console.log('Part 1:', partOneSolution);
console.log('Part 2:', partTwoSolution);


