const express = require('express');
const flash = require('express-flash');
const path = require('path');
const cors = require('cors')
const session = require('express-session');
require('ejs');
const bodyPaser = require('body-parser');
const {database} = require('./config/database.js');
const {PORT} = require('./config/port.js')
const adminroute = require('./Routes/adminroute.js');


const app = express();
database();
app.use(bodyPaser.urlencoded({extended:true}));
app.use(bodyPaser.json());
app.use(cors())
app.use(session({
    resave:true,
    secret:'adminLogin-key',
    saveUninitialized:true
}))
app.set("view engine","ejs");
app.set('views',path.join('../backend/View'));
app.use(flash());
app.use((req,res,next)=>{
    res.locals.success = req.flash('success');
    res.locals.errors = req.flash('error');
    next();
})
app.use('/',adminroute);
app.listen(PORT,()=>{
    console.log("App started...");
})
