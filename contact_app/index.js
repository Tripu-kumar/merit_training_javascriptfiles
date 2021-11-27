var express = require("express");
var cors = require("cors")
var app = express();
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

const { MongoClient, ObjectId } = require('mongodb');
var url = "mongodb://localhost:27017/";

app.get("/", (req, res) => {
    res.send("successfull")
})

//insertone 
app.post("/insertstudents", (req, res) => {
    MongoClient.connect(url, function (err, conn) {
        var db = conn.db("meritdata");
        db.collection("student").insertOne(req.body, function (err, data) {
            res.send(data)
        })
    })
})

//update 
app.post("/updateuser/:id", (req, res) => {
    MongoClient.connect(url, function (err, conn) {
        var db = conn.db("meritdata");
        db.collection("student").updateOne(
            { _id: ObjectId(req.params.id) },
            {
                $set: {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    dob: req.body.dob,
                    age: req.body.age,
                    address: req.body.address,
                    state: req.body.state,
                    gender: req.body.gender
                }
            }, (err, data) => {
                res.send(data)
            })

    })
})

//delete 
app.get("/deletestudent/:id", (req, res) => {
    MongoClient.connect(url, function (err, conn) {
        var db = conn.db("meritdata");
        db.collection("student").findOneAndDelete({ _id: ObjectId(req.params.id) }, (err, data) => {
            res.send(data)
        })

    })
})
app.get("/viewallstudents", (req, res) => {

    MongoClient.connect(url, function (err, conn) {

        var db = conn.db("meritdata")

        db.collection('student').find().toArray((err, data) => {



            res.send(data)



        })

    })

})
app.get("/view/:id", function (req, res) {

    MongoClient.connect(url, function (err, con) {

        var db = con.db("meritdata")

        db.collection('student').findOne({ _id: ObjectId(req.params.id) }, function (err, data) {

            res.send(data)

        })

    })

})

app.listen(9090, () => { console.log("9090"); })