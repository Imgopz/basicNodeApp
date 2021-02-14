const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const User = require('./models/user');

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

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.render('home');
})

//Create user
app.get('/createUser', async (req, res) => {
    const user = new User({ name: 'Gopal', Gender: 'Male' });
    await user.save();
    res.send(user)
});

app.get('/users', async (req, res) => {
    const users = await User.find({});
    res.render('users/index', { users });
});

app.get('/users/new', (req, res) => {
    res.render('users/new');
});

app.post('/users', async (req, res) => {
    const user = new User(req.body.user);
    await user.save();
    res.redirect(`/users/${user._id}`);
})

app.get('/users/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    res.render('users/show', { user }); 
});

app.get('/users/:id/edit', async (req, res) => {
    const user = await User.findById(req.params.id);
    res.render('users/edit', { user });
});

app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, { ...req.body.user } );
    res.redirect( `/users/${user._id}`);
});

app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.redirect('/users');
});

app.listen(3001, () => {
    console.log('Serving on port 3001');
});