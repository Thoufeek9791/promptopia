import { Schema,model,models } from "mongoose";

console.log("modal js is executed")

const userSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!", 
    ],
  },
  image: {
    type: String,
  },
});

//The "modals" object is provided by the Mongoose library and stores all the registered models.
//if a modal name "User" already exist in the "models" object it assigns that existing modal to the "User" variable

//if a model named "User" does not exist in the "modals" object, the "model" function from Mongoose is called to create a new model.

//The newly created model is then assigned to the user variable

const User = models.User || model("User", userSchema);
console.log("USer Modal", typeof User)

export default User;