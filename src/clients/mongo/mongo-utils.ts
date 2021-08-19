import { ObjectId} from "mongodb";

export const toMongoId = (id: string) => new ObjectId(id);
