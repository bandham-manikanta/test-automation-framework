import express from 'express';
import compression from "compression";
import * as homeController from "./controllers/collection-controller";

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(compression());

app.get("/", homeController.index);

export default app;