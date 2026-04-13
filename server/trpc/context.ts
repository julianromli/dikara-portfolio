import type {DB} from '../../db';

export type TrpcContext = {
  db: DB;
};
