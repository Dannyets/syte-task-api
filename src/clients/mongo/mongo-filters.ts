import { toMongoId } from './mongo-utils';

export const getByIds = (ids: string[]) => ({ _id: { $in: ids.map(toMongoId) } });
