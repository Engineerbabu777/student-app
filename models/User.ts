
import mongoose from "mongoose";


const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    encryptedPassword: {
        type: String,
        required: true,
        minlength: 8,
    },

    image: {
        type: String,
    },

});

export const UserModel = mongoose.models.User || mongoose.model("User", userSchema);
