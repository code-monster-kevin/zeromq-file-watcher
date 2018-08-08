'use strict'
const zeromq = require('zeromq');
const filename = process.argv[2];

const requestor = zeromq.socket('req');

requestor.on('message', data => {
  const response = JSON.parse(data);
  console.log('Received response:', response);
});

requestor.connect('tcp://localhost:60401');

for (let i = 1; i <= 5; i++) {
  console.log(`Sending a request #${i} for ${filename}`);
  requestor.send(JSON.stringify({ path: filename }));
}


