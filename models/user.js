const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 4)
        .then((hashedPassword) => {
            console.log('hashed', hashedPassword);
            this.password = hashedPassword;
            next()
        })
        .catch((error) => {
            console.log(error);
        })
});

module.exports = mongoose.model('users', userSchema);