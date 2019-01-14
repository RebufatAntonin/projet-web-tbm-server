class User{
  constructor(pseudo, email, password){
    this._pseudo=pseudo;
    this._email=email;
    this._password=password;
  }

  set id(id) {
    this._id=id;
  }

  set pseudo(pseudo) {
    this._pseudo=pseudo;
  }

  set email(email) {
    this._email=email;
  }

  set password(password) {
    this._password=password;
  }

  get id() {
    return this._id;
  }

  get pseudo() {
    return this._pseudo;
  }

  get email() {
    return this._email;
  }

  get password() {
    return this._password;
  }

  toString() {
    return (this._id === undefined ? 'undefined' : this._id) + ' '+this._pseudo+' '+this._email+' '+this._password;
  }
}

module.exports = User;
