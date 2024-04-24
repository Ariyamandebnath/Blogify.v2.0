import logger from "./utils/Logger";
import { port } from "./constants";
import app from "./app";


app.listen(port, () => {
    console.log(logger.info(`server running on port :${port}`));
})
    .on("error", (e) => logger.error(e));