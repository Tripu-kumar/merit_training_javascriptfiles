var express = require("express");
var app = express();
const { MongoClient, ObjectId } = require('mongodb');
var url = "mongodb://localhost:27017/";

var path = require("path");
const client = new MongoClient(url);
client.connect();

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.get("/viewall", function (req, res) {
    MongoClient.connect(url, function (err, conn) {
        var db = conn.db("irctc");
        db.collection("payment").find().toArray(function (err, data) {
            console.log(data);
            res.send(data)
        })
    })
})

app.post("/insert", function (req, res) {
    MongoClient.connect(url, function (err, conn) {
        var db = conn.db("irctc");
        db.collection("payment").insertOne(req.body, function (err, data) {
            res.send(data)
        })
    })
})

app.post("/updDet", function (req, res) {
    MongoClient.connect(url, function (err, conn) {
        var db = conn.db("irctc");
        db.collection("payment")
            .updateOne(
                { _id: ObjectId(req.body._id) },
                {
                    $set: {
                        mode: req.body.mode,
                        amount: req.body.amount,
                        status: req.body.status,
                    }
                },
                function (err, data) {
                    console.log(data)
                    res.send(data)
                }
            )
    })
})

app.get("/view/:id",function(req,res){
    MongoClient.connect(url,function(err,con){
        var db = con.db("irctc")
        db.collection('payment').findOne({_id:ObjectId(req.params.id)},function(err,data){
            res.send(data)
        })
    })
})

app.listen(9090, function () { console.log("App runnning on 9090") })

