import mongoose from "mongoose";

export const  connectDB = async () =>{

    await mongoose.connect('mongodb+srv://badgujardevesh24:oMJge23uDspR50tA@petpuja.2ubks.mongodb.net/petpuja').then(()=>console.log("DB Connected"));
   
}

