'use strict';

const test = require('tap').test;
const mime = require('mime');

test('mime package lookup', (t) => {
  t.plan(9);

  t.equal(mime.getType('/path/to/file.css'), 'text/css');
  t.equal(mime.getType('/path/to/file.js'), 'application/javascript');
  t.equal(mime.getType('/path/to/file.mjs'), 'application/javascript');
  t.equal(mime.getType('/path/to/file.txt'), 'text/plain');
  t.equal(mime.getType('file.txt'), 'text/plain');
  t.equal(mime.getType('.TXT'), 'text/plain');
  t.equal(mime.getType('htm'), 'text/html');
  t.equal(mime.getType('.mkv'), 'video/x-matroska');
  t.equal(mime.getExtension('video/webm'), 'webm');

  t.end();
});

test('custom definition of mime-type with the mime package', (t) => {
  t.plan(1);

  mime.define({
    'application/xml': ['opml'],
  }, true);
  t.equal(mime.getType('.opml'), 'application/xml');

  t.end();
});
