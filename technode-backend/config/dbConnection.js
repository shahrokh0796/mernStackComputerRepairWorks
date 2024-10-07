const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI);
    } catch (error) {
        console.log("said the error --> ", error);
    }
};

module.exports = connectDB;
// const { MongoClient, ServerApiVersion } = require('mongodb');

// const uri = process.env.DATABASE_URI;

// console.log(process.env.DATABASE_URI, "<---db...--");

// // create mongo client with a MongoClientOptions
// const client = new MongoClient(uri, {
//     serverApi: {   
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true
//     }  
// });

// async function run() {
//     try {
//         // Connect the client to the server (optional starting in v4.7)
//         await client.connect();
//         // send a ping to confirm a successful connection
//         await client.db('admin').command({ ping: 1});
//         console.log('Pinged your deployment. You successfully connected to mongoDB!');
//     } finally {
//         // ensure that the cient will close when you finish/error
//         await client.close();
//     }    
// }

// run().catch(console.dir);