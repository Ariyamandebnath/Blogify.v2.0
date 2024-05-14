import dotenv from 'dotenv';
import logger from "./core/Logger";
import { port } from "./constants";
import app from "./app";
import connectDB from "./db/db";

dotenv.config({
    path: './.env',
}
)

connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`server Listening on ${process.env.PORT}`);
        })
            .on("error", (e) => {
                console.log(e)
            });
})
