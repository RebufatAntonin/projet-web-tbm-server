class Stop{

  constructor(id, name, direction){
    this._id=id;
    this._name=name;
    this._direction=direction;
  }

  set id(id){
    this._id=id;
  }

  set name(name){
    this._name=name;
  }

  set direction(direction){
    this._direction=direction;
  }

  get id(){
    return this._id;
  }

  get name(){
    return this._name;
  }

  get direction(){
    return this._direction;
  }

}

module.exports=Stop;
