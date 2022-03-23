const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.end('Hello Server');
});

const port = 3000;

app.listen(port, () => {
  console.log(`App Running on port: ${port}`);
});
