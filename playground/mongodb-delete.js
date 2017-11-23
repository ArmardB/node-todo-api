// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');
const obj = new ObjectID();
console.log(obj);


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server', err);
  }
  console.log('*** Connected to MongoDB Server ***');

  // delete many
  // db.collection('Todos').deleteMany({text: 'Prepare pie crust'}).then((res) => {
  //   console.log(res);
  // }, (err) => {
  //   console.log(err);
  // });

  // delete one
  // db.collection('Todos').deleteOne({text: 'Awesome sauce'}).then((res) => {
  //   console.log(res);
  // }, (err) => {
  //   console.log(err);
  // });

  // findOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed: false}).then((doc) => {
  //   console.log(doc);
  // });

  // Use delete many to remove dupes & use find one any delete (by id)
  db.collection('Users').deleteMany({name: 'Armard'}).then((res) => {
    console.log(res);
  }, (err) => {
    console.log(err);
  })
  // db.close();

  db.collection('Users').findOneAndDelete({
    _id: new ObjectID('5a163a87694bbf60e66f9c3e')
  }).then((res) => {
    console.log(res);
  }, (err) => {
    console.log(err);
  })
});
