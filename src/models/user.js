import mongoose, { Schema } from 'mongoose';

// schema 선언
const UserSchema = new Schema( {
  username: String,
  hashedPassword: String,
});

// method 생성

// Model 생성
const User = mongoose.model('User', UserSchema);
export default User;