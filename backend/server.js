import express from "express"
import cors from "cors"
import connectDB from "./config/db.js"
import serviceRouter from "./routes/serrviceRouter.js"
import userRouter from "./routes/userRouter.js"
import "dotenv/config.js"
import cartRouter from "./routes/cartRouter.js"
import orderRouter from "./routes/orderRouter.js"

const app =  express()
const port = process.env.port || 4000

app.use(express.json())
app.use(cors())

connectDB();

app.use("/api/service",serviceRouter);
app.use("/images",express.static("uploads"))
app.use("/api/user",userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);

app.get("/",(req,res)=>{
    res.send("API WORKING")
})

app.listen(port,()=>{
    console.log(`server started on http://localhost:${port}`)
})

//mongodb+srv://electrofix:<db_password>@cluster0.fr0o304.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0