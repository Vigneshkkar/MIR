import mongoose from 'mongoose';

const connect = () => {
// Connect to MongoDB
mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING as string);

// Access Mongoose connection instance
const db = mongoose.connection;

// Handle connection events
db.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
    process.exit(1); // Exit process on connection error
});

db.once('open', () => {
    console.log('Connected to MongoDB');
});
}

export default connect;