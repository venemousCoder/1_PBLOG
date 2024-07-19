const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    content: {
        type: String,
        required: true
    },
    tags: [{ type: String, required: true }],
}, { timestamps: true});

module.exports = mongoose.model('articles', articleSchema);