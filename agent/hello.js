var agent = require('./header')
  , device = require('../device');
exports.notification = function(req,res){
    console.log(req.body);
    console.log(device);
    agent.createMessage()
    .device(device)
    .alert('New notification received')
    .set('id',req.body.id)
    .set('type',req.body.type)
    .set('message',req.body.message)
    .send();
};

// var agent = require('./header')
//   , device = require('../device');
//
//   console.log(device);
//
//   agent.createMessage()
//   .device(device)
//   .alert('Hello Universe!')
//   .send();
