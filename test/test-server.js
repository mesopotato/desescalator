let chai = require('chai');
//let server = require('../server');
let should = chai.should();
var assert = require('assert');
var expect = require('chai').expect
var app = require('../index')
var io = require('socket.io-client')
var ioOptions = { 
    transports: ['websocket'],
    forceNew: true,
    reconnection: false
}
var testMsg = {
    string: "Donald Trump",
    answer: "A answer",
    checkbox: "off",
    checkbox2: "off2"
}
var sender
var receiver

describe('Array', function () {
  describe('#indexOf()', function () {
    it('Dummy Test: should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

describe('Socket Connection Test', function () {
  beforeEach(function (done) {
    // connect two io clients
    sender = io('http://localhost:3000/', ioOptions)
    receiver = io('http://localhost:3000/', ioOptions)
    
    // finish beforeEach setup
    done()
  })
  afterEach(function (done) {
    // disconnect io clients after each test
    sender.disconnect()
    receiver.disconnect()
    done()
  })

  describe('Communication Server Client Test ', function () {
    it('The CLient should recieve the Test Data when the Connect event is emited.', function (done) {
      sender.emit('connect', testMsg)
      receiver.on('connected', function (msg) {
        expect(msg.firstName).to.equal("Jhon");
        expect(msg.latName).to.equal("Doe");
        expect(msg.email).to.equal("jhonDoe@email.com");
        done()
      })
    })
  })
})