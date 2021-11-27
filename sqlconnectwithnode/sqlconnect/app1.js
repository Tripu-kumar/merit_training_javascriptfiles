var express = require("express");
var sql = require("mssql/msnodesqlv8");

var app = express(); 

app.use(express.urlencoded({extended:true}));
app.use(express.json());

const config ={
    database: 'users',
    server: 'localhost',
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true
    }
}

// app.get('/users',(req,res) => {
//     sql.connect(config,err =>{
//         new sql.Request().query('select * from users_profile',(err,data) => {
//             console.log(data);
//             res.send(data.recordset)
//         })
//     })
// })

app.get('/users',(req,res) => {
    sql.connect(config,err =>{
        new sql.Request()
        .execute('ALL_USERS',(err,data) => {
            res.send(data.recordset)
        })
    })
})

app.post('/login',(req,res) => {
    sql.connect(config,err =>{
        new sql.Request()
        .input('email',req.body.email)
        .input('password',req.body.psw)
        .execute('LOGIN_CHECK_PROC',(err,data) => {
            res.send(data.recordset)
        })
    })
})

app.post('/reg',(req,res) => {
    sql.connect(config,err =>{
        new sql.Request()
        .input('username',req.body.username)
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

app.post('/forgot',(req,res) => {
    sql.connect(config,err =>{
        new sql.Request()
        .input('UserId',req.body.userid)
        .input('Password',req.body.psw)
        .execute('FORGOT_PSWD_PROC',(err,data) => {
            console.log(err);
            res.send("updated")
        })
    })
})
       

app.post('/delete',(req,res) => {
    sql.connect(config,err =>{
        new sql.Request()
        .input('UserId',req.body.userid)
        .execute('DELETE_USER_PROC',(err,data) => {
            res.send("Removed")
            // res.send(data.recordset)
        })
    })
})


app.listen(8080);