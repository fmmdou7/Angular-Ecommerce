const express = require('express');
const mongoose = require('mongoose');
const dbOrder = require('../models/order');
const orderRouter = express.Router();

orderRouter.post('/addOrder', async (req, res) => {
    var orderDate = new Date();
    const { orderQuntity, userId, prodId, orderStatus } = req.body;
    let order = {};
    order.orderQuntity = orderQuntity;
    order.userId = userId; //any id get it from front when ever the user's data retrived i can use the retrived id
    order.prodId = prodId;
    order.orderDate = orderDate;
    order.orderStatus = orderStatus;
    let orderModel = new dbOrder(order);
    await orderModel.save();
    res.json(orderModel);
})

// orderRouter.patch('/editOrder', async (req, res)=>{
//     try {
//         const {_id} = req.body;
//         const updates = req.body;
//         const order = await dbOrder.findByIdAndUpdate(_id,updates,{new:true});
//         if (order && order.status == 'pending') {
//             res.json(order);
//         } else {
//             res.status(404).json({ state: "Sorry! order can't be updated!" });
//         }
//     } catch (err) {

//     }
// })

orderRouter.delete('/deleteOrder', async (req, res) => {
    try {
        const { _id } = req.body;
        const order = await dbOrder.findOneAndRemove(_id)
        if (order && order.status == 'pending') {
            res.json({ state: "deleted" });
        } else {
            res.status(404).json({ state: "Sorry! you can't delete order." });
        }
    } catch (err) {
        res.status(400).json(err);
    }

})



module.exports = orderRouter;