const { Schema, model } = require('mongoose')


const Login = new Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String,
        unique: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    password: {
        required: true,
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


module.exports = model("LoginSchema", Login)