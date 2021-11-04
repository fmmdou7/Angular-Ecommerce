const mongoose = require('mongoose');

const Order = mongoose.model('Order', {
    orderQuntity: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    prodId: {
        type: String,
        default: true
    },
    orderDate: {
        type: String,
        require: true
    },
    orderStatus: {
        type: String,
        default: 'pending',
        enum: ['rejected', 'accepted', 'pending']
    }
});

module.exports = Order;


