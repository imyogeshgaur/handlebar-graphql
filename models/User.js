import { Schema, model } from "mongoose";
const userSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    nameOfUser: {
        type: String,
        required: true
    },
    emailOfUser: {
        type: String,
        required: true
    },
    phoneNumber: String,
    password: {
        type: String,
        required: true
    }
})

const User = model("User", userSchema);
export default User;