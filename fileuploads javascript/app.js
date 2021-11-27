var express = require("express")
var app = express()
const{MongoClient,ObjectId} = require('mongodb')
const url ='mongodb://localhost:27017/';
app.set('view engine', 'pug');
app.set('views','./views');
app.use(express.urlencoded({extended:true}))
app.use(express.json())
var cookieParser = require('cookie-parser');
app.use(cookieParser());
var session = require('express-session');
app.use(session({secret: "Shh, its a secret!"}));
function authenticate(req,res,next){
    MongoClient.connect(url,function(err,con){
    var db = con.db("merit")
    db.collection('users').find({username:req.cookies.username}).toArray(function(err,data){
                       console.log(data)
                       if(data.length!== 0){
                       if(req.cookies.username == data[0].username){
                       if(req.cookies.pwd == data[0].pwd){next()}
                        }
                    
                    else{
                        res.redirect("/loginform")
                    } 
                }  
                else{
                    res.redirect("/loginform")
                }
    
        })
    })}
app.get("/",function(req,res){res.sendFile(__dirname+"/homepage.html")})
app.get("/registerform",function(req,res){res.sendFile(__dirname+"/register.html")})
app.post("/register",function(req,res){
    if(req.body.pwd !== req.body.cpwd)
    {
        res.sendFile(__dirname+"/passnotmatchform.html")
    }
    else{
        MongoClient.connect(url,function(err,con){
            var db = con.db("merit")
            db.collection('users').find({username:req.body.username}).toArray(function(err,data){
                if(data.length!== 0){
                    res.sendFile(__dirname+"/alreadyexistsuser.html")
                }
                else{ MongoClient.connect(url,function(err,con){
                    var db = con.db("merit")
                    db.collection('users').insertOne(req.body,function(err,data){
                        res.send(data)
                    })
                })}
            })
        })
    }
})
app.get("/loginform",function(req,res){res.sendFile(__dirname+"/login.html")})
app.post("/login",function(req,res){
    console.log(req.body)
    MongoClient.connect(url,function(err,con){
    var db = con.db("merit")
    db.collection('users').find({username:req.body.username}).toArray(function(err,data){
            if(data.length!== 0){
                if(req.body.pwd==data[0].pwd){
                    req.cookies.username = req.body.username
                    req.cookies.pwd = req.body.pwd
                    res.send("login successfull")}
                else{
                    res.sendFile(__dirname+"/loginpassnotmatch.html")
                } 
            }  
            else{
                res.sendFile(__dirname+"/usernotfoundform.html")
            }

        })
    })
})
app.get("/logout",function(req,res){
    MongoClient.connect(url,function(err,con){
        var db = con.db("merit")
        db.collection('users').find({username:req.cookies.username}).toArray(function(err,data){
                           console.log(data)
                           if(data.length!== 0){
                             if(req.cookies.username == data[0].username){
                                 if(req.cookies.pwd == data[0].pwd){
                                     res.clearCookie('username');
                                     res.clearCookie('pwd');
                                     res.send("logout successfully")}
                                }
                        
                            else{
                              res.redirect("/")} 
                            }  
                            else{
                               res.redirect("/") }
        
            })
        })
        
    })   
app.get("/products",authenticate,function(req,res){
   res.render("products",{user:req.cookies.username})  
})
app.get("/services",authenticate,function(req,res){
    //console.log(req.cookies)
    res.send("wait for services")
    
})
app.listen(9070,function(){console.log("listening on 9070")})