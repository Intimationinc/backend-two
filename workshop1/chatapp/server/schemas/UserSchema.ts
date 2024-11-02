import { Schema } from 'mongoose';

const UserSchema = new Schema({
  email: String,
  password: String,
  socketId: String,
  isOnline: {
    type: Boolean,
    default: false,
  },
});

export default UserSchema;
