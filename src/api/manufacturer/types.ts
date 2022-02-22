import { objectType } from "nexus";

export * from './query';
export * from './mutation';

export const Manufacturer = objectType({
  name: 'Manufacturer',
  definition (t) {
    t.model.id();
    t.model.name();
    t.model.products();
    t.model.owner();
  }
})