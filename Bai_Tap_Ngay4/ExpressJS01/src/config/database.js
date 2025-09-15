require('dotenv').config();
const mongoose = require('mongoose');

const dbState = [{
    value: 0,
    label: "Disconnected"
},
{
    value: 1,
    label: "Connected"
},
{
    value: 3,
    label: "Disconnecting"
}];

const connection = async() => {
   try {
        await mongoose.connect(process.env.MONGO_DB_URL, {
            serverSelectionTimeoutMS: 45000 
        });
        console.log("Connected to database");
    } catch (error) {
        console.error("Could not connect to the database:", error.message);
        process.exit(1);
    }
}

module.exports = connection;