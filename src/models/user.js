import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

// schema 선언
const UserSchema = new Schema( {
  username: String,
  hashedPassword: String,
});

// method 생성
UserSchema.statics.findByUsername = function (username) {
  return this.findOne({ username });       // static method 에서 this 는 model (User) 를 가리킨다.
}

UserSchema.methods.setPassword = async function(password) {
  const hash = await bcrypt.hash(password, 10);
  this.hashedPassword = hash;
}
UserSchema.methods.checkPassword = async function(password) {
  const result = await bcrypt.compare(password, this.hashedPassword); // this 는 document 를 가리킨다.
  return result; // true / false
}
UserSchema.methods.serialize = function() {
  const data = this.toJSON();
  delete data.hashedPassword;   // data 반환하기 전 hashedPassword 삭제 
  return data;
}

// Model 생성
const User = mongoose.model('User', UserSchema);
export default User;