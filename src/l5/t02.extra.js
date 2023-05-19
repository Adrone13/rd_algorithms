const _ = require('lodash');

// 1 -> 2 slow = 1, fast = 2
// 2 -> 3 slow = 2, fast = 4
// 3 -> 4 slow = 3, fast = 2
// 4 -> 5 slow = 4, fast = 4
// 5 -> 2
function isCircular(node) {
  let slow = node;
  let fast = node.next;

  while (fast !== null && fast.next !== null) {
    // console.log(head?.val, '->', head?.next?.val);
    console.log('slow', slow?.val, 'fast', fast?.val);

    if (slow === fast) {
      break;
      // return true;
    }
    
    slow = slow.next;
    fast = fast.next.next;
  }

  let mu = 0;
  slow = null;
  while (slow !== fast) {
    if (!slow) {
      slow = node;
    } else {
      slow = slow.next;
    }

    fast = fast.next;
    mu++;
  }

  console.log('first node in cycle index', mu);

  let i = 0;
  let firstNodeInCycle = node;
  while (i < mu) {
    firstNodeInCycle = firstNodeInCycle.next;
    i++;
  }

  console.log(firstNodeInCycle);

  return -1;
}

const makeNode = (val, prevNode = null) => {
  const node = { val, next: null };
  if (prevNode) {
      prevNode.next = node;
  }
  return node;
}

const n1 = makeNode(1);
const n2 = makeNode(2, n1);
const n3 = makeNode(3, n2);
const n4 = makeNode(4, n3);
const n5 = makeNode(5, n4);
const n6 = makeNode(6, n5);
const n7 = makeNode(7, n6);
const n8 = makeNode(8, n7);
const n9 = makeNode(9, n8);
const n10 = makeNode(10, n9);

const nodes = [n1, n2, n3, n4, n5];
const nodes1 = _.cloneDeep(nodes); nodes1[4].next = nodes1[1];
const nodes2 = _.cloneDeep(nodes);
const nodes3 = _.cloneDeep(nodes); nodes3[4].next = nodes3[0];
const nodes4 = _.cloneDeep(nodes); nodes4[4].next = n4;
const nodes10 = _.cloneDeep([n1, n2, n3, n4, n5, n6, n7, n8, n9, n10]); n10.next = n4;
const a1 = makeNode(10);
const a2 = _.cloneDeep(a1); a2.next = a2;

const testCases = [
  { input: [nodes1[0]], expected: true },
  { input: [nodes2[0]], expected: false },
  { input: [nodes3[0]], expected: true },
  { input: [nodes4[0]], expected: true },
  { input: [a1], expected: false },
  { input: [a2], expected: true },
  { input: [nodes10[0]], expected: true },
];

const { input, expected } = testCases[0];

console.log('Expected:', expected, 'Received:', isCircular(input[0]))


// function test(fn, testCases) {
//   for (let i = 0; i < testCases.length; i++) {
//     const { input, expected } = testCases[i];

//     console.log('Input:', input);

//     const result = fn(...input);

//     console.log('Expected:', expected, 'Received:', result);

//     if (expected === result) {
//       console.log('Success!')
//     } else {
//       console.log('Fail!')
//     }
//   }
// }

// test(isCircular, testCases);
