import { Schema } from 'mongoose';

const MessageSchema = new Schema({
  sender: String,
  content: String,
  type: {
    type: String,
    enum: ['public', 'private'],
    default: 'public',
  },
  isAuthenticated: {
    type: Boolean,
    default: false,
  },
  receiver: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default MessageSchema;
