const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;
console.log('SECRET:', SECRET);

const register = async (req, res) => {
    try {
        const user = new User(req.body);
        const newUser = await user.save();
        console.log('User Created:', newUser);
        const userToken = jwt.sign(
            {_id: newUser._id, email: newUser.email, firstName: newUser.firstName, lastName: newUser.lastName, age: newUser.age}, SECRET
        );
        console.log('JWT:', userToken);
        res.status(201)
        .cookie('userToken', userToken, {expires: new Date(Date.now() + 90000000000000)})
        .json({successMessage: 'user created', user: newUser});
    } catch (error) {
        console.log('Register Error:', error);
        res.status(400).json(error);
    }
};