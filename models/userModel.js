import { Schema, model } from 'mongoose'

const UserSchema = new Schema({
    userName: {
        type: String,
        required: true,
    },
    fristName: {
        type: String,
        required: true,
    },
    secoundName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});

export const User = model("User", UserSchema);