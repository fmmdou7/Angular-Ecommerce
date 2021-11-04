const mongoose = require('mongoose');

const Product = mongoose.model('Product', {
    prodName: {
        type: String,
        required: true
    },
    prodDesc: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    prodImg: {
        type: String,
        required: true
    },
    prodCateg:{
        type:String,
        default:' None ',
        enum:['mobile','laptop','accessories','headphones']
        
    }
    
});

module.exports = Product;


