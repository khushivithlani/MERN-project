const { stat } = require("fs");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncError = require('../middleware/catchAsyncError');
const ApiFeatures = require("../utils/apiFeatures");

//create product --admin
exports.createProduct = catchAsyncError(async (req, res, next) =>{
    req.body.user = req.user.id
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
});

//get all product
exports.getAllProducts =catchAsyncError(async(req , res) =>{
    const resultPerPage = 5;
    const productCount = await Product.countDocuments()
    const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);
    const products = await apiFeature.query;;

    res.status(200).json({
        success:true,
        products
    })
})

//get product detail
exports.getProductDetail = catchAsyncError(async(req, res, next) =>{
    
    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found", 404))
    }
    res.status(200).json({
        success:true,
        product,
        productCount
    })
})

//Update Product -- Admin
exports.updateProducts = catchAsyncError(async(req, res, next) =>{
    let product = await Product.findById(req.params.id);

    if(!product){
        return res.status(500).json({
            success:false,
            message: "Product not found"
        }
        )
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new:true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    })
})

//Delete product 
exports.deleteProduct = catchAsyncError(async(req, res ,next) =>{
    let product = await Product.findById(req.params.id);

    if(!product){
        return res.status(500).json({
            success:false,
            message: "Product not found"
        }
        )
    }
    await product.deleteOne();

    res.status(200).json({
        success:true,
        message: 'Product deleted successfully'
    })
})