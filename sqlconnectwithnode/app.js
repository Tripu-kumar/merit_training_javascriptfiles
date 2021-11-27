var express = require("express");
var sql = require("mssql/msnodesqlv8");

var app = express(); 

app.use(express.urlencoded({extended:true}));
app.use(express.json());

const config ={
    database: 'tripu',
    server: 'localhost',
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true
    }
}
app.get('/users',(req,res) => {
    sql.connect(config,err =>{
        new sql.Request()
        .execute('list_contact',(err,data) => {
            res.send(data.recordset)
        })
    })
})
app.post('/reg',(req,res) => {
    sql.connect(config,err =>{
        new sql.Request()
        .input('',req.body.username)
        .input('password',req.body.password)
        .input('email',req.body.email)
        .input('phone',req.body.phone)
        .execute('CREATE_PROFILE_PROC',(err,data) => {
            if(err){
                res.send(err)
            }
            else{
                res.send('Record Inserted')
            }
        })
    })
})
app.listen(8080,function(){console.log("listening on 8080")})