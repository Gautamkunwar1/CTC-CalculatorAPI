import cors from 'cors';
import dotenv from "dotenv";
import express from "express";
import path from "path";
import CTCRouter from "./Router/salaryBreakDownRouter.js";
dotenv.config();

const PORT = process.env.PORT ||5001;
const __dirname = path.resolve()


const app = express();
app.use(express.json());
app.use(cors());

app.use("/api",CTCRouter);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "frontend", "dist")))
    app.get("*", (req, res)=>{
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    })
}



app.listen(PORT,async()=>{
    console.log(`Server is running at ${PORT}`);
})