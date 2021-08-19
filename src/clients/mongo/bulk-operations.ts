import { BulkOperation, Document } from "./mongo-types";
import { toMongoId } from "./mongo-utils";

export const updateOne: BulkOperation = ({ _id, ...documentProps }: Document) => ({
  filter: { _id: toMongoId(_id as string) },
  update: { $set: { ...documentProps } },
});