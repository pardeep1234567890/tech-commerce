import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, required: true, default: false },
        wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
    },
    { timestamps: true }
);


// This function will run before a user is saved (for hashing passwords)
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10); // Generate random, secure salt
    this.password = await bcrypt.hash(this.password, salt);  // Hash password with salt
});

// A helper method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password); // Here we compare the password 
};

const User = mongoose.model('User', userSchema);
export default User;