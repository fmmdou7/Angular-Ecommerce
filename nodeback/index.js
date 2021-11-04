
const express=require('express');
const app=express();
const userRoutes =require('./routes/user');
const productRoutes =require('./routes/product');
const bodyParser = require('body-parser');
require('./db')
const hostname='127.0.0.1';
const port=process.env.port||3000
// app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json({extended:false}))
app.use('/user',userRoutes);
app.use('/product',productRoutes);
app.use('/order',require('./routes/order'));
// app.use('/admin',require('./routes/admin'));


app.listen(port,hostname,()=>{
    console.log(`server running at http://${hostname}:${port}/`)
})