const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const { env } = require('node:process')

const uri = env.DB_URI

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const connectToDatabase = async () => {
    try {
        await client.connect();
        console.log('Connected to MongoDB Atlas');
        return client.db('hacker-news-validator');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        throw err;
    }
};

const closeDatabaseConnection = async () => {
    try {
        await client.close();
        console.log('MongoDB connection closed');
    } catch (err) {
        console.error('Error closing MongoDB connection', err);
    }
};

module.exports = { connectToDatabase, closeDatabaseConnection };
