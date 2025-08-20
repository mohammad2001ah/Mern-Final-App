const express = require('express');
const router = express.Router();
const{getAllUser,register,login}=require('../controller/userController');
// test api
router.get('/test', (req, res) => {
  res.send('API is working');
});
//get all user
router.get('/user',getAllUser);
//create user
router.post('/user', register);
//router login 
router.post('/user/login',login);






module.exports=router;