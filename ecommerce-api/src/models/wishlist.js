import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
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
                addedAt:{
                    type: Date,
                    default: Date.now,
                }
            }
        ],

});

const Wishlist = mongoose.model('Wishlist',wishlistSchema);

module.exports=Wishlist;