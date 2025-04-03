import http from 'node:http';
import { Worker } from 'node:worker_threads';

function request(id?: number) {
  const _id = id ?? Math.random();

  http.get(`http://localhost:3000/${_id}`, (res) => {
    res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
    });
  });
}

request();
request(1);
request(2);
request(3);
request(4);
// request(5);
