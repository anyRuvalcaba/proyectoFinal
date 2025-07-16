import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
    user:{
        type: String,
        require: true,
    },
    address:{
        type: String,
        require: true,
    },
    city:{
        type: String,
        require: true,
    },
    state:{
        type: String,
        require: true,
    },
    postCode:{
        type: String,
        require: true,
        length: 5,
    },
});

const Address = mongoose.model('Address',addressSchema);

module.exports=Address;