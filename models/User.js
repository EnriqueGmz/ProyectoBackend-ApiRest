// import { Schema, model } from "mongoose"; No funciono la destructuracion con import con require segun funciona
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";


const userSchema = new mongoose.Schema({ // const userSchema = new moongose.Schema
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

userSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) return next();

    try {
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(user.password, salt); //user.password sirve en vez de const hashPassword
        user.password = hashPassword;
        next();
    } catch (error) {
        console.log(error);
        throw new Error("Falló el hash de contraseña");
    }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcryptjs.compare(candidatePassword, this.password);
};

export const User = mongoose.model("User", userSchema);