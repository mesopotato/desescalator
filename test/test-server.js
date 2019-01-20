let chai = require('chai');
//let server = require('../server');
let should = chai.should();
var assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('Dummy Test: should return -1 when the value is not present', function() {
      assert.equal([1,2,3].indexOf(4), -1);
    });
  });
  
});

'use strict'

var expect = require('chai').expect
  , app = require('../index')
  , io = require('socket.io-client')
  , ioOptions = { 
      transports: ['websocket']
    , forceNew: true
    , reconnection: false
  }
  , testMsg = {
    string: "Donald Trump",
    answer: "A answer",
    checkbox: "off",
    checkbox2: "off2"
  }
  , sender
  , receiver

describe('Socket Connection Test', function(){
  beforeEach(function(done){
    
    // connect two io clients
    sender = io('http://localhost:3000/', ioOptions)
    receiver = io('http://localhost:3000/', ioOptions)
    
    // finish beforeEach setup
    done()
  })
  afterEach(function(done){
    
    // disconnect io clients after each test
    sender.disconnect()
    receiver.disconnect()
    done()
  })

  describe('Communication Server Client Test ', function(){

    it('The CLient should recieve the Test Data when the Connect event is emited.', function(done){
      sender.emit('connect', testMsg)
      receiver.on('connected', function(msg){
        expect(msg.firstName).to.equal("Jhon");
        expect(msg.latName).to.equal("Doe");
        expect(msg.email).to.equal("jhonDoe@email.com");
        done()
      })
    })
  })
})