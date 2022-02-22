import { extendType } from "nexus";

export const ManufacturerQuery = extendType({
  type: 'Query',
  definition (t) {
    t.crud.manufacturer();
    t.crud.manufacturers();
  }
})