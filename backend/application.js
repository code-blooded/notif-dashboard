const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const port =  4001;
const bodyParser = require("body-parser");
const app = express();
const server = http.createServer(app);
const io = socketIo(server); 
var cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";


app.get('/getAllNotifications', (req,res)=>{
  MongoClient.connect(url, { useNewUrlParser: true },function(err, db) {
    if (err){ res.status(500); console.log('Mongo connection error');}
    else{
      let dbo = db.db("bank");
      //Find all documents in the notifications collection
      dbo.collection("notifications").find({}).toArray(function(err, result) {
        if (err){ res.status(500); console.log('unable to find mongo collection')}
        else{
          res.send(result).status(200);
        };
        db.close();
      });
    }
  });
});

app.get('/TransactionDetails', (req,res)=>{
  MongoClient.connect(url, { useNewUrlParser: true },function(err, db) {
    if (err){ res.status(500); console.log('Mongo connection error');}
    else{
    let dbo = db.db("bank");
    //Find particular document in the notifications collection:
    dbo.collection("notifications").findOne({notification_id: req.query.notification_id}, function(err, result) {
      if (err){ res.status(500); console.log('unable to find mongo collection')}
      else{
      res.send(result).status(200);
      };
      db.close();
    });
  }
  });
});

app.post('/displayTransaction', (req, res) => {
  io.emit("FromPredictionAPI", req.body); 
    io.on("connection", socket => {
      socket.removeAllListeners(); 
      console.log("Client connected..");
      socket.on("disconnect", () => console.log("Client disconnected"));
    });
    res.send({ response: "Transaction received..." }).status(200);
})

app.put('/updateTransaction', (req,res)=>{
  MongoClient.connect(url, { useNewUrlParser: true },  function(err, db) {
    if (err){ res.status(500); console.log('Mongo connection error');}
    else{
    let dbo = db.db("banking");
    //Find particular document in the transactions collection:
    dbo.collection("transactions").updateOne({transaction_id: req.body.id},{$set:{actualFraud : req.body.actualFraud}},function(err, result) {
      if (err){ res.status(500); console.log('unable to find mongo collection')}
      else{
      res.status(200);
      };
      db.close();
    });
  }
  });
});

 server.listen(port, () => console.log(`Listening on port ${port}`));
