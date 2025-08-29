import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbConnection = async () => {
  try {
    console.log(process.env.PORT,'<-');
    const dbURI = process.env.MONGODB_URI;
    const dbName = process.env.MONGODB_DB;
    console.log(`Connecting to MongoDB at ${dbURI}/${dbName}`);

    await mongoose.connect(`${dbURI}/${dbName}`, {
      // If you use MongoDB < 8 you have to use this:
      //useNewUrlParser:true,
      //useUnifiedTopology:true
    });

    console.log(`MongoDB is connected`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default dbConnection;