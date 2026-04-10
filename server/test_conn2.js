import 'dotenv/config';
import mongoose from 'mongoose';

async function test() {
    try {
        const url = 'mongodb+srv://kvsanthosh1011_db_user:RHizWhtlHBOm5STZ@cluster0.pxb99xc.mongodb.net/hospital_tokens?retryWrites=true&w=majority';
        console.log("Connecting to:", url);
        await mongoose.connect(url);
        console.log("✅ Successfully connected!");
        process.exit(0);
    } catch (err) {
        console.error("❌ Failed:", err);
        process.exit(1);
    }
}

test();
