import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import * as taskGrpcController from "./api/task/task-grpc-controller";

const { GRPC_PORT } = process.env;
const SERVICE_NAME = "TaskApi";
const PROTO_PATH = `${__dirname}/protos/task-api.proto`;

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const { task } = grpc.loadPackageDefinition(packageDefinition);

function getGrpcServer() {
  const server = new grpc.Server();
  const service = task[SERVICE_NAME].service;
  server.addService(service, {
    listTasks: taskGrpcController.get,
    createTask: taskGrpcController.create,
    createTasks: taskGrpcController.createMany,
    updateTask: taskGrpcController.update,
    updateTasks: taskGrpcController.updateMany,
    removeTask: taskGrpcController.remove,
    removeTasks: taskGrpcController.removeMany,
  });
  return server;
}

export async function startGrpcServer() {
  const server = getGrpcServer();
  const port = GRPC_PORT ?? 50051;
  const address = `0.0.0.0:${port}`;
  console.log("binding grpc server", { address });
  return new Promise((resolve, reject) => {
    server.bindAsync(
      address,
      grpc.ServerCredentials.createInsecure(),
      (err) => {
        if (err) {
          console.log("Error while starting grpc server", { err });
          reject(err);
        } else {
          server.start();
          console.log("grpc server started successfully", { address });
          resolve(undefined);
        }
      }
    );
  });
}
