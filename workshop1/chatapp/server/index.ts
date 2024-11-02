import express, {
  type Express,
  type NextFunction,
  type Request,
  type Response,
} from 'express';
import { createServer } from 'http';
import mongoose, { model } from 'mongoose';
import { Server, Socket } from 'socket.io';
import * as dotenv from 'dotenv';
import MessageSchema from './schemas/MessageSchema';
import UserSchema from './schemas/UserSchema';
import cors from 'cors';
dotenv.config({ path: __dirname + '/.env' });

interface User {
  email: string;
  password: string;
}

interface Message {
  user: string;
  content: string;
  timeStamp: Date;
  type: 'public' | 'private';
}

interface PrivateMessage extends Message {
  roomId: string;
  from: string;
  to: string;
}

const app: Express = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URI,
    methods: ['GET', 'POST'],
    // credentials: true,
  },
});

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

const Message = model('Message', MessageSchema);
const User = model('User', UserSchema);

app.get(
  '/',
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.status(200).json({
        message: 'This is a chat app!',
        success: true,
      });
    } catch (error) {
      next(new Error((error as Error).message));
    }
  },
);

app.post('/api/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).json({
      message: 'User not found',
      success: false,
    });
  } else {
    res.status(200).json({
      message: 'User found',
      success: true,
      user,
    });
  }
});

const userList = [
  { id: 1, email: 'tushar@email.com', password: 'qwer1234' },
  { id: 2, email: 'rafi@email.com', password: 'qwer1234' },
  { id: 3, email: 'sabbir@email.com', password: 'qwer1234' },
  { id: 4, email: 'jamal@email.com', password: 'qwer1234' },
];

const initializeUsers = async () => {
  try {
    const existingUsers = await User.find({});
    if (existingUsers.length === 0) {
      await User.insertMany(userList);
      console.log('Predefined Users initialized');
    }
  } catch (error) {
    console.error('Error initializing users:', error);
  }
};

initializeUsers();

io.on('connection', async (socket: Socket) => {
  console.log('User Connected', socket.id);

  try {
    const recentPublicMessages = await Message.find({ type: 'public' })
      .sort('createdAt')
      .limit(50);
    socket.emit('recentPublicMessages', recentPublicMessages);
  } catch (error) {
    console.error('Error fetching recent messages:', error);
  }

  socket.on('login', async (data: { email: string; password: string }) => {
    try {
      const user = await User.findOne({
        email: data.email,
        password: data.password,
      });

      if (user) {
        await User.findByIdAndUpdate(user._id, {
          socketId: socket.id,
          isOnline: true,
        });

        socket.emit('loginResponse', {
          success: true,
          email: data.email,
          isOnline: user.isOnline,
        });

        const activeUsers = await User.find().select('email isOnline socketId');

        io.emit('activeUsers', activeUsers);
      } else {
        socket.emit('loginResponse', {
          success: false,
          error: 'Invalid email or password. Please try again.',
        });
      }
    } catch (error) {
      console.error('Error logging in:', error);
      socket.emit('Login Error:', {
        success: false,
        error: 'Error logging in. Please try again.',
      });
    }
  });

  socket.on('publicMessage', async (content: string) => {
    try {
      const user = await User.findOne({ socketId: socket.id });

      const message = new Message({
        sender: user ? user?.email : socket.id.substring(0, 3),
        content,
        isAuthenticated: !!user,
        type: 'public',
      });

      await message.save();

      io.emit('publicMessage', {
        sender: user ? user?.email : socket.id.substring(0, 3),
        content,
        isAuthenticated: !!user,
        createdAt: message.createdAt,
      });
    } catch (error) {
      console.error('Error sending public message:', error);
      socket.emit('messageError', 'Failed to send message');
    }
  });

  socket.on('privateMessage', async (data: PrivateMessage) => {
    try {
      const sender = await User.findOne({ email: data.from });
      if (!sender) {
        console.error('Sender not found');
        socket.emit('messageError', 'Sender is not authenticated');
      } else {
        const receiver = await User.findOne({ email: data.to });

        if (!receiver) {
          console.error('Receiver not found');
          socket.emit('messageError', 'Receiver not found');
        } else {
          const message = new Message({
            sender: sender.email,
            receiver: data.to,
            content: data.content,
            type: 'private',
            isAuthenticated: !!sender,
          });

          await message.save();

          io.emit('privateMessage', {
            sender: sender.email,
            receiver: receiver.email,
            content: data.content,
            createdAt: message.createdAt,
          });
        }
      }
    } catch (error) {
      console.error('Error sending private message:', error);
      socket.emit('messageError', 'Failed to send private3.bn/  message');
    }
  });

  socket.on('getPrivateMessages', async (otherUser: string) => {
    try {
      const user = await User.findOne({ socketId: socket.id });
      if (!user) {
        console.error('User not found');
        socket.emit('messageError', 'Sender is not authenticated');
      } else {
        const messages = await Message.find({
          type: 'private',
          $or: [
            { sender: user.email, receiver: otherUser },
            { sender: otherUser, receiver: user.email },
          ],
        }).sort('-createdAt');

        socket.emit('privateMessages', messages);
      }
    } catch (error) {
      console.error('Error getting private messages:', error);
      socket.emit('messageError', 'Failed to get private messages');
    }
  });

  socket.on('disconnect', async () => {
    try {
      await User.findOneAndUpdate(
        { socketId: socket.id },
        { isOnline: false, socketId: null },
      );
      const activeUsers = await User.find().select('email isOnline socketId');
      io.emit('activeUsers', activeUsers);
    } catch (error) {
      console.error('Disconnect error', error);
    }
  });
});

server.listen(3000, () => {
  console.log(`Server started on port ${port}`);
});
