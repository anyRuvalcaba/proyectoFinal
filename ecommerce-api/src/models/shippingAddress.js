import mongoose from 'mongoose';

const shippingAddressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    name: {
        type: String,
        require: true,
        trim: true,
    },
    address: {
        type: String,
        require: true,
        trim: true,
    },
    city: {
        type: String,
        require: true,
        trim: true,
    },
    state: {
        type: String,
        require: true,
        trim: true,
    },
    postalCode: {
        type: String,
        require: true,
        lenght: 5,
        trim: true,
    },
    country: {
        type: String,
        require: true,
        default: 'México',
        trim: true,
    },
    phone: {
        type: String,
        require: true,
        trim: true,
    },
    isDefault: {
        type: Boolean,
        default: false,
    },
    addressType: {
        type: String,
        enum: ['home', 'work', 'other'],
        default: 'home',
    },
});

const ShippingAddress = mongoose.model('ShippingAddress', shippingAddressSchema);

module.exports = ShippingAddress;