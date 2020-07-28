const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { authenticate} = require('../config/jwt.config');

const UserSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: [true, "This field is required."],
        minlength: [2, "Please enter a name of at least 2 characters."]
    },
    lastName:{
        type: String,
        required: [true, "This field is required."],
        minlength: [2, "Please enter a name of at least 2 characters."]
    },
    email:{
        type: String,
        unique: true,
        validate: [
            val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            'Please enter a valid email address.'
        ]
    },
    password: {
        type: String,
        minlength: [8, "Please enter a password of at least 8 characters."]
    }

}, {timestamps: true})

UserSchema.virtual('passwordConfirmation', {
    get: () => this._passwordConfirmation,
    set: val => this._passwordConfirmation = val
});

UserSchema.pre('validate', function(next){
    if(this.password != this.passwordConfirmation){
        this.invalidate('passwordConfrimation', "Please make sure that the passwords match.");
    }
    next()
});

UserSchema.pre('save', function(next){
    bcrypt.hash(this.password, 10)
        .then(hashPw => {
            this.pasword = hashPw;
            next();
    });
});

module.exports = mongoose.model('User', UserSchema)