import express, { Application } from "express";
import bodyParser from "body-parser";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import connectDB from "./config/database";
import dotenv from "dotenv";

dotenv.config(); 

const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

configViewEngine(app);
initWebRoutes(app);
connectDB();

const port: number = parseInt(process.env.PORT || "6969", 10);

app.listen(port, () => {
  console.log(` Backend NodeJS is running on the port: ${port}`);
});