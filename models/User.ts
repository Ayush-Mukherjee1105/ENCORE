import mongoose, { Schema, models, model } from "mongoose"

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String, default: "male" },
  profileImage: { type: String, default: null },
})

export default models.User || model("User", UserSchema)