class Paths{
  constructor(user, pathArray){
    this._user=user;
    this._paths=pathArray;
  }

  set user(user){
    this._user=user;
  }

  get user(){
    return this._user;
  }

  get paths(){
    return this._paths;
  }

  addPath(path){
    let ind=-1;
    this._paths.forEach(function(item, i, array){
      console.log(item);
      item.forEach(function(p, j){
        console.log("p "+p+", path[j] "+path[j]+", j "+j);
        if(p===path[j] && j===item.length-1 && j===path.length-1){
          ind=i;
        }
      })
    });
    if(ind===-1){
      this._paths.push(path);
    }
  }

  removePath(path){
    let ind=-1;
    this._paths.forEach(function(item, i, array){
      item.forEach(function(p, j){
        if(p===path[j] && j===item.length-1 && j===path.length-1){
          ind=i;
        }
      })
    });
    if(ind!==-1){
      this._paths.splice(ind,1);
    }
  }

}

module.exports = Paths;
