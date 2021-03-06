const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//DB
mongoose.connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(db => console.log('Database connected'))
.catch(err => console.log(err));

// Settings
const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/users');

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Midleware
app.use(morgan('dev'));

//Routes
app.use('/', indexRoutes)
app.use('/users', userRoutes);

//Start
app.listen(app.get('port'), () => {
    console.log(`Server running in ${app.get('port')}`)
});