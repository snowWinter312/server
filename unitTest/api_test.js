process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let server_url = "http://localhost:3000"

chai.use(chaiHttp);

describe('Get User', () => {
    it('it should get the user information from its id', (done) => {
        var data = {
            "_id"          : "5d82a517be62f937fcbc6879",
        }

        chai.request(server_url)
          .post('/api/v1/user/get')
          .send(data)
          .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('_id');
                res.body.should.have.property('name');
                res.body.should.have.property('email');
                res.body.should.have.property('password');
                res.body.should.have.property('role');
                res.body.should.have.property('group_id');
                res.body.should.have.property('channel_id');
                res.body.should.have.property('__v');
            done()
        })
    })
})

describe('Get All Users', () => {
    it('it should get all user information', (done) => {
        var data = {
            "_id"          : "5d82a517be62f937fcbc6879",
        }

        chai.request(server_url)
          .post('/api/v1/user/get_all')
          .send(data)
          .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('array');
            done()
        })
    })
})

describe('Delete User', () => {
    it('Delete specific user by id', (done) => {
        var data = {
            "_id"          : "5d82c0538a0d312d447f7001",
        }

        chai.request(server_url)
          .post('/api/v1/user/delete')
          .send(data)
          .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('result');
            done()
        })
    })
})


/* Add User Test
describe('Add User', () => {
    it('it should add all the new user', (done) => {
        var data = {
            "name"          : "test@chat.com",
            "email"         : "test",
            "password"      : "test",
            "role"          : 4,
            "group_id"      : "5d82ad71a4d165378c7681de",
            "channel_id"    : "5d82b35c32621644b8034f07",
            "avator_url"    : "http://localhost:3000/images/avatar.png"
        }

        chai.request('http://localhost:3000')
          .post('/api/v1/user/add')
          .send(data)
          .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('_id');
            done()
        })
    })
})
*/

