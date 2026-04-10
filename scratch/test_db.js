import mongoose from 'mongoose';

const uris = [
    'mongodb+srv://kvsanthosh1011_db_user:RHizWhtlHBOm5STZ@smarttoken.dw8r5df.mongodb.net/?appName=SmartToken',
    'mongodb+srv://kvsanthosh1011_db_user:<RHizWhtlHBOm5STZ>@cluster0.pxb99xc.mongodb.net/hospital_tokens?retryWrites=true&w=majority'
];

async function test() {
    for (const uri of uris) {
        console.log(`Testing URI: ${uri}`);
        try {
            await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
            console.log("✅ Success!");
            await mongoose.connection.close();
        } catch (err) {
            console.error(`❌ Failed: ${err.message}`);
        }
        console.log("---");
    }
}

test();
