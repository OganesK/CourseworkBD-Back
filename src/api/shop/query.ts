import { extendType } from "nexus";

export const ShopQuery = extendType({
  type: 'Query',
  definition (t) {
    t.crud.shop();
    t.crud.shops();
  }
})