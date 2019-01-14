const express = require('express');
const router = express.Router();
const jwt    = require('jsonwebtoken');
const PathsDAO=require('./dao/PathsDAO');
const Paths=require('./pojo/Paths');
const StopUtils=require('./StopUtils');
const config=require('./Config');

router.get("/", async function(req, res){
  let user=req.decoded;
  let sd=new PathsDAO();
  let result=await sd.find(user);
  if(result!=null){
    let paths=await new StopUtils().getPaths(result.paths);
    res.status(200).json(paths);
  }else{
    res.status(404).json({success:false, message:'No paths found for this user !'});
  }
});

router.put("/", async function(req, res){
  let user=req.decoded;
  let path=req.body.path;
  let sd=new PathsDAO();
  let su=new StopUtils();
  let pathId=[];
  for(var p in path){
    pathId.push(path[p].id);
  }
  await su.savePath(path);
  let result=await sd.find(user);
  if(result!=null){
    result.addPath(pathId);
    result=await sd.save(result);
    let paths=await su.getPaths(result.paths);
    res.status(200).json(paths);
  }else{
    result=new Paths(user.id, [pathId]);
    result=await sd.save(result);
    let paths=await su.getPaths(result.paths);
    res.status(200).json(paths);
  }
});

router.delete("/", async function(req, res){
  let user=req.decoded;
  let sd=new PathsDAO();
  let pathId=[];
  let result=await sd.find(user);
  if(result!=null){
    let path=req.body.path;
    for(var p in path){
      pathId.push(path[p].id);
    }
    result.removePath(pathId);
    result=await sd.save(result);
    let paths=await new StopUtils().getPaths(result.paths);
    res.status(200).json(paths);
  }else{
    res.status(404).json({success:false, message:'No paths found for this user !'});
  }
});

module.exports = router;
