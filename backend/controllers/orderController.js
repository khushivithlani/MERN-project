const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncError = require('../middleware/catchAsyncError');
const Order = require('../models/orderModel')

//create new order 
exports.newOrder = catchAsyncError(async (req, res, next) => {
    const {shippingInfo, orderItem, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice} = req.body;

    const order = await Order.create({
        shippingInfo, 
        orderItem, 
        paymentInfo, 
        itemsPrice, 
        taxPrice, 
        shippingPrice, 
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
    });

    res.status(201).json({
        success: true,
        order

    })
})

//get single order
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if(!order){
        return next(new ErrorHandler("order not found with this Id", 404));
    }

    res.status(200).json({
        success:true,
        order
    })
})