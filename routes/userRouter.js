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
router.post('/api/auth/login', async(req, res)=>{
    const {email, password} = req.body
    if(!(email && password)){
        return res.status(400).json({message: 'Please provide email and password'});
    }
    const user = await User.findOne({email});
    if (!(user && (await bcrypt.compare(password, user.password)))) {
      return res.status(404).json({ message: "Invalid credentials" });
    }
    res.json(`you are logged in as a ${user.role}`)
})
router.post('/api/auth/logout');
router.post('/api/auth/forget');
router.post('/api/auth/reset');

module.exports = router;
