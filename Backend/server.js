import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser";
import connectMongoDB from "./config/db.js"
import HomeRouter from "./routes/home.js"
import AuthRouter from "./routes/auth.js"
import UsersRouter from "./routes/users.js"
import VendorsRouter from "./routes/vendor.js"
import ProductsRouter from "./routes/products.js"
import AdminRouter from "./routes/admin.js"
import OrdersRouter from "./routes/orders.js"


// dotenv config
dotenv.config();
console.log("JWT_SECRET:", process.env.JWT_SECRET);
const app = express()
const port = process.env.PORT

//CORS
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// MiddleWare
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// routes
app.use('/', HomeRouter)
app.use('/auth', AuthRouter)
app.use('/products', ProductsRouter)
app.use('/users', UsersRouter)
app.use('/vendors', VendorsRouter)
app.use('/admin', AdminRouter)
app.use('/orders', OrdersRouter)

// Connect MongoDB
connectMongoDB("mongodb://127.0.0.1:27017/Vendora").then(()=>{
    console.log("MongoDB connected")
})

app.listen(port, ()=>{
    console.log(`http://localhost:${port}`)
})