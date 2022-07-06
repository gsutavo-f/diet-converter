import express from 'express';
import db from './config/db.js';
import cors from 'cors';
import routes from './routes/index.js';

db.on("error", console.log.bind(console,"Connection Error"));
db.once("open", () => {
   console.log("Connection Succeed")
});

const app = express();
app.use(express.json());
app.use(cors());
routes(app);

export default app;