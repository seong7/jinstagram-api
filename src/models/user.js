import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// schema 선언
const UserSchema = new Schema( {
  userId: String,
  hashedPassword: String,
});

// method 생성
UserSchema.statics.findByUserId = function (userId) {
  return this.findOne({ userId });       // static method 에서 this 는 model (User) 를 가리킨다.
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
UserSchema.methods.generateToken = function() {
  // token 생성해주는 함수
  const token = jwt.sign(
    {
      _id: this.id,
      userId: this.userId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d',
    },
  );
  return token;
}

// Model 생성
const User = mongoose.model('User', UserSchema);
export default User;