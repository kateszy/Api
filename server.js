const http = require('http');
const app = require('./app');
const port = process.env.PORT || 9090;
const server = http.createServer(app);

server.listen(port, () => console.log(`Listening on port ${port}...`));

app.get('/Backend', (req, res) => {
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
  });

