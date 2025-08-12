import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "The name is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "The email is required"],
    },
    password: {
      type: String,
      required: [true, "The password is required"],
    },
    cartData: {
      type: Object,
      default: {},
    },
  },
  { minimize: false }
);

const User = mongoose.models.user || mongoose.model("User", userSchema);

export default User;
