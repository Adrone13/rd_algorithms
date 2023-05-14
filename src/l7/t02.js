const { test } = require('../utils/test');

/**
 * Є автомобіль з певною місткістю (кількість пасажирів які можуть бути
 * всередині).
 * Авто рухається тільки на схід (тобто не може повертати та їхати на захід).
 *
 * Вам дано: місткість автомобіля (ціле число) та масив поїздок trips,
 * де trips[i] = [numPassengers, from, to] значить що
 * ith поїздка має numPassengers пасажирів і локації початку та кінця поїздки -
 * from і to.
 * Локації дані як число кілометрів на схід від початкової локації авто.
 *
 * Поверніть True, якщо можливо відвезти всіх пасажирів (з усіх поїздок), інакше
 * поверніть False.
 *
 * Приклад 1:
 * Input: trips = [[2,1,5],[3,3,7]], capacity = 4
 * Output: false
 * Пояснення:
 * - можна вважати що авто починає рух з точки 0
 * - в точці 1 два пасажири має сісти в машину
 * - потім в точці 3 ще три пасажири мають приєднатися, але вони не можуть бо
 * capacity = 4.
 * Приклад 2:
 * Input: trips = [[3,5,7], [2,1,4]], capacity = 4
 * Output: true
 * Пояснення: тут все як в прикладі 1,
 * але перед тим як ще три пасажири мають доеднатися, перші два пасажири вже
 * покинуть авто в точці 4,
 * тому в цьому випадку всі влізуть в авто та доїдуть куди їм треба.
 *
 * Обмеження:
 * 1 <= trips.length <= 1000
 * trips[i].length == 3
 * 1 <= numPassengers <= 100
 * 0 <= from < to <= 1000
 * 1 <= capacity <= 105
 */

function canAllPassengersMakeTrip(capacity, trips) {
  let tripLength = trips[0][2];

  for (let i = 1; i < trips.length; i++) {
    const currTrip = trips[i];
    const to = currTrip[2];

    if (tripLength < to) {
      tripLength = to;
    }
  }

  const tripPassengerCount = new Array(tripLength).fill(0);

  trips.sort((a, b) => a[1] - b[1]);

  for (let i = 0; i < trips.length; i++) {
    const currTrip = trips[i];
    const [ numPassengers, from, to ] = currTrip;

    for (let j = from; j < to; j++) {
      const newAmount = numPassengers + tripPassengerCount[j];

      if (newAmount > capacity) {
        return false;
      }

      tripPassengerCount[j] += numPassengers;
    }
  }

  return true;
}

function canAllPassengersMakeTripOptimal(capacity, trips) {
  const tripPassengerCount = new Array(1001).fill(0);

  for (let trip of trips) {
    tripPassengerCount[trip[1]] += trip[0];
    tripPassengerCount[trip[2]] -= trip[0];
  }


  let load = 0;
  for (let i = 0; i < tripPassengerCount.length; i++) {
    load += tripPassengerCount[i];

    if (load > capacity) {
      return false;
    }
  }

  return true;
}

const testCases = [
  { input: [4, [[2, 1, 5], [3, 3, 7]]], expected: false },
  { input: [5, [[2, 1, 5], [3, 3, 7]]], expected: true },
  { input: [5, [[3, 3, 7], [2, 1, 8], [5, 8, 20]]], expected: true },
  { input: [2, [[2, 1, 2], [2, 5, 20], [2, 3, 4]]], expected: true },
  { input: [1, [[2, 1, 2], [2, 3, 4], [2, 5, 20]]], expected: false },
  { input: [3, [[1, 10, 15], [2, 3, 4], [2, 5, 20], [2, 1, 2], [1, 17, 19]]], expected: true },
  { input: [5, [[2, 1, 5], [3, 3, 7], [5, 3, 9]]], expected: false },

  { input: [5, [[2, 1, 8], [2, 2, 4], [1, 2, 5], [4, 7, 10]]], expected: false },
];

test(canAllPassengersMakeTrip, testCases)
