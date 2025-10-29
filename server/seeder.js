import mongoose from 'mongoose';
import dotenv from 'dotenv';
import products from './data/products.js';
// We don't have user data yet, but we will add it
// import users from './data/users.js'; 
import Product from './models/ProductModel.js';
import User from './models/UserModel.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const importData = async () => {
    try {
        // Clear out old data
        await Product.deleteMany();
        await User.deleteMany(); // We don't have users, but this is a good pattern

        // We're not importing users yet, but if you had a `users.js` file:
        // const createdUsers = await User.insertMany(users);
        // const adminUser = createdUsers[0]._id; // Assuming first user is admin

        // For now, we can't link products to a user, so we'll remove the user field
        // from the sample data for the seeder to work.
        // OR, we can just create a dummy admin user first. Let's do that.

        // Create a dummy admin user
        const adminUser = await User.create({
            name: 'Admin User',
            email: 'admin@aura.com',
            password: 'password123', // This will be hashed by our model's pre-save hook
            isAdmin: true,
        });

        const adminUserId = adminUser._id;

        const sampleProducts = products.map((product) => {
            // Use the new admin user's ID for all products
            return { ...product, user: adminUserId };
        });

        await Product.insertMany(sampleProducts);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Product.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

// Check for command-line arguments
if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}