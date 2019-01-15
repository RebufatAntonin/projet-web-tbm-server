const MongoClient=require('mongodb');
const Stop = require('../pojo/Stop');
const config=require('../Config');

let client;
module.exports= class StopDAO{
  async connect(){
    client=await MongoClient.connect(config.url, config.urlArg);
    let db=await client.db(config.database);
    let col=await db.collection(config.stopCollection);
    return col;
  }

  async save(stop){
    let col=await this.connect();
    let inBase=await col.findOne({"_id":stop.id});
    let stop2=null;
    if(inBase==null){
      await col.insertOne(stop);
    }
    let tmp=await col.findOne({"_id":stop.id});
    stop2=new Stop(tmp._id, tmp._name, tmp._line, tmp._direction);
    client.close();
    return stop2;
  }

  async find(id){
    let col=await this.connect();
    let inBase=await col.findOne({"_id":id});
    let stop=null;
    if(inBase!=null){
      stop=new Stop(inBase._id, inBase._name, inBase._line, inBase._direction);
    }
    client.close();
    return stop;
  }

}
