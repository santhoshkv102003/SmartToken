import 'dotenv/config';
import connectDB from './config/db.js';

async function test() {
    try {
        console.log("Connecting to:", process.env.MONGO_URI);
        await connectDB();
        console.log("✅ Successfully connected via db.js!");
        process.exit(0);
    } catch (err) {
        console.error("❌ Failed:", err);
        process.exit(1);
    }
}

test();
