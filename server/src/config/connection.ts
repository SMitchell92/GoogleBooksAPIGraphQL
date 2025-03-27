import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks');

mongoose.connection.on("connected", () => {
    console.log("✅ Mongoose connected to DB");
  });
  
  mongoose.connection.on("error", (err) => {
    console.error("❌ Mongoose connection error:", err);
  });
  
  mongoose.connection.on("disconnected", () => {
    console.log("⚠️ Mongoose disconnected");
  });
  
  process.on("SIGINT", async () => {
    await mongoose.connection.close();
    console.log("Mongoose connection closed due to app termination");
    process.exit(0);
  });

export default mongoose.connection;
