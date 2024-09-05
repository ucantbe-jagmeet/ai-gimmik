import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Connected to db');
    
  } catch (error) {
    console.log(error);
  }
};

export default dbConnect;
