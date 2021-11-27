var express = require("express");
var router = express.Router();
const{MongoClient,ObjectId} = require('mongodb')
const url ='mongodb://localhost:27017/';
//view train details
router.get("/viewtraindetails/:date/:source/:destination",function(req,res){
 
    MongoClient.connect(url,function(err,con){

        var db = con.db("irctc")

        db.collection("alltraindetails").findOne({arrivaldate:(req.params.date),source:(req.params.source),destination:(req.params.destination)},function(err,data){

            res.send(data)

        })

    })

})
//inserttraindetails
router.post("/inserttraindetails", function (req, res) {
    MongoClient.connect(url, function (err, conn) {
        var db = conn.db("irctc");
        db.collection("alltraindetails").insertOne(req.body, function (err, data) {
            res.send(data)
        })
    })
})

//viewtrainfareandseat details
router.get("/viewtrainfare/:tno/:date/:source/:destination/:class/:quota",function(req,res){
    console.log(req.params.tno)
    MongoClient.connect(url,function(err,con){
        var db = con.db("irctc")
        db.collection("alltraindetails").findOne({trainno:Number(req.params.tno),source:(req.params.source),destination:(req.params.destination),journeyclass:(req.params.class),quota:(req.params.quota),arrivaldate:(req.params.date)},function(err,data){
            res.send(data)
        })
    })
})

//view pnr status
router.get("/viewpnr/:pnrno",function(req,res){
    MongoClient.connect(url,function(err,con){
        var db = con.db("irctc")
        db.collection('pnr').findOne({pnrno:(req.params.pnrno)},function(err,data){
            res.send(data)
        })
    })
})
//insertpnr
router.post("/insertpnrstatus", function (req, res) {
    MongoClient.connect(url, function (err, conn) {
        var db = conn.db("irctc");
        db.collection("pnr").insertOne(req.body, function (err, data) {
            res.send(data)
        })
    })
})
module.exports = router