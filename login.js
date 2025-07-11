const express = require('express');
const router = express.Router();

module.exports = () => {
    const router = new SignUpRouter();
    router.post('/signup', SignUpRouExpressRouterAdapterter.adapt(router))
};

class ExpressRouterAdapter {
    static adapt(router){
        return async (req, res) => {
            const httpRequest = {
                body: req.body
            }
            router.route(httpRequest);
        }
    }
}

// singup-router.js

class SignUpRouter {
    async route (httpRequest) {
        const { email, password, repeatPassword } = httpRequest.body;
        const user = new SignUpUseCase().signUp(email, password, repeatPassword)
        return {
            statusCore: 200,
            body: user
        };
        // return res.status(400).json({ error: 'password must be equal to repeatPassword' })
    }
}


// singup-usecase.js
class SignUpUseCase {
    async signUp(email, password, repeatPassword) {
        if (password === repeatPassword) {
            new AddAccountRepository().add(email, password);
        }
    }
}

// add-acount-repository.js
const mongoose = require('mongoose');
const AccountModel = mongoose.model('Account');

class AddAccountRepository {
    async add(email, password) {
        const user = await AccountModel.create({ email, password });
        return user;
    }
}