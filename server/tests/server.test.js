  const expect = require('expect');
  const request = require('supertest');
  const {ObjectID} = require('mongodb');

  const { app } = require('./../server');
  const { Todo } = require('./../models/todo');

  const todos = [{
      _id: new ObjectID(),
      text: 'First test todo'
    }, {
      _id: new ObjectID(),
      text: 'Second test todo'
    }];

  beforeEach((done) => {
    Todo.remove({}).then(() => {
      return Todo.insertMany(todos);
    }).then(() => done());
  });

  describe('POST /todos', () => {
    it('should create a new todo', (done)=> {
      let text = 'Test todo text';
      request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res)=> {
          expect(res.body.text).toBe(text);
        })
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          Todo.find({text}).then((todos) => {
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
          }).catch((err)=> {
            done(err);
          });
        });
    });

    it('should not create a todo with invalid body data', (done) => {
      // make post with send as empty obj, expect 400, length of todo = 0
      request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          Todo.find().then((todos) => {
            expect(todos.length).toBe(2);
            done();
          }).catch((err) => {
            done(err);
          });
        });
    });
  });

  describe('GET /todos', () => {

    it('should get all todos', (done) => {
      request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
          expect(res.body.todos.length).toBe(2);
        }).end(done);
    });
  });

  describe('GET /todos/:id', () => {

    it('should return todo doc', (done) => {
      request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
    });

    it('should return a 404 if to do not found', (done) => {
      // make request using new ObjectID, expect 404
      const id = new ObjectID().toHexString();
      request(app)
        .get(`/todos/${id}`)
        .expect(404)
        .end(done);
    })

    it('should return a 404 for non object ids', (done) => {
      // pass in /todos/123
      const id = '1234';
      request(app)
        .get(`/todos/${id}`)
        .expect(404)
        .end(done);
    });

    
  });
