var express = require("express")
var app = express()
const{MongoClient,ObjectId} = require('mongodb')
const url ='mongodb://localhost:27017/';
app.set('view engine', 'pug');
app.set('views','./views');
var cors = require('cors')
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static(__dirname+"/uploads"))
var path = require("path");
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname+'/uploads')
    },
    filename: function (req, file, cb) {
        console.log("file in filename function::",file)
        var fileext = path.extname(file.originalname);
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + fileext)
    }
})
const upload = multer({ storage: storage })
app.get("/",function(req,res){
    MongoClient.connect(url,function(err,con){
        var db = con.db("merit")
        db.collection('contacts').find().toArray(function(err,data){
            //res.render("contact",{allcontacts:data})
            res.send(data)
        })
    })
})
app.get("/contactform",function(req,res){
    res.sendFile(__dirname+"/contactform.html")
})
app.post("/addcontact",upload.single("profilepic"),function(req,res){
    console.log("req.body",req.body);
    req.body.profilePic = req.file.filename;
    MongoClient.connect(url,function(err,con){
        var db = con.db("merit")
        db.collection('contacts').insertOne(req.body,function(err,data){
            console.log(data)
            res.redirect("/")
        })
    })
})
app.get("/deletecontact/:id",function(req,res){
    MongoClient.connect(url,function(err,con){
        var db = con.db("merit")
        db.collection('contacts').deleteOne({_id:ObjectId(req.params.id)})
        res.redirect("/")
    })
})
app.get("/updatecontactform/:id/:p/:f/:e/:m/:g",function(req,res){
    res.render("updatecontactform",{
        contactid:req.params.id, 
        profilePic:req.params.p,
        fullname:req.params.f,
        email:req.params.e,
        mobileno:req.params.m,
        groups:req.params.g

    })
})
app.post("/updatecontact",upload.single("profilepic"),function(req,res){
    MongoClient.connect(url,function(err,conn){
        console.log(req.body)
        req.body.profilePic = req.file.filename;
        var db = conn.db("merit");
        db.collection("contacts")
        .updateOne(
            {_id:ObjectId(req.body.id)},
            {
                $set:{
                    profilePic:req.body.profilePic,
                    fullname:req.body.fullname,
                    email:req.body.email,
                    mobileno:req.body.mobileno,
                    groups:req.body.groups
                },
            },
            function(err,data){
                console.log(data)
                res.redirect("/")
            }
        )
    })
})
app.listen(9050,function(){console.log("listening on 9050")})

