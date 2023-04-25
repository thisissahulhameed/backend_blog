import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  friends: {
    type: Array,
    default: [],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const UserModel = mongoose.model("user", UserSchema);

export default UserModel;
