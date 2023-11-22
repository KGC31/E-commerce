const express = require("express");
const path = require("path");
const ejs = require("ejs");
const dotenv = require("dotenv").config();

const dbConnect = require("./config/dbConnect");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')

const PORT = process.env.PORT || 3000;
const app = express();

const {errorHandler, notFound} = require("./middlewares/errorHandler")
const authRouter = require("./routes/authRoute")
const productRouter = require("./routes/productRoute")

dbConnect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}));

app.use(cookieParser());

app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname + '/public')));

// app.use("/api/user", authRouter)
// app.use("/api/product", productRouter)

// app.use(notFound);
// app.use(errorHandler);

app.get("/", (req, res) => {
    res.render('index')
})

app.get("/contact-us", (req, res) => {
    res.render('contact us')
})

app.get("/product-grids", (req, res) => {
    res.render('product-grid')
})

app.get("/cart", (req, res) => {
    res.render('cart')
})

app.get("/product-details", (req, res) => {
    res.render('product-details')
})

app.get("/login", (req, res) => {
    res.render('login')
})

app.get("/register", (req, res) => {
    res.render('register')
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});