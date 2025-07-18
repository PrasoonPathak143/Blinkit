const express = require('express');
const app = express();
const indexRouter = require('./routes/index');     // can also use (./routes) as index is the default file
const authRouter = require('./routes/auth');       
const expressSession = require('express-session');
const categoryRouter = require('./routes/category');
const userRouter = require('./routes/user');
const path = require('path');
require('dotenv').config();
require('./config/google_oauth_config');
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));
const adminRouter = require('./routes/admin');
const productRouter = require('./routes/product');     



const mongoose = require('./config/db'); // Importing the mongoose connection
const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.use("/", indexRouter);
app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use('/products', productRouter);
app.use('/categories', categoryRouter);
app.use('/users', userRouter);

app.listen(3000);
