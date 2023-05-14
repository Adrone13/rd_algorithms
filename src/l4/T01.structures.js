const { DoublyLinkedList } = require('../structures');

function countStarvingStudents(students, sandwiches) {
  const studentsList = new DoublyLinkedList(students);
  const sandwichesList = new DoublyLinkedList(sandwiches);

  // students.forEach(student => studentsList.add(student));
  // sandwiches.forEach(sandwich => sandwichesList.add(sandwich));

  let starvingCount = 0;

  const studentsIterator = studentsList.iterator();

  let count = 0;

  while (starvingCount !== studentsList.size() && sandwichesList.size() !== 0) {
    count++;

    const currentStudent = studentsIterator.next();
    const currentSandwich = sandwichesList.peekFirst();

    console.log('student list');
    studentsList.printList();
    console.log('sandwiches list');
    sandwichesList.printList();
    console.log('curr student', currentStudent)
    console.log('curr sandwich', currentSandwich)
    console.log();

    studentsList.removeFirst();

    if (currentStudent === currentSandwich) {
      sandwichesList.removeFirst();

      starvingCount = 0;
    } else {
      studentsList.add(currentStudent);
      starvingCount += 1;
    }
  }

  console.log('COUNT', count);

  return starvingCount;
}

function countStarvingStudentsRec(studentsList, sandwichesList, studentsIterator, starvingCount = 0) {
  if (starvingCount === studentsList.size() || sandwichesList.size() === 0) {
    return starvingCount;
  }

  const currentStudent = studentsIterator.next();
  const currentSandwich = sandwichesList.peekFirst();

  console.log('student list');
  studentsList.printList();
  console.log('sandwiches list');
  sandwichesList.printList();
  console.log('curr student', currentStudent)
  console.log('curr sandwich', currentSandwich)
  console.log();

  studentsList.removeFirst();

  if (currentStudent === currentSandwich) {
    sandwichesList.removeFirst();

    return countStarvingStudentsRec(studentsList, sandwichesList, studentsIterator, 0);
  }

  studentsList.add(currentStudent);
  starvingCount += 1;

  return countStarvingStudentsRec(studentsList, sandwichesList, studentsIterator, starvingCount);
}

function countStarvingStudentsRecFactory(students, sandwiches) {
  const studentsList = new DoublyLinkedList(students);
  const sandwichesList = new DoublyLinkedList(sandwiches);
  const studentsIterator = studentsList.iterator();

  return countStarvingStudentsRec(studentsList, sandwichesList, studentsIterator);
}

const testData = [
  [[1, 1, 0, 0], [0, 1, 0, 1]], // 0
  [[1, 1, 1, 0, 0, 1], [1, 0, 0, 0, 1, 1]], // 3
  [[1, 1, 1, 0, 0], [1, 1, 1, 1, 1]], // 2
  [[1, 1, 1, 1, 1], [1, 1, 1, 1, 1]], // 0
  [[1, 1, 1, 1, 1], [0, 0, 0, 0, 0]], // 5
  [[0, 0, 0, 0, 0], [1, 1, 1, 1, 1]], // 5
  [[1, 1, 1, 0, 0, 1], [1, 0, 0, 0, 1, 1]], // 3

  [[0, 0, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1]], // 6

  [[1, 1, 1, 0, 0, 1, 0, 1, 0], [1, 0, 0, 0, 1, 1, 1, 0, 1]], // 14
];

console.log(countStarvingStudentsRecFactory(...testData[7]));

// const list = new DoublyLinkedList([1, 1, 2]);

// console.log(list.printList())
