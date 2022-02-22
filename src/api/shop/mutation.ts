import { extendType } from "nexus";

export const ShopMutation = extendType({
  type: 'Mutation',
  definition (t) {
    t.crud.createOneShop();
    t.crud.updateOneShop();
  }
})