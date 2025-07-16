import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
        min: 1,
    },
    stock: {
        type: Number,
        require: true,
        min: 0,
    },
    imageURL: [{
        type: String,
        default: 'http://placehold.co/800x600.png',
    }],
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        require: true,
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;