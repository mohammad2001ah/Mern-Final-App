const express = require('express');
const router = express.Router();
const{register}=require('../controller/userController');

//create user
router.post('/user', register);

router.get('/test', (req, res) => {
  res.send('API is working');
});




module.exports=router;