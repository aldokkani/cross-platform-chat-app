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
var privateMessagesArr = [];
//middlewares
app.use(bodyParser.json())

app.all('*',function(req,res,next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validateNewUser(user) {
    var dataExists = user.username && user.email && user.password && user.firstname && user.lastname;
    var dataIsValid = validateEmail(user.email) && (user.password.length > 5) && (user.username.length > 3);
    return dataExists && dataIsValid;
}

//routing
app.post('/api/signup',function(request,response){
  if (validateNewUser(request.body)) {
      var user = {
          "username": request.body.username,
          "firstname": request.body.firstname,
          "lastname": request.body.lastname,
          "password": request.body.password,
          "email": request.body.email
      }

      database.collection('users').save(user, function(err, res) {
          if(!err){
              response.send({
                  "status": 1,
                  "msg": res,
                  "user": {
                      "fullname": user.firstname+ " " + user.lastname,
                      "username": user.username
                  }
              })
          }else{
              response.send({status:0, msg:"there is error"})
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
                response.send({
                    "status": 1,
                    "msg": "loggedin successfully.",
                    "user": {
                        "fullname": user[0].firstname+ " " + user[0].lastname,
                        "username": user[0].username
                    }
                });
            } else {
                response.send({status:0, msg:"there is error in mongo", err:err})
            }
        });

    } else {
        response.send({status:0, msg:"data is required"})
    }
})

app.post('/api/checkusername',function(request,response){
    if (request.body.username) {
        database.collection('users').find({
            "username":request.body.username
        }).toArray(function(err,user){
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
    console.log(onlineUsers);
    client.on("getOnlineUsers", function() {
        client.emit("onlineUsers", onlineUsers);
    });

    client.on("login", function(user) {

        if (onlineUsers.indexOf(user) == -1) {
            onlineUsers.push(user);
            client.emit("onlineUsers", onlineUsers);
            client.broadcast.emit("onlineUsers", onlineUsers);
        }
        
    });

    client.on('logout', function (user) {
        var index = onlineUsers.indexOf(user)
        if (index > -1) {
            onlineUsers.splice(index, 1);
            client.emit("onlineUsers", onlineUsers);
            client.broadcast.emit("onlineUsers", onlineUsers);
        }
    });

    client.on("message", function(msg) {
        database.collection('messages').save(msg, function(err, res){
            if (!err) {
                messagesArr.push(msg);
                client.emit("message", messagesArr);
                client.broadcast.emit("message", messagesArr);
                console.log(msg);

            } else {
                client.emit("errMsg", "Your message wasn't sent!");
            }
        });
    });

    client.on("getAllmessages", function() {
        client.emit("message", messagesArr);
    });
    
    client.on("getAllPrivateMsgs", function(arr) {
      database.collection('users').find({"username" : arr["user1"]}).toArray(function(err,msgs){
        user2 = arr["user2"]
        messagesArr = msgs.user2;
      });
       client.emit("privateMessage", privateMessagesArr);
      });
    client.on("privateMessage", function(msg) {
      console.log("private message received: "  , msg)
      database.collection('users').find({'username' : msg["user1"]}).toArray(function(err,msgs){
          privateMessagesArr = msgs;
          console.log("user caught" ,privateMessagesArr)
          console.log (err)
      });
      var msgUser1 = msg["user1"]
      var msgUser2 = msg["user2"]
      if (privateMessagesArr.msgUser2){
        privateMessagesArr.msgUser2.push({ msgUser1: msg["message"]})
      }
      else {
        privateMessagesArr.msgUser2 = {  msgUser2: msg["message"]}
      }
      database.collection('users').update({'username' : msgUser1}, { msgUser1 : privateMessagesArr  }, function(err, res){
          if (!err) {
              client.emit("privateMessage", privateMessagesArr);
              console.log("private message arr" , privateMessagesArr);

          } else {
              client.emit("errMsg", "Your message wasn't sent!");
          }
      });
      database.collection('users').find({'username' : msg["user2"]}).toArray(function(err,msgs){
          privateMessagesArr = msgs;
      });
      if (privateMessagesArr.msgUser1){
        privateMessagesArr.msgUser1.push({msgUser1: msg["message"]})
      }
      else {
        privateMessagesArr.msgUser1 = { msgUser1: msg["message"]}
      }
      database.collection('users').update({'username' : msg["user2"]}, { msgUser1: privateMessagesArr  })
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
  // db.close();
})
