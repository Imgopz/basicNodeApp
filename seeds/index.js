const mongoose = require('mongoose');
const User = require('../models/user');
const users = require('./users')

mongoose.connect('mongodb://localhost:27017/basic-app', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', ()=>{
    console.log('Database connected');
});

const seedDB = async() => {
    await User.deleteMany({});
    for (let i = 0; i < 4; i++){
        const user = new User({
            name: `${users[i].name}`,
            gender: `${users[i].gender}`
        })
        await user.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});
