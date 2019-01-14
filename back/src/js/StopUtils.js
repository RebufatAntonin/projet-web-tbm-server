const Stop=require('./pojo/Stop');
const StopDAO=require('./dao/StopDAO');

module.exports=class StopUtils{
  constructor(){
    this._stopDao=new StopDAO();
  }

  async saveStop(src){
    let stop=new Stop(parseInt(src.id), src.name, src.direction);
    await this._stopDao.save(stop);
  }

  async savePath(list){
    for (var s in list) {
      await this.saveStop(list[s]);
    }
  }

  async getStop(id){
    let stop=await this._stopDao.find(id);
    return stop;
  }

  async getStops(list){
    let tab=[];
    for(var s in list){
      let stop=await this.getStop(list[s]);
      tab.push(stop);
    }
    return tab;
  }

  async getPaths(list){
    let tab=[];
    for(var s in list){
      let stop=await this.getStops(list[s]);
      tab.push(stop);
    }
    return tab;
  }

}
