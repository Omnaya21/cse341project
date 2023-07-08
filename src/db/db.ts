import mongoose from 'mongoose';
import chalk from 'chalk';

const connectDB = async () => {
  try {
    const url = process.env.DB_URI!;
    const conn = await mongoose.connect(url);

    console.log(chalk.bgBlue(`MongoDB Connected: ${conn.connection.host}`));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;