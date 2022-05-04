import { extendType } from "nexus";

export const TransactionQuery = extendType({
  type: 'Query',
  definition (t) {
    t.crud.transaction();
    t.crud.transactions();
  }
})