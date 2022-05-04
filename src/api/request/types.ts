import { objectType } from "nexus";

export * from './mutation';
export * from './query';

export const Request = objectType({
  name: 'Request',
  definition (t) {
    t.model.id();
    t.model.product();
    t.model.amount();
    t.model.shop();
  }
})