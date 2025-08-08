import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    googleId: { type: String, required: true, unique: true },
    name: String,
    avatar: String,
    fullName: { type: String},
    email: { type: String, required: true, unique: true },
    password: { type: String},
    phone: { type: String }
}, { timestamps: true });

// Hash password before saving

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

// Compare password method

userSchema.methods.matchPassword = async function (inputPassword) {
    return await bcrypt.compare(inputPassword, this.password);
};

const user = mongoose.model("user", userSchema);

export default user;