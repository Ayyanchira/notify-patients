var dbconnection = require('../dbconnection');
var connection = dbconnection.connection;
var sess ;
connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");
} else {
    console.log("Error connecting database ... nn");
}
});

exports.login = function(req,res){
  var email= req.body.email;
  var password = req.body.password;
  if(email == 'admin@gmail.com' && password =='password'){
    sess = req.session;
    sess.email = email;
    res.redirect("/messages");
  }else{
    res.redirect("/error");
  }
};

exports.message = function(req,res){
  sess = req.session;
  if(sess.email){
    connection.query('SELECT * FROM message', function (error, results, fields) {
    if (error) {
      res.redirect("/error");
    }else{
      if(results.length > 0){
        res.send({
          "messages":results
        })
      }
    }
    });
  }
  else {
    res.redirect("/showSignInPage");
  }
};

exports.create = function(req,res){
  sess = req.session;
  console.log(req);
  if(sess.email){
    var type = req.body.type;
    var message = req.body.message;

    console.log(type);
    console.log(message);

    connection.query('INSERT INTO message(type,message) values(?,?)',[type,message], function (error, results, fields){
      if (error) {
        res.redirect("/error");
      }else{
        res.redirect("/messages");
      }
    });
  }
  else {
    res.redirect("/showSignInPage");
  }

};
