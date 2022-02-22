import { extendType } from "nexus";

export const ProductQuery = extendType({
  type: 'Query',
  definition (t) {
    t.crud.product();
    t.crud.products();
  }
})