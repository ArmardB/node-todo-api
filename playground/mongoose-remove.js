const { ObjectID } = require('mongodb');
const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

// Todo.remove
// Todo.remove({}).then((res) => {
//   console.log(res);
// });
Todo.findOneAndRemove({ _id: '5a189a9725a277f757707752'}).then((doc) => {
  // removal code goes here
});

const id = '5a189a9725a277f757707752';

Todo.findByIdAndRemove(id).then((todo) => {
  console.log(todo);
});
