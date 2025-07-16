import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    displayName: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Por favor ingresa un email válido'
        ]
    },
    hashPassword: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        require: true,
        enum: ['admin', 'customer', 'guest'],
    },
    avatar: {
        type: String,
        require: true,
        default: 'http://placehold.co/200x200.png',
    },
    phone: {
        type: String,
        require: true,
        max: 10,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;