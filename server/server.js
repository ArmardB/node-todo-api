const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose} = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

const app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  const todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc)=> {
    res.send(doc);
  },(err) => {
    res.status(400).send(err);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (err) => {
    if (err) {
      res.status(400).send(err);
    }
  });
});

app.get('/todos/:id', (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    res.status(404).send({});
  }

  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
      return res.status(200).send({todo});
  }).catch((err) =>{
    res.status(404).send();
  });
});

app.get('/users/:id', (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    res.status(404).send({});
  }

  User.findById(id).then((user) => {
    if (!user) {
      return res.status(404).send();
    }
      return res.status(200).send({user});
  }).catch((err) =>{
    res.status(404).send();
  });
});

app.listen(3000, ()=> {
  console.log('Listening on port 3000');
});

module.exports = {
  app
}
