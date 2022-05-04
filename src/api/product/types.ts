import { objectType } from "nexus";

export * from './mutation';
export * from './query';

export const Product = objectType({
  name: 'Product',
  definition (t) {
    t.model.id();
    t.model.name();
    t.model.amount();
    t.model.unit();
    t.model.stockDate();
    t.model.transactions();
    t.model.expirationDate();
    t.model.requests();
    t.model.manufacturer();
    t.model.manufacturerId()
  }
})