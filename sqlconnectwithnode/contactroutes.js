var express = require("express");
var router = express.Router();
const{MongoClient,ObjectId} = require('mongodb')
const url ='mongodb://localhost:27017/';
//insert contact
router.post("/insertcontact",function(req,res){
    MongoClient.connect(url,function(err,con){
        var db = con.db("irctc")
        db.collection('contact').insertOne(req.body,function(err,data){
            console.log(data)
            res.send(data)
        })
    })
})
router.get("/contactlist",function(req,res){
    MongoClient.connect(url,function(err,con){
        var db = con.db("irctc")
        db.collection('contact').find().toArray(function(err,data){
            console.log(data)
            res.send(data)
        })
    })
})
router.get("/viewcontact/:id",function(req,res){
    MongoClient.connect(url,function(err,con){
        var db = con.db("irctc")
        db.collection('contact').findOne({_id:ObjectId(req.params.id)},function(err,data){
            res.send(data)
        })
    })
})
router.get("/deletecontact/:id",function(req,res){
    MongoClient.connect(url,function(err,con){
        var db = con.db("irctc")
        db.collection('contact').deleteOne({_id:ObjectId(req.params.id)},function(err,data){
            res.send(data)
        })
    })
})
router.post("/updatecontact",function(req,res){
    MongoClient.connect(url,function(err,conn){
        console.log(req.body)
        var db = conn.db("irctc");
        db.collection("contact")
        .updateOne(
            {_id:ObjectId(req.body._id)},
            {
                
                $set:{
                   status : req.body.status
                }
            },
            function(err,data){
                console.log(data)
                res.send(data)
            }
        )
    })
})
module.exports = router