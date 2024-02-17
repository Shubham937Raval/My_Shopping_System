const express = require('express');
const flash = require('express-flash');
const path = require('path');
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
app.use(session({
    resave:true,
    secret:'adminLogin-key',
    saveUninitialized:true
}))
app.set("view engine","ejs");
app.set('views',path.join('../backend/View'));
app.use(flash());
app.use('/',adminroute);
app.listen(PORT,()=>{
    console.log(`Server has started on port:-${PORT}...`);
    console.log(`Link:-http://localhost:${PORT}`)

})
