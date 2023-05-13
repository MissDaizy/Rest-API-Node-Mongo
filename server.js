// include this package in this file
const express = require('express');
// Execute express
const app = express();
const mongoose=require('mongoose');
const Product=require('./models/productModel');
require('dotenv/config') ;

app.use(express.json())

// ROUTES
app.get('/',(req,res)=>{
    res.send('We are on home');
})

app.get('/blog',(req,res)=>{
    res.send('We are on Blog');
});

app.get('/products',async(req,res)=>{
    try {
        const products=await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});

app.get('/products/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const product=await Product.findById(id);
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});

//Update a Product
app.put('/products/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const product = await Product.findByIdAndUpdate(id,req.body);
        // We cannot find any product in database
        if(!product){
            return res.status(404).json({message:`cannot find any product with ID ${id}`});
        }
        const updatedProduct=await Product.findById(id);
        res.status(200).json(updatedProduct);

    }catch(error){
        res.status(500).json({message:error.message});
    }
});



app.post('/product',async(req,res)=>{
    try {
        const product=await Product.create(req.body);
        console.log(req.body);

        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message});
    }
});

// // Import Routes
// const postsRoute = require('./routes/posts.js');
// Middlewares
//app.use('/posts',postsRoutes);

app.post('/product',(req,res)=>{
    res.send(req.body);
})
// Connect To DB
mongoose.set("strictQuery",false);
mongoose.connect(process.env.DB_CONNECTION)
.then(()=>{
    console.log('Connected to mongoDB');
    
// Start listening to the server
app.listen(3000,()=>{
    console.log('Node API app is running on port 3000');
});
}).catch((error)=>{
    console.log(error);
})


