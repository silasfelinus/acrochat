var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var server = app.listen(3450, () => {
 console.log('server is running on port', server.address().port);
});



var dbUrl = 'mongodb://silasfelinus:Monlin3141@acrochat.puvgwcc.mongodb.net/livechat';

mongoose.connect(dbUrl , (err) => { 
    console.log('mongodb connected',err);
 })

 var Message = mongoose.model('Message',{ name : String, message : String})




app.get('/messages', (req, res) => {
    Message.find({},(err, messages)=> {
      res.send(messages);
    })
  })

  app.post('/messages', (req, res) => {
    var message = new Message(req.body);
    message.save((err) =>{
      if(err)
        sendStatus(500);
      io.emit('message', req.body);
      res.sendStatus(200);
    })
  })


  io.on('connection', () =>{
    console.log('a user is connected')
   })