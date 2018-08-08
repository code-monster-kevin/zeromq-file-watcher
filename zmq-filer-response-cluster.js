'use strict'
const cluster = require('cluster');
const fs = require('fs');
const zmq = require('zeromq');

const workers = require('os').cpus().length;

if (cluster.isMaster) {
  const router = zmq.socket('router').bind('tcp://127.0.0.1:60401');
  const dealer = zmq.socket('dealer').bind('ipc://filer-dealer.ipc');

  router.on('message', (...frames) => dealer.send(frames));
  dealer.on('message', (...frames) => router.send(frames));

  cluster.on('online', worker => console.log(`Worker ${process.pid} is online`));
  for (let i = 0; i < workers; i++) {
    cluster.fork();
  }
}
else {
  const responder = zmq.socket('rep').connect('ipc://filer-dealer.ipc');
  responder.on('message', data => {
    const request = JSON.parse(data);
    console.log(`Process ${process.pid} received request for ${request.path}`);

    fs.readFile(request.path, (err, content) => {
      console.log( `Process ${process.pid} sending a response`);
      responder.send(JSON.stringify({
        content: content.toString(),
        timestamp: Date.now(),
        pid: process.pid
      }));
    })
  });
}