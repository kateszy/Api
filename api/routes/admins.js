const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Admin = require('../models/admin');

router.get('/', (req, res, next) => {

    Admin.find({})
    .exec()
    .then(doc => {
        res.status(201).json({
            message: doc
        });
    })
    .catch(er => {
        res.status(500).json({
            error: er
        })
    });

});

router.post('/signup', (req, res, next) => {

    Admin.find({email: req.body.email})
    .exec()
    .then(user => {
        if(user.length > 0){
            return res.status(500).json({
                message: 'Już zarejestrowany użytkownik. Spróbuj innego adresu email...'
            });
        }else{
            bcrypt.hash(req.body.password, 10, function(err, hash) {
                if(err){
                    return res.status(500).json({
                        error: err
                    });
                }else{
                    const admin = new Admin({
                        _id: new mongoose.Types.ObjectId(),
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: hash,
                        createdAt: new Date().toISOString()
                    });
                
                    admin.save()
                    .then(doc => {
                        res.status(201).json({
                            message: 'Administrator zarejestrowany!'
                        });
                    })
                    .catch(er => {
                        res.status(500).json({
                            error: er
                        });
                    });
                }
            });
        }
    })
});

router.post('/login', (req, res, next) => {

    Admin.find({email: req.body.email})
    .exec()
    .then(user => {
        if(user.length <= 0){
            return res.status(500).json({
                message: 'Coś poszło nie tak ...'
            });
        }else{
            // Load hash from your password DB.
            //const user = user[0];
            bcrypt.compare(req.body.password, user[0].password, function(err, result) {
                console.log('err', err);
                console.log('result', result);
                
                if(err){
                    return res.status(500).json({
                        error: 'Logowanie nieudane.'
                    });
                }else{
                    if(result){
                        // Create token
                        const payload = {
                            userId: user[0]._id,
                            iat:  Math.floor(Date.now() / 1000) - 30,
                            exp: Math.floor(Date.now() / 1000) + (60 * 60),
                        }
                        jwt.sign(payload, 'mysecretkey', function(err, token) {
                            if(err){
                                return res.status(200).json({
                                    error: 'err'
                                });
                            }else{
                                res.status(200).json({
                                    message: 'Zalogowano!',
                                    token: token
                                });
                            } 
                        }); 
                    }else{
                        res.status(200).json({
                            message: 'Logowanie nieudane.'
                        })
                    }
                }   
            });
        }
    })
    .catch(er => {
        res.status(500).json({
            error: er
        });
    });
});

module.exports = router;