var http = require("http");
const express = require('express')
const app = express()
var router = express.Router();
app.use(express.static('public'))

app.listen(3000, () => console.log('Example app listening on port 3000!'));

app.get('/', function (req, res) {
  res.sendFile('/index.html');
});