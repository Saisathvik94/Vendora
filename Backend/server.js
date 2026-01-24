import express from "express"


const app = express()
const port = 3000

// MiddleWare
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(cookieParser())


// routes
app.use('/', HomeRoute)
app.use('/auth', AuthRouter)
app.use('/products', ProductsRouter)
app.use('/vendors', VendorsRouter)
app.use('/orders', OrdersRouter)

// Connect MongoDB
connectMongoDB("mongodb://127.0.0.1:27017/Vendora").then(()=>{
    console.log("MongoDB connected")
})

app.listen(port, ()=>{
    console.log(`http://localhost:${port}`)
})