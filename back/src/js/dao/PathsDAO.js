const MongoClient=require('mongodb');
const Paths = require('../pojo/Paths');
const config=require('../Config');

let client;
module.exports= class PathsDAO{
  async connect(){
    client=await MongoClient.connect(config.url, config.urlArg);
    let db=await client.db(config.database);
    let col=await db.collection(config.pathsCollection);
    return col;
  }

  async save(paths){
    let col=await this.connect();
    let inBase=await col.findOne({"_user":paths.user});
    let path=null;
    if(inBase==null){
      await col.insertOne(paths);
    }else{
      await col.updateOne(inBase, {$set : paths});
    }
    let tmp=await col.findOne(paths);
    path=new Paths(tmp._user, tmp._paths);
    client.close();
    return path;
  }

  async find(user){
    let col=await this.connect();
    let inBase=await col.findOne({"_user":user.id});
    let path=null;
    if(inBase!=null){
      path=new Paths(inBase._user, inBase._paths);
    }
    client.close();
    return path;
  }

}
