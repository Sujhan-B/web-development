import mongoose from 'mongoose'

const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://electrofix:electrofix%40123@cluster0.fr0o304.mongodb.net/electrofix').then(()=>console.log("DB connected"));
}

export default connectDB;