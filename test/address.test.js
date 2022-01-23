const test = require('tap').test;
const address = require('../lib/utils/address')();

test('print qrcode in terminal', (t) => {
  t.plan(2);

  console.log(address.all, address.ip);
  t.has(address.all.join(','), address.ip);
  t.has(address.all.join(','), '127.0.0.1');

  t.end();
});
