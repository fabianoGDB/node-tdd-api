
module.exports = () => {
    router.post('/signup', new SignUpRouter().route)
};

// singup-router.js
const express = require('express');
const router = express.Router();

class SignUpRouter {
    async route (req, res) {
        const { email, password, repeatPassword } = req.body;
        new SignUpUseCase().signUp(email, password, repeatPassword)
        return res.status(400).json({ error: 'password must be equal to repeatPassword' })
    }
}


// singup-usecase.js
const mongoose = require('mongoose');
const AccountModel = mongoose.model('Account');

class SignUpUseCase {
    async signUp(email, password, repeatPassword) {
        if (password === repeatPassword) {
            const user = await AccountModel.create({ email, password });
            return user;
        }
    }
}