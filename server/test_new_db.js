import 'dotenv/config';
import mongoose from 'mongoose';

async function test() {
    try {
        const url = process.env.MONGO_URI;
        console.log("Connecting to:", url);
        await mongoose.connect(url, { dbName: 'smart_token_db' });
        console.log("✅ Successfully connected to the NEW cluster!");
        process.exit(0);
    } catch (err) {
        console.error("❌ Failed to connect to NEW cluster:", err);
        process.exit(1);
    }
}

test();
