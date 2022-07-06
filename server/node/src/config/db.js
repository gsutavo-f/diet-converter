import mongoose from 'mongoose';

mongoose.connect("mongodb+srv://user:vWVbFi6RCtDq6bZ0@greendiet.rm4uq.mongodb.net/green-diet");

export default mongoose.connection;
