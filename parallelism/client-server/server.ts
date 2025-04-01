import http from 'node:http';

const server = http.createServer();

server.on('request', (req, res) => {
  console.log('Request received');

  const url = new URL(`http://${process.env.HOST ?? 'localhost'}${req.url}`);

  if (url.pathname === '/5') {
    throw new Error('I can only count to 4')
  }

  setTimeout(() => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, world!\n');
  }, 60_000);
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
})
