import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Aggregate.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    product: {
        type: mongoose.Aggregate.Schema.Types.ObjectId,
        ref: 'Product',
        require: true,
    },
    rating: {
        type: Number,
        require: true,
        min: 1,
        max: 5,
    },
    coment: {
        type: String,
        max: 500,
    },
});

const Review = mongoose.model('Review',reviewSchema);

module.exports=Review;