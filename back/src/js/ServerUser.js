const express = require('express');
const router = express.Router();
const jwt    = require('jsonwebtoken');
const UserDAO=require('./dao/UserDAO');
const config=require('./Config');
const User=require('./pojo/User');

router.post('/register', async function(req, res){
  let usr=new User(req.body.pseudo, req.body.email, req.body.password);
  let ud=new UserDAO();
  let result=await ud.save(usr);
  if(result!=null){
    let playload = {
      id: result.id,
      pseudo: result.pseudo,
      email: result.email
    }
    let token=jwt.sign(playload, config.secret, {expiresIn: 86400});
    res.status(200).json({
					success: true,
          token: token,
          message: JSON.stringify(playload)
				});
  }else{
    res.status(401).json({ success: false, message: 'User already exist !' });
  }
});

router.post('/login', async function(req, res){
  let usr=new User(req.body.pseudo, req.body.email, req.body.password);
  usr.password=config.hash(usr.password);
  let ud=new UserDAO();
  let result=await ud.find(usr);
  if(result!=null){
    let playload = {
      id: result.id,
      pseudo: result.pseudo,
      email: result.email
    }
    let token=jwt.sign(playload, config.secret, {expiresIn: 86400});
    res.status(200).json({
					success: true,
          token: token,
          message: JSON.stringify(playload)
				});
  }else{
    res.status(401).json({ success: false, message: 'Authentification failed !' });
  }
});

module.exports = router;
