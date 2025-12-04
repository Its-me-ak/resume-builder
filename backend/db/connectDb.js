import mongoose from 'mongoose';

export const connectDatabase = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI);
        console.log(
          `MongoDB connected: ${connect.connection.host} and the datebase is ${connect.connection.name}`
        );

    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
}