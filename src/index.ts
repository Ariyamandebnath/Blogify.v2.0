import dotenv from "dotenv";
import connectDB from "./db/db";
import app from "./app";

dotenv.config({
    path: './.env',
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT||3000,()=>{
        console.log(`Server is running at : ${process.env.PORT}`);
    });
    app.on("error", (err) => {
        console.error("Server error:", err);
      });
    
})
.catch((err)=>{
    console.error(`mongoDB connect failed: ${err.message}`)
});