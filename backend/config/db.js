import mongoose from 'mongoose'

const connectDB = async ()=>{
    await mongoose.connect('link from your mongodb atles').then(()=>console.log("DB connected"));
}

export default connectDB;
