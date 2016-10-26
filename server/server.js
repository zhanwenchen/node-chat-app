const PORT = process.env.PORT || 3000;

const path = require('path');
const publicPath = path.join(__dirname, '../public');

var express = require('express');
var app = express();

app.use(express.static(publicPath));

app.listen(PORT, () => {
  console.log('Server started on port ' + PORT);
});
