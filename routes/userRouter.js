const express = require('express');
const router = express.Router();
const User = require('../model/Users');
const bcrypt = require("bcrypt");

router.get('/', (req, res)=>{
    res.send('alo')
})
router.post('/api/auth/register', async(req, res)=>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;
        // res.send(req.body);
        const client = await User.create(req.body)
        res.status(200).json(client)
    }catch(err){
        res.status(500).json(err);
    }
});
router.get('/api/users', async(req, res)=>{
    const users = await User.find({})
    res.json(users)
});
router.post('/api/auth/login');
router.post('/api/auth/logout');
router.post('/api/auth/forget');
router.post('/api/auth/reset');

module.exports = router;
