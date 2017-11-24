const express = require('express');
const bodyParser = require('body-parser');

const { mongoose} = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

const app = express();

app.listen(3000, ()=> {
  console.log('Listening on port 3000');
});
