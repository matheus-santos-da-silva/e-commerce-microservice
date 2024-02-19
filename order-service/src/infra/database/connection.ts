import mongoose from 'mongoose';
import 'dotenv/config';

async function main() {
  try {
    await mongoose.connect(
      `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}`,
      { dbName: `${process.env.DB_NAME}`, }
    );
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }

}
main();

export default mongoose;  