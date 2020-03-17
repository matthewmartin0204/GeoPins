const mongoose = require('mongoose')

const PinSchema = new mongoose.Schema({
    _id: ID,
    content: String,
    image: String,
    latitude: Number,
    longtitude: Number,
    author: { type: mongoose.Schema.ObjectId, ref: "User" },
    comments: [
        {
            text: String,
            createdAt: { type: Date, default: Date.now },
            author: { type: mongoose.Schema.ObjectId, ref: "User" }
        }
    ]
}, { timeStamps: true })

module.exports = mongoose.model("Pin", PinSchema)