require('dotenv').config();

const express = require('express');
const  mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRouter = require('./routes/auth/auth-routes');
const  adminProductsRouter = require("./routes/admin/products-routes");
const  adminOrderRouter = require("./routes/admin/order-routes");
const shopProductRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/review-routes");

const commanFeatureRouter = require("./routes/common/feature-routes");

mongoose
.connect('mongodb+srv://shubh2tufpc:shubh26@cluster0.0gjvz.mongodb.net/')
.then(()=>console.log("mongoDB is connected"))
.catch((error)=>console.log("error"));

const app = express();

const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin:"http://localhost:5173",
        methods:["GET","POST","DELETE","PUT"],
        allowedHeaders:[
            "Content-type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "pragma"
        ],
        credentials:true
    })
);

app.use(cookieParser());
app.use(express.json()); // ✅ Required to parse JSON request bodies
app.use("/api/auth",authRouter);
app.use(express.urlencoded({ extended: true }));
app.use("/api/admin/products",adminProductsRouter);
app.use("/api/admin/orders",adminOrderRouter);
app.use("/api/shop/products",shopProductRouter);
app.use("/api/shop/Cart",shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);

app.use("/api/common/feature",commanFeatureRouter);


app.listen(PORT,()=>console.log(`server is running on ${PORT}`))