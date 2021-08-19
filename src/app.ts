import express from "express";
import bodyParser from "body-parser";

import { router } from "./router";
import { initMongoClient } from "./clients";
import { errorMiddleware } from "./middlewares";

import { startGrpcServer } from './grpc-server';

const { MONGO_HOST, MONGO_DB_NAME, MONGO_USER, MONGO_PASSWORD, PORT, ENABLE_GRPC } =
  process.env;

export const app = express();
const port = PORT ?? 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api", router);
app.use(errorMiddleware);

app.listen(port, async () => {
  await initMongoClient(MONGO_DB_NAME, MONGO_HOST);

  if(ENABLE_GRPC){
    await startGrpcServer();
  }
  
  console.log(`Example app listening at http://localhost:${port}`);
});
