require('dotenv').config()
const mongoose = require('mongoose');

const databaseUrl = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/hall-allotment';

mongoose.connect(databaseUrl, {
    serverSelectionTimeoutMS: 5000,
}).then(() => {
    console.log('MongoDB connected');
}).catch((error) => {
    console.log('MongoDB connection failed:', error.message);
});

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        
    },
    rollNumber:{
        type:String,
        unique: true,
    },
    currentHostel:{
        type:String,
    },
    contact:{
        type:String,
        unique:true,
    },
    currentRoom:{
        type:String,
        lowercase:true,
    },
    allotedRoom:{
        type:String,
        lowercase:true,
    },
    allotedHostel:{
        type:String
    },
    password:{
        type:String
    }


})


const user = mongoose.model('user', userSchema);

module.exports={
    user,
}
