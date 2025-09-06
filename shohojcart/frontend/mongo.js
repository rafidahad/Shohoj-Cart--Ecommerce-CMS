import mongoose from "mongoose";
import dotenv from "dotenv";

// ✅ Load environment variables
dotenv.config();

// ✅ Use MongoDB Atlas connection from .env
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error("❌ MongoDB URI is missing. Check your .env file.");
  process.exit(1);
}

// ✅ Connect to MongoDB Atlas
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB Atlas (HeyBuddy DB)!"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed:", err);
  });

// ✅ Define User Schema (References ProfilePictures)
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicate emails
  },
  password: {
    type: String,
    required: true,
  },
});

// ✅ Define Profile Picture Schema (Separate Collection)
const profilePictureSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "UserCollection", 
    required: true 
  }, // Links to the UserCollection
  url: { 
    type: String, 
    required: true 
  }, // Cloudinary Image URL
  publicId: { 
    type: String, 
    required: true 
  }, // Cloudinary Public ID
  uploadedAt: { 
    type: Date, 
    default: Date.now 
  }, // Timestamp
});

// ✅ Create Models
const UserCollection = mongoose.model("UserCollection", userSchema);
const ProfilePictures = mongoose.model("ProfilePictures", profilePictureSchema);

// ✅ Export Models
export { UserCollection, ProfilePictures };
