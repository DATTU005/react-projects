import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minLength: 6,
    required: true,
  },
  role: {
    type: String,
    default: "Admin",
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
