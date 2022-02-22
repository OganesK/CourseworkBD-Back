import { extendType } from "nexus";

export const ManufacturerMutation = extendType({
  type: 'Mutation',
  definition (t) {
    t.crud.createOneManufacturer();
    t.crud.updateOneManufacturer();
  }
})