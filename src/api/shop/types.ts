import { objectType } from "nexus";

export * from './query';
export * from './mutation';

export const Shop = objectType({
  name: 'Shop',
  definition (t) {
    t.model.id();
    t.model.name();
    t.model.products();
    t.model.shipments();
    t.model.owner();
  }
})