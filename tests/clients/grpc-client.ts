import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";

const { GRPC_PORT } = process.env;
const SERVICE_NAME = "TaskApi";
const PROTO_PATH = `${__dirname}/../../src/protos/task-api.proto`;

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const { task } = grpc.loadPackageDefinition(packageDefinition);

export const client = new task[SERVICE_NAME](
  `localhost:${GRPC_PORT ?? 50051}`,
  grpc.credentials.createInsecure()
);