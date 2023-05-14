const { Stack, DoublyLinkedList } = require('../structures');
const { test } = require('../utils/test');

// Complexity O(2n^2) = O(n^2)
// Extra space O(1)
function countStarvingStudentsWithShifts(students, sandwiches) {
  let starving = 0;

  while (starving !== students.length && sandwiches.length > 0) {
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

// Complexity O(n)
// Extra space O(1)
function countStarvingStudentsRaw(students, sandwiches) {
  let starving = 0;
  let studentsLeft = students.length;
  let studentsCaret = 0;
  let sandwichesCaret = 0;

  while (starving !== studentsLeft && sandwichesCaret < sandwiches.length) {
    if (students[studentsCaret] === null) {
      studentsCaret++;

      // console.log('skip null')

      continue;
    }

    // console.log(`student(${studentsCaret}) ${students[studentsCaret]} === sandwich(${sandwichesCaret}) ${sandwiches[sandwichesCaret]} ${students[studentsCaret] === sandwiches[sandwichesCaret]}`);

    if (students[studentsCaret] === sandwiches[sandwichesCaret]) {
      students[studentsCaret] = null; // mark student that left
      sandwiches[sandwichesCaret] = null; // mark taken sandwich. not essential for logic, but good for logging

      studentsLeft--; // update amount of students left
      sandwichesCaret++; // move to next sandwich when take
      starving = 0; // reset starving after student left
    } else {
      starving++;
    }

    // console.log('students', students, 'sandwiches', sandwiches);

    if (studentsCaret === students.length - 1) {
      studentsCaret = 0;
    } else {
      studentsCaret++;
    }
  }

  return starving;
}

function countStarvingStudentsOptimizedStack(students, sandwiches) {
  let starving = 0;
  let studentsLeft = students.length;
  let studentsHead = 0;

  const sandwichesStack = new Stack(sandwiches);

  while (starving !== studentsLeft && sandwichesStack.size()) {
    if (studentsHead === students.length) {
      studentsHead = 0;

      continue;
    }

    if (students[studentsHead] === null) {
      studentsHead++;

      continue;
    }

    if (students[studentsHead] === sandwichesStack.peek()) {
      students[studentsHead] = null; // mark left student

      sandwichesStack.pop();

      studentsLeft--; // update amount of students left
      studentsHead++; // move to next student when student left

      starving = 0;
    } else {
      studentsHead++;
      starving++;
    }
  }

  return starving;
}

function countStarvingStudentsLinkedList(students, sandwiches) {
  const studentsList = new DoublyLinkedList();
  const sandwichesList = new DoublyLinkedList();

  students.forEach(student => studentsList.add(student));
  sandwiches.forEach(sandwich => sandwichesList.add(sandwich));

  let starvingCount = 0;

  const studentsIterator = studentsList.iterator();

  while (starvingCount !== studentsList.size() && sandwichesList.size() !== 0) {
    const currentStudent = studentsIterator.next();
    const currentSandwich = sandwichesList.peekFirst();

    studentsList.removeFirst();

    if (currentStudent === currentSandwich) {
      sandwichesList.removeFirst();

      starvingCount = 0;
    } else {
      studentsList.add(currentStudent);
      starvingCount += 1;
    }
  }

  return starvingCount;
}

const testCases = [
  { input: [[0, 1, 1, 0], [0, 0, 1, 0]], expected: 1 },
  { input: [[1, 1, 0, 1], [0, 1, 1, 1]], expected: 0 },
  { input: [[1, 1, 1, 0, 0, 1], [1, 0, 0, 0, 1, 1]], expected: 3 },
  { input: [[1, 1, 1, 0, 0], [1, 1, 1, 1, 1]], expected: 2 },
  { input: [[1, 1, 1, 1, 1], [1, 1, 1, 1, 1]], expected: 0 },
  { input: [[1, 1, 1, 1, 1], [0, 0, 0, 0, 0]], expected: 5 },
  { input: [[0, 0, 0, 0, 0], [1, 1, 1, 1, 1]], expected: 5 },
  { input: [[1, 1, 1, 0, 0, 1], [1, 0, 0, 0, 1, 1]], expected: 3 }
];

test(countStarvingStudentsLinkedList, testCases);