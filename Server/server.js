const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient

var database;
var onlineUsers = [];
var messagesArr = [];

//middlewares
app.use(bodyParser.json())

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validateNewUser(user) {
    var dataExists = user.username && user.email && user.password && user.fname && user.lname;
    var dataIsValid = validateEmail(user.email) && (user.password.length > 5) && (user.username.length > 3);
    return dataExists && dataIsValid;
}

//routing
app.post('/api/signup',function(request,response){
  console.log(request.body);
  if (validateNewUser(request.body)) {
      var user = {
          "username": request.body.username,
          "fname": request.body.fname,
          "lname": request.body.lname,
          "password": request.body.password,
          "email": request.body.email
      }

      database.collection('users').save(user, function(err, res) {
          console.log("db");
          if(!err){
              response.send({
                  "status": 1,
                  "msg": res,
                  "user": {
                      "fullname": user.fname+ " " + user.lname,
                      "username": user.username
                  }
              })
          }else{
              response.send({status:0, msg:err})
          }
      });
  } else {
      response.send({status:0, msg:"Invalid data."})
  }


});

app.post('/api/login',function(request,response){
    if (request.body.username && request.body.password) {
        database.collection('users').find({
            "username":request.body.username,
            "password":request.body.password
        }).toArray(function(err,user){
            if (!err && user.length) {
                console.log(user,"login");
                response.send({
                    "status": 1,
                    "msg": "loggedin successfully.",
                    "user": {
                        "fullname": user[0].fname+ " " + user[0].lname,
                        "username": user[0].username
                    }
                });
            } else {
                response.send({status:0, msg:err})
            }
        });

    } else {
        response.send({status:0, msg:"data is required"})
    }
})

app.post('/api/check-username',function(request,response){
    if (request.body.username) {
        database.collection('users').find({
            "username":request.body.username
        }).toArray(function(err,user){
            console.log(user);
            if (!err && !user.length) {
                response.send({
                    "status": 1,
                    "msg": "name is uniqe"
                });
            } else {
                response.send({status:0, msg:"name is not uniqe."})
            }
        });

    } else {
        response.send({status:0, msg:"data is required"})
    }
})

// app.post('/api/online-users', function(request,response){
//   console.log(request.body);
//   response.send({status:1})
// })

app.get('*',function(request,response){
  response.send(404);
})

//socket

io.on('connection',function(client){

    client.on("getOnlineUsers", function() {
        client.emit("onlineUsers", onlineUsers);
    });

    client.on("login", function(user) {
        onlineUsers.push(user);
        client.emit("onlineUsers", onlineUsers);
        client.broadcast.emit("onlineUsers", onlineUsers);
    });

    client.on("message", function(msg) {
        database.collection('messages').save(msg, function(err, res){
            if (!err) {
                messagesArr.push(msg);
                client.emit("message", messagesArr);
                client.broadcast.emit("message", messagesArr);
            } else {
                client.emit("errMsg", "Your message wasn't sent!");
            }
        });
    });

    client.on("getAllmessages", function() {
        client.emit("message", messagesArr);
    });

});

//connecting to mongodb
var url='mongodb://127.0.0.1:27017/chatdb';
MongoClient.connect(url, function(err, db){
  database = db;
  if(!err){
    console.log("Connected to DB");
    database.collection('messages').find().toArray(function(err,msgs){
        messagesArr = msgs;
    });
    //listing
    server.listen(3000,function(){
      console.log("Server is running!");
    })

  }else{
    console.log("Couldn't connect to DB");
  }
  db.close();
})
