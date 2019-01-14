const MongoClient=require('mongodb');
const User=require('../pojo/User');
const config=require('../Config');
let client;
module.exports= class UserDAO{
  async connect(){
    client=await MongoClient.connect(config.url, config.urlArg);
    let db=await client.db(config.database);
    let col=await db.collection(config.userCollection);
    return col;
  }


  async save(user){
    let col=await this.connect();
    let inBase=await col.findOne({"_pseudo":user.pseudo, "_email":user.email});
    let usr=null;
    if(inBase==null){
      user.password=config.hash(user.password);
      await col.insertOne(user);
      let tmp=await col.findOne(user);
      usr=new User(tmp._pseudo, tmp._email, tmp._password);
      usr.id=tmp._id;
    }
    client.close();
    return usr;
  }

  async find(user){
    let col=await this.connect();
    let inBase=await col.findOne({"_email":user.email, "_password":user.password});
    let usr=null;
    if(inBase!=null){
      usr=new User(inBase._pseudo, inBase._email, inBase._password);
      usr.id=inBase._id;
    }
    client.close();
    return usr;
  }

  async findWithId(user){
    let col=await this.connect();
    let inBase=await col.findOne({"_id":user.id, "_pseudo":user.pseudo, "_email":user.email});
    let usr=null;
    if(inBase!=null){
      usr=new User(inBase._pseudo, inBase._email, inBase._password);
      usr.id=inBase._id;
    }
    client.close();
    return usr;
  }
}
