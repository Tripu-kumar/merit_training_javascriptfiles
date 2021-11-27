var express = require("express");
const { request } = require("http");
var app = express()
const{MongoClient,ObjectId} = require('mongodb')
const url ='mongodb://localhost:27017/';
const cors =  require("cors")
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
var contactrouter=require("./contactroutes")
app.use('/contact',contactrouter)
var pnrrouter=require("./pnr.routes")
app.use('/pnr',pnrrouter)

app.listen(7000,function(){console.log("listening on 7060")})