const testData = [
  [[1, 2, 3], [3, 2, 1]], // 6
  [[1, 5], [7, 3], [3, 5]], // 10
  [[2, 8, 7], [7, 1, 3], [1, 9, 5]], // 17
  [[2, 6, 7], [7, 1, 3], [1, 9, 5]], // 15
  [[8], [1, 2, 3], [10, -1]], // 9
]

function richestCustomer(accounts) {
  let biggestAmount = 0;

  let clientAmount = 0;

  for (let i = 0; i < accounts.length; i++) {
     // не певен чи можна це вважати за O(1) якщо ми використовуєму цю змінну. Якщо винести її вище і обнуляти, то повинно бути O(1)

    for (let j = 0; j < accounts[i].length; j++) {
      clientAmount += accounts[i][j];
    }

    if (clientAmount > biggestAmount) {
      biggestAmount = clientAmount;
    }

    clientAmount = 0;
  }

  return biggestAmount;
}

console.log(richestCustomer(testData[4]));
