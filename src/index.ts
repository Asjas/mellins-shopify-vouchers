import dotenv from "dotenv";
import createServer from "./server";

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;
const app = await createServer();

await app.listen(PORT);
