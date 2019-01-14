const express = require('express');
const bodyParser = require('body-parser');
const morgan=require('morgan');
const jwt    = require('jsonwebtoken');
const cors=require('cors');
const config=require('./Config');
const app=express();
app.listen(3000);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/user', require('./ServerUser'));

app.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        return res.status(403).json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });

  }
});

app.use('/user/:id/stops', require('./ServerStops'));
app.use('/user/:id/paths', require('./ServerPaths'));
