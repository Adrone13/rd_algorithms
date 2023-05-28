/**
 * Кожна адреса складається з імені поштової скриньки та доменного імені,
 * які розділені знаком '@'. Крім символів нижнього регістру (a-z), имейл
 * може містити також знаки '.' або '+'
 * Наприклад, в "alice@robotdreams.cc", частина "alice" це ім'я поштової
 * скриньки, а "robotdreams.cc" це доменне ім'я.
 *
 * Якщо додати точки '.' між деякими символами в ім'я поштової скриньки,
 * лист відправлений туди буде перенаправлений на таку ж адресу без точок в
 * імені скриньки. Таке правило НЕ поширюється на доменне ім'я.
 *
 * Наприклад, "alice.k@robotdreams.cc" та "alicek@robotdreams.cc" направлять на
 * одну скриньку.
 *
 * Якщо додати плюс '+' в ім'я поштової скриньки, все після першого плюсу буде
 * проігноровано. Це дозволяє фільтрувати певні імейли.
 * Таке правило НЕ поширюється на доменне ім'я.
 *
 * Наприклад, "alice.k+ads@robotdreams.cc" буде перенаправлено на
 * "alicek@robotdreams.cc"
 *
 * Обидва правила можна використовувати одночасно.
 *
 * Вам дано список (масив) імейлів (рядків), куди ми хочемо надіслати листа.
 * Але, ми не хочемо відправляти листа на одну й ту ж поштову скриньку декілька
 * разів після урахування усіх правил поштовими сервісами.
 * Потрібно порахувати фінальну кількість адрес, які дійсно отримають листа.
 *
 * Приклад
 * Input: ["alice.k@xyz.com", "bob.f@qwer.ty", "al.i.cek+rd@xyz.com",
 * "alicek@qwer.ty"]
 * Output: 3
 * Пояснення: всього залишиться 3 унікальні фінальні адреси, а саме
 * ["alice.k@xyz.com", "bob.f@qwer.ty", "alicek@qwer.ty"]
 */

const testCases = [
  {
    input: [["alice.k@xyz.com", "bob.f@qwer.ty", "al.i.cek+rd@xyz.com", "alicek@qwer.ty"]],
    expected: 3
  },
  {
    input: [["abc.xyz@q.w", "xyz.abc@q.w", "abc+xyz@q.w"]],
    expected: 3
  },
  {
    input: [["abc.xyz+rd@n.m", "a.bc.xy.z@n.m"]],
    expected: 1
  },
  {
    input: [["abc+qwe@n.m", "abc@m.n", "abc.qwe@n.m", "abc.qwe+rr.tt@n.m"]],
    expected: 3
  },
  {
    input: [[
      // 3
      "bob.f@qwer.ty",
      "bobf@qwer.ty",
      "alice.k@xyz.com",
      "al.i.cek+rd@xyz.com",
      "alicek@xyz.com",
      "alicek@qwer.ty",

      // 4
      "abc.xyz@q.w",
      "xyz.abc@q.w",
      "abc+xyz@q.w",
      "abc.xyz+@q.w",
      "abc.xyz+1@q.wq",

      // 1
      "abc.xyz+rd@n.m",
      "a.bc.xy.z@n.m",

      // 3
      "abc+qwe@n.m",
      "abc@m.n",
      "abc.qwe@n.m",
      "abc.qwe+rr.tt@n.m",
    ]],
    expected: 11,
  }
];

function normalizeEmail(email) {
  const [emailName, emailDomain] = email.split('@');
  const normalizedEmailName = emailName.replace(/\.|\+[\w.]*/g, '');

  return normalizedEmailName + '@' + emailDomain;
}

function countUniqueEmails(emails) {
  const uniqueEmails = new Set();

  emails.forEach(email => {
    const normalizedEmail = normalizeEmail(email);

    console.log(email, '->', normalizedEmail);

    uniqueEmails.add(normalizedEmail);
  });

  return uniqueEmails.size;
}

const { test } = require('../utils/test');

test(countUniqueEmails, testCases);

// const { input, expected } = testCases[3];

// console.log('Expected:', expected, 'Received:', countUniqueEmails(...input))
