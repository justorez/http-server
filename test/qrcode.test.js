const test = require('tap').test;
const qrcode = require('qrcode-terminal');

test('print qrcode in terminal', (t) => {
  t.plan(0);

  qrcode.generate('http://192.168.0.100:8080', { small: true });

  t.end();
});
