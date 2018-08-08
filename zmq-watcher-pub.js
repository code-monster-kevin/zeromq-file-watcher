'use strict'
const fs = require('fs');
const zeromq = require('zeromq');
const filename = process.argv[2];

const publisher = zeromq.socket('pub');

fs.watch(filename, () => {
  publisher.send(JSON.stringify({
    type: 'changed',
    file: filename,
    timestamp: Date.now()
  }));
});

publisher.bind('tcp://*:60400', err => {
  if(err) {
      throw err;
  }
  console.log('Listening for zeromq subscribers');
});
