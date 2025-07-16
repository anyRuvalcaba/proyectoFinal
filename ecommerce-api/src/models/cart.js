import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        require: true,
    },
    products: [
        {
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref:'Product',
                require: true,
            },
            quantity: {
                type: Number,
                require: true,
                min: 1,
            },
        }
    ],
});

const Cart = mongoose.model('Cart',cartSchema);

module.exports=Cart;