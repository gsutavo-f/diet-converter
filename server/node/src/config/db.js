import mongoose from 'mongoose';

mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@greendiet.rm4uq.mongodb.net/green-diet`);

export default mongoose.connection;
