'use strict'
const zeromq = require('zeromq');
const filename = process.argv[2];

const requestor = zeromq.socket('req');

requestor.on('message', data => {
  const response = JSON.parse(data);
  console.log('Received response:', response);
});

requestor.connect('tcp://localhost:60401');

console.log(`Sending a request for ${filename}`);
requestor.send(JSON.stringify({ path: filename }));
