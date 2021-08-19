import { ObjectId } from "mongodb";

export interface Document extends Record<string, any> {
    _id?: string | ObjectId;
}
export type BulkOperation = (document: Document) => any;