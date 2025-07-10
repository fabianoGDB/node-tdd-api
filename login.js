const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const AccountModel = mongoose.model('Account');

module.exports = () => {
    router.post('/signup', new SignUpRouter().route)
};

class SignUpRouter {
    async route (req, res) {
        const { email, password, repeatPassword } = req.body;
        new SignUpUseCase().signUp(email, password, repeatPassword)
        return res.status(400).json({ error: 'password must be equal to repeatPassword' })
    }
}

class SignUpUseCase {
    async signUp(email, password, repeatPassword) {
        if (password === repeatPassword) {
            const user = await AccountModel.create({ email, password });
            return user;
        }
    }
}