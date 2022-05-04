import { extendType } from "nexus";

export const TransactionMutation = extendType({
  type: 'Mutation',
  definition (t) {
    t.crud.createOneTransaction();
    t.crud.updateOneTransaction();
  }
})