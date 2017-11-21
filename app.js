var express = require("express");
var login = require('./routes/loginroutes');
var notification = require('./agent/hello')
// var api = require('./routes/apiroutes');
// var patient = require('./routes/patientroutes');
// var message = require('./routes/messageroutes')
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();
var router = express.Router();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({secret:'dhiraj',
                resave: true,
                saveUninitialized: true}));

app.use('/node_modules',  express.static(__dirname + '/node_modules'));
app.use('/style',  express.static(__dirname + '/style'));

app.get('/',function(req,res){
    res.sendFile('home.html',{'root': __dirname + '/templates'});
})

app.get('/showSignInPage',function(req,res){
    res.sendFile('signin.html',{'root': __dirname + '/templates'});
})

app.get('/messages',function(req,res){
  res.sendFile('messages.html',{'root':__dirname + '/templates'})
})

app.get('/error',function(req,res){
  res.sendFile('error.html',{'root':__dirname + '/templates'})
})

app.get('/newMessage',function(req,res){
  res.sendFile('newMessage.html',{'root':__dirname + '/templates'})
})
//
// app.get('/newMessage',function(req,res){
//   res.sendFile('newMessage.html',{'root':__dirname + '/templates'})
// })
//
// app.get('/messages',function(req,res){
//   res.sendFile('messages.html',{'root':__dirname + '/templates'})
// })
//
// app.get('/survey',function(req,res){
//   res.sendFile('survey.html',{'root':__dirname + '/templates'})
// })


app.post('/login', login.login);
app.get('/message',login.message);
app.post('/notification',notification.notification);
// app.post('/surveyofpatient',patient.surveyofpatient);
app.post('/create', login.create);
// app.post('/loginapi',api.login);
// app.post('/surveyapi',api.survey);
// app.post('/deviceapi',api.device);
// app.get('/message',message.message);


// Binding express app to port 5000
app.listen(4000,function(){
    console.log('Node server running @ http://localhost:4000')
});
