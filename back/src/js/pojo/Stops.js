class Stops{
  constructor(user, stopArray){
    this._user=user;
    this._stops=stopArray;
  }

  set user(user){
    this._user=user;
  }

  get user(){
    return this._user;
  }

  get stops(){
    return this._stops;
  }

  addStop(stop){
    let ind=this._stops.indexOf(stop);
    if(this._stops[ind]!==stop){
      this._stops.push(stop);
    }
  }

  removeStop(stop){
    let ind=this._stops.indexOf(stop);
    if(this._stops[ind]===stop){
      this._stops.splice(ind,1);
    }
  }

}

module.exports = Stops;
