const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dbUser = require('../models/user');
const authenticationMiddleware = require('../middlewares/authentication');
const tokenHelper = require('../helpers/tokenhelper');
const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
    try {
        const users = await dbUser.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json(err);
    }
})

userRouter.post('/signup', async (req, res) => {
    try {
        
        const { username, email, age, password, userType,gender } = req.body;
        let user = {};
        user.username = username;
        user.userType = userType;
        user.email = email;
        user.age = age;
        user.password = password;
        user.userType=userType;
        user.gender = gender;
        const salt = await bcrypt.genSalt(7);
        const hashedPassword = await bcrypt.hash(password, salt);
        const dbuser = new dbUser({ ...user, password: hashedPassword });
        dbUser.findOne({ email: user.email })
            .then(async user => {
                if (user) {
                    res.json({ error: 'User already exists' })
                }
                else {
                    const savedUser = await dbuser.save();
                    res.json(savedUser);
                }
            })
            .catch(err => {
                res.send('error: ' + err)
            })
    }
    catch (err) {
        res.status(400).json(err);
    }
});


userRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const currentUser = await dbUser.findOne({ email: email });
        const isMatch = await bcrypt.compare(password, currentUser.password);
        if (isMatch) {
            const token= await tokenHelper.sign(currentUser._id);
            res.json({token:token ,user:currentUser});
        } else {
            res.status(405).json({ logging: "wrong pass or username" })
        }

    } catch (err) {
        res.status(400).json({ logging: "wrong pass or username" });

    }
})
 userRouter.use(authenticationMiddleware);

module.exports = userRouter;
