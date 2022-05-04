import { objectType } from "nexus";

export * from './query';
export * from './mutation';

export const Shop = objectType({
  name: 'Shop',
  definition (t) {
    t.model.id();
    t.model.name();
    t.model.requests();
    t.model.transactions();
    t.model.shopOwner();
  }
})