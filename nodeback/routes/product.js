const express=require('express');
const mongoose=require('mongoose');
const dbProduct= require('../models/product');
const prodRouter= express.Router();

prodRouter.post('/addproduct',async(req,res)=>{
    const {prodName,prodDesc,price,prodImg,prodCateg,adminID}=req.body;
    let product={};
    product.prodName=prodName;
    product.prodDesc=prodDesc;
    product.price=price;
    product.prodImg=prodImg;
    product.prodCateg=prodCateg;
    product.adminID=adminID;
    let productModel=new dbProduct(product);
    await productModel.save();
    res.json(productModel);
})


prodRouter.get('/allproducts',async (req,res)=>{
   
        const allproducts = await dbProduct.find({});
        res.json(allproducts);
    
   
})

prodRouter.delete('/deleteproduct', async (req,res)=>{
    try{
        const {_id} = req.body;
        const product = await dbProduct.findOneAndRemove(_id);
        console.log(product);
        if(product)
        {
            res.json({state:"deleted"});
        }else{
            res.status(404).json({state:"not found"});
        }
    }catch(err){
        res.status(400).json(err);
    }
   
})

prodRouter.post('/search',async (req,res)=>{
    try{
        const {prodName} = req.body;
        const searchProd = await dbProduct.find({prodName:prodName});
        if(searchProd){
            res.json(searchProd);
        }else{
            res.json({search:"not found"});
        }

    }catch(err){
        res.status(404).json({err:"error accured"})
    }


})

prodRouter.get('/productCategory',async (req,res)=>{
    try{
        const {prodCateg} = req.body;
        const categogry = await dbProduct.find({prodCateg:prodCateg});
        if(prodCateg){
            res.json(categogry);
        }else{
            res.json({search:"not found"});
        }

    }catch(err){
        res.status(404).json({err:"error accured"})
    }

})
module.exports=prodRouter;