var dbconnection = require('../dbconnection');
var connection = dbconnection.connection;
var schedule = require('node-schedule');
var agent = require('./header');
var device = "";
var message="";
//  , device = require('../device');
exports.notification = function(req,res){
    console.log(req.body);
    console.log(device);
    connection.query('SELECT device FROM patient', function (error, results, fields) {
    if (error) {
      message = "error occured";
      res.send({
        "code":400,
        "message":message
      })
    }else{
      if(results.length > 0){
        device = results[0].device;

            switch (req.body.status) {
              case 'Hourly':
                var rule = new schedule.RecurrenceRule();
                rule.minute = 60;
                var j = schedule.scheduleJob(rule, function(){
                  console.log('hourly notification');
                  sendNotification();
                });
                break;
              case 'DailyOnce':
                var time = req.body.time;
                var arr = time.split(':');
                var hour = parseInt(arr[0]);
                var minute = parseInt(arr[1]);
                var rule = new schedule.RecurrenceRule();
                rule.hour = hour;
                rule.minute = minute;
                var j = schedule.scheduleJob(rule, function(){
                  console.log('daily notification once');
                  sendNotification();
                });
                break;
              case 'DailyTwice':
                var time1 = req.body.time1;
                var time2 = req.body.time2;
                var arr1 = time1.split(':');
                var arr2 = time2.split(':');
                var hour1 = parseInt(arr1[0]);
                var minute1= parseInt(arr1[1]);
                var hour2 = parseInt(arr2[0]);
                var minute2= parseInt(arr2[1]);
                var rule1 = new schedule.RecurrenceRule();
                var rule2 = new schedule.RecurrenceRule();
                rule1.hour = hour1;
                rule1.minute = minute1;
                rule2.hour = hour2;
                rule2.minute = minute2;
                var j1 = schedule.scheduleJob(rule1, function(){
                  console.log('daily notification twice1');
                  sendNotification();
                });
                var j2 = schedule.scheduleJob(rule2, function(){
                  console.log('daily notification twice2');
                  sendNotification();
                });
                break;

              default:
                console.log("manual notification");
                sendNotification();

            };
            res.send({
              "status":"ok"
            });
      }
      else{
        message="Device not available";
        res.send({
          "code":400,
          "message":message
            });
      }
    }
    });


    function sendNotification(){
      console.log("sending notification");
      agent.createMessage()
      .device(device)
      .alert('New notification received')
      .set('id',req.body.id)
      .set('type',req.body.type)
      .set('message',req.body.message)
      .send();
    }
};
