import { objectType } from "nexus";

export * from './mutation';
export * from './query';

export const Product = objectType({
  name: 'Product',
  definition (t) {
    t.model.id();
    t.model.name();
    t.model.count();
    t.model.unit();
    t.model.recieptDate();
    t.model.manufacturer();
    t.model.expirationDate();
    t.model.shops();
    t.model.shipments();
  }
})