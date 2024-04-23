import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({

    username: {
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
        min: 6,
        max: 50,
    },
    avatar: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
},
    //createdAt
    {timestamps: true}
);

UserSchema.pre('save', async function (next) {
    if (this.isAdmin) {
        const existingAdmin = await this.constructor.findOne({isAdmin: true});
        if (existingAdmin && !existingAdmin._id.equals(this._id)) {
            throw new Error("Only one admin could be");
        }
    }
    next();
})

export const User = mongoose.model("User", UserSchema);