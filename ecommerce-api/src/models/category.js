import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
        trim: true,
    },
    description:{
        type: String,
        require: true,
        trim: true,
    },
    imageURL:{
        type: String,
        require: true,
        default: 'http://placehold.co/800x600.png',
    },
    parentCategory:{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        default: null,
    }
});

const Category = mongoose.model('Category',categorySchema);

module.exports=Category;