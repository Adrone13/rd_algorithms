// class Stack {
//   #stack = [];

//   constructor(array) {
//     for (let i = array.length - 1; i >= 0; i--) {
//       this.#stack.push(array[i]);
//     }
//   }

//   pop(value) {
//     this.#stack.pop(value);
//   }

//   push(value) {
//     this.#stack.push(value);
//   }

//   isEmpty() {
//     return this.#stack.length === 0;
//   }

//   toArray() {
//     return this.#stack;
//   }
// }

// 0 - round sandwich
// 1 - square sandwich
// 0 - round sandwich
// 1 - square sandwich

// []

function countStarvingStudentsWithShifts(students, sandwiches) {
  let count = 0;
  let starving = 0;

  while (starving !== students.length && sandwiches.length > 0) {
    count++;
    if (count === 10) {
      break;
    }

    console.log('students', students, 'sandwiches', sandwiches);
    console.log('starving', starving);

    if (students[0] === sandwiches[0]) {
      students.shift();
      sandwiches.shift();

      starving = 0;
    } else {
      const student = students.shift();
      students.push(student);

      starving++;
    }
  }

  return starving;
}

function countStarvingStudentsRec(students, sandwiches, starving = 0, studentsLeft, studentsHead, sandwichesHead) {
  if (starving !== students.length && sandwiches.length > 0) {
    if (students[0] === sandwiches[0]) {
      return countStarvingStudentsRec(students.shift(), sandwiches.shift(), 0);

    } else {
      const student = students.shift();
      students.push(student);

      starving++;
    }
  }

  return starving;
}
// [1, 1, 0, 0], [0, 1, 0, 1]
// [1, 0, 0, 1], [0, 1, 0, 1]
// [0, 0, 1, 1], [0, 1, 0, 1]
// [0, 1, 1], [1, 0, 1]

//  *
// [1, 1, 0, 0], [0, 1, 0, 1]
//     *
// [1, 1, 0, 0], [0, 1, 0, 1]
//        *
// [1, 1, 0, 0], [0, 1, 0, 1]
//              *
// [1, 1, null, 0], [null, 1, 0, 1]
function countStarvingStudentsOptimized(students, sandwiches) {
  let count = 0;
  let starving = 0;
  let studentsLeft = students.length;
  let studentsHead = 0;
  let sandwichesHead = 0;

  while (starving !== studentsLeft && sandwichesHead < sandwiches.length - 1) {
    count++;
    if (count === 20) {
      break;
    }

    // console.log('starving', starving);
    // console.log('studentsHead', studentsHead);
    // console.log('sandwichesHead', sandwichesHead);

    if (studentsHead === students.length) {
      studentsHead = 0;

      continue;
    }

    if (students[studentsHead] === null) {
      studentsHead++;

      continue;
    }

    console.log('students', students, 'sandwiches', sandwiches);
    console.log(`student(${studentsHead}) ${students[studentsHead]} === sandwich(${sandwichesHead}) ${sandwiches[sandwichesHead]} ${students[studentsHead] === sandwiches[sandwichesHead]}`);

    if (students[studentsHead] === sandwiches[sandwichesHead]) {
      students[studentsHead] = null;
      sandwiches[sandwichesHead] = null;

      studentsLeft--;
      studentsHead++;
      sandwichesHead++;

      starving = 0;
    } else {
      studentsHead++;
      // const student = students.shift();
      // students.push(student);

      starving++;
    }
  }
  console.log('ITERATIONS', count);

  return starving;
}

function countStarvingStudentsWithExtendingArray(students, sandwiches) {
  let starving = 0;
  let studentsLeft = students.length;
  let studentsCaret = 0;
  let sandwichesCaret = 0;

  while (starving !== studentsLeft && sandwichesCaret < sandwiches.length - 1) {
    // if (studentsCaret === students.length) {
    //   studentsCaret = 0;

    //   continue;
    // }

    if (students[studentsCaret] === null) {
      studentsCaret++;

      continue;
    }

    console.log('students', students, 'sandwiches', sandwiches);
    console.log(`student(${studentsCaret}) ${students[studentsCaret]} === sandwich(${sandwichesCaret}) ${sandwiches[sandwichesCaret]} ${students[studentsCaret] === sandwiches[sandwichesCaret]}`);

    if (students[studentsCaret] === sandwiches[sandwichesCaret]) {
      students[studentsCaret] = null; // mark student that left
      sandwiches[sandwichesCaret] = null; // mark taken sandwich

      studentsLeft--; // update amount of students left
      studentsCaret++; // move to next student
      sandwichesCaret++; // move to next sandwich when take

      starving = 0;
    } else {
      students.push(students[studentsCaret]);
      studentsCaret++;
      starving++;
    }
  }

  return starving;
}

const testData = [
  [[1, 1, 0, 0], [0, 1, 0, 1]], // 0
  [[1, 1, 1, 0, 0, 1], [1, 0, 0, 0, 1, 1]], // 3
  [[1, 1, 1, 0, 0], [1, 1, 1, 1, 1]], // 2
  [[1, 1, 1, 1, 1], [1, 1, 1, 1, 1]], // 0
  [[1, 1, 1, 1, 1], [0, 0, 0, 0, 0]], // 5
  [[0, 0, 0, 0, 0], [1, 1, 1, 1, 1]], // 5
  [[1, 1, 1, 0, 0, 1], [1, 0, 0, 0, 1, 1]], // 3
];

console.log(countStarvingStudentsOptimized([0, 0], [1, 1]));
