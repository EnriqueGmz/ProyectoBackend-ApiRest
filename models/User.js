import { Schema, model } from "mongoose";
// import mongoose from "mongoose";

const userSchema = new Schema({ // const userSchema = new moongose.Schema
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: { unique: true },
    },
    password: {
        type: String,
        required: true,
    },
});

export const User = mongoose.model("user", userSchema);