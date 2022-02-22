import { objectType } from "nexus";

export * from './query';
export * from './mutation';

export const Shipment = objectType({
  name: 'Shipment',
  definition (t) {
    t.model.id();
    t.model.product();
    t.model.createdAt();
    t.model.count();
    t.model.shop();
  }
})