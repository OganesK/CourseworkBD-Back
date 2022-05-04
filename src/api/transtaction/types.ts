import { objectType } from "nexus";

export * from './mutation';
export * from './query';

export const Transaction = objectType({
  name: 'Transaction',
  definition (t) {
    t.model.id();
    t.model.amount();
    t.model.product();
    t.model.shop();
    t.model.manufacturer();
  }
})