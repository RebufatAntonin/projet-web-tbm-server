
var CryptoJS = require("crypto-js");

function hash(msg){
  return CryptoJS.SHA512("projet"+msg+"web").toString(CryptoJS.enc.Hex);
}

module.exports ={
  url: 'mongodb://projet:trucbidon33@ds056549.mlab.com:56549/projet-web-tbm',
  urlArg: { useNewUrlParser: true },
  database: 'projet-web-tbm',
  userCollection: 'users',
  stopsCollection: 'stops',
  stopCollection: 'stop',
  pathsCollection: 'paths',
  secret: 'oiah4GFSBNXUohd562729jhdceedbiPDSZJZOKJ4gre64rtgejhyrTRHRTgt484erERGRjkztqr',
  hash: hash
};
