const express = require('express');
const router = express.Router();
const jwt    = require('jsonwebtoken');
const StopsDAO=require('./dao/StopsDAO');
const Stops=require('./pojo/Stops');
const StopUtils=require('./StopUtils');
const config=require('./Config');

router.get("/", async function(req, res){
  let user=req.decoded;
  let sd=new StopsDAO();
  let result=await sd.find(user);
  if(result!=null){
    let stops=await new StopUtils().getStops(result.stops);
    res.status(200).json(stops);
  }else{
    res.status(404).json({success:false, message:'No stops found for this user !'});
  }
});

router.put("/", async function(req, res){
  let user=req.decoded;
  let id=req.body.stop.id;
  let su=new StopUtils();
  id=parseInt(id);
  let sd=new StopsDAO();
  let result=await sd.find(user);
  await su.saveStop(req.body.stop);
  if(result!=null){
    result.addStop(id);
    result=await sd.save(result);
    let stops=await su.getStops(result.stops);
    console.log(stops);
    res.status(200).json(stops);
  }else{
    result=new Stops(user.id, [id]);
    result=await sd.save(result);
    let stops=await su.getStops(result.stops);
    console.log(stops);
    res.status(200).json(stops);
  }
});

router.delete("/", async function(req, res){
  let user=req.decoded;
  let sd=new StopsDAO();
  let result=await sd.find(user);
  if(result!=null){
    let id=req.body.stop.id;
    id=parseInt(id);
    result.removeStop(id);
    result=await sd.save(result);
    let stops=await new StopUtils().getStops(result.stops);
    res.status(200).json(stops);
  }else{
    res.status(404).json({success:false, message:'No stops found for this user !'});
  }
});

module.exports = router;
