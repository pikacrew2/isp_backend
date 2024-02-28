const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require("cors")
require('dotenv').config();
const userRouter = require("./routes/user.route");
const transRouter = require("./routes/transaction.route")
const app = express();
app.use(express.json());
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect(process.env.MONGODB).then(()=>{
    console.log('database connected successfully')
}).catch((error)=>{
    console.log(error)
})

app.use('/', userRouter);
app.use('/', transRouter);
 

app.listen(5000, ()=>{
    console.log(`congrats server running at ${5000}`)
})