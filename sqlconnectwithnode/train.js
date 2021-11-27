var express=require("express");
var app=express();

app.use(express.urlencoded({extended:true}))
app.use(express.json());

const {MongoClient,ObjectId} =require('mongodb');
const url='mongodb://localhost:27017';
var path = require("path");

app.post("/addtraindetails",function(req,res){
   MongoClient.connect(url,function(err,conn){
        var db = conn.db("irctc");
        db.collection("traindetails").insertOne(req.body,function(err,data){
        
            res.send(data)
           
        })
    })
})

app.get("/deletetraindetails/:id",function(req,res){
    MongoClient.connect(url,function(err,conn){
        var db=conn.db("irctc");
        db.collection("traindetails").deleteOne({_id:ObjectId(req.params.id)},function(err,data){
            res.send(data)   
  
      })
        
    })
})


app.post("/updatetraindetails",function(req,res){
    MongoClient.connect(url,function(err,conn){
       console.log(req.body)
        var db = conn.db("irctc");
        db.collection("traindetails")
        .updateOne(
            {_id:ObjectId(req.body._id)},
            {
                $set:
                {
                    trainname:req.body.trainname,
                    orginid:req.body.orginid,
                    destinationid:req.body.destinationid,
                    arrivaldate:req.body.arrivaldate,
                    departuredate:req.body.departuredate,
                    journeyclass:req.body.journeyclass
                }
            },
            function(err,data){
              
                res.send(data)
            }
        )
    })
})

app.get("/viewtraindetails/:id",function(req,res){

    MongoClient.connect(url,function(err,con){

        var db = con.db("irctc")

        db.collection("traindetails").findOne({_id:ObjectId(req.params.id)},function(err,data){

            res.send(data)

        })

    })

})

app.get("/viewtraindetails",function(req,res){
    MongoClient.connect(url,(err,con)=>{
             var db = con.db("irctc")
             db.collection("traindetails").find().toArray((err,data)=>{
                 
                 res.send(data)
             })
             })
 })
 

app.listen(9090,function(){console.log("port is 9090")})