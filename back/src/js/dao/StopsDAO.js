const MongoClient=require('mongodb');
const Stops = require('../pojo/Stops');
const config=require('../Config');

let client;
module.exports= class StopsDAO{
  async connect(){
    client=await MongoClient.connect(config.url, config.urlArg);
    let db=await client.db(config.database);
    let col=await db.collection(config.stopsCollection);
    return col;
  }

  async save(stops){
    let col=await this.connect();
    let inBase=await col.findOne({"_user":stops.user});
    let stop=null;
    if(inBase==null){
      await col.insertOne(stops);
    }else{
      await col.updateOne(inBase, {$set : stops});
    }
    let tmp=await col.findOne(stops);
    stop=new Stops(tmp._user, tmp._stops);
    client.close();
    return stop;
  }

  async find(user){
    let col=await this.connect();
    let inBase=await col.findOne({"_user":user.id});
    let stop=null;
    if(inBase!=null){
      stop=new Stops(inBase._user, inBase._stops);
    }
    client.close();
    return stop;
  }

}
