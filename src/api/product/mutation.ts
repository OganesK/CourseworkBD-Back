import { extendType } from "nexus";

export const ProductMutation = extendType({
  type: 'Mutation',
  definition (t) {
    t.crud.createOneProduct();
    t.crud.updateOneProduct();
  }
})