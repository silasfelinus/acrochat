var express = require('express');
var app = express();
var server = app.listen(3450, () => {
 console.log('server is running on port', server.address().port);
});
app.use(express.static(__dirname));

var mongoose = require('mongoose');

var dbUrl = 'mongodb+srv://silasfelinus:Monlin3141@acrochat.puvgwcc.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(dbUrl , (err) => { 
    console.log('mongodb connected',err);
 })

 var Message = mongoose.model('Message',{ name : String, message : String})

var bodyParser = require(‘body-parser’)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

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
      res.sendStatus(200);
    })
  })