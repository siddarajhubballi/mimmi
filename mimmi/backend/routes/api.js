const express = require('express');
const router = express.Router();
const user = require('../models/user');
const jwt = require('jsonwebtoken');
const app = express();

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const db = "mongodb+srv://Siddaraj:08310831@cluster0.mufccsc.mongodb.net/?retryWrites=true&w=majority";
// console.log("connecting to db...");
mongoose.connect(db, (err) => {
    if(err) {
        console.log('error! ' + err);
    }
    else {
        console.log('Connected to Mongodb');
    }
})

router.get('/', (req, res) => {
    res.send('From API route');
});

router.post('/register', (req, res) => {
    let userData = req.body;
    let user1 = new user(userData);
    user1.save((error, registeredUser) => {
        if(error) {
            console.log(error);
        }
        else {
            let payload = {subject: registeredUser._id}
            let token = jwt.sign(payload, 'secretKey');
            res.status(200).send({token});
        }
    });
})

router.post('/login', (req, res) => {
    let userData = req.body;
    user.findOne({username: userData.username}, (error, user1) => {
        if(error) {
            console.log(error);
        }
        else {
            if(!user1) {
               res.status(401).send('Invalid user')  ;   
            }
            else {
                if(user1.password !== userData.password) {
                    res.status(401).send('Invalid password');
                }
                else {
                    let payload = {subject:user._id}
                    let token = jwt.sign(payload, 'secretKey');
                    res.status(200).send({token});
                }
            }
        }
    })
    
})

module.exports = router;