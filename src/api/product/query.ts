import { extendType, list } from "nexus";

import { Context } from '../../graphql/context';

export const ProductQuery = extendType({
  type: 'Query',
  definition (t) {
    t.crud.product();
    t.crud.products();

    t.field('getApprovedProduct', {
      type: list('Product'),
      args: {},
      resolve: async (parent, args, ctx: Context) => {
        const allProducts = await ctx.prisma.product.findMany({
          where: {
            registered: true
          }
        })
        return allProducts;
      }
    })
    t.field('getNotApprovedProduct', {
      type: list('Product'),
      args: {},
      resolve: async (parent, args, ctx: Context) => {
        const allProducts = await ctx.prisma.product.findMany({
          where: {
            registered: false
          }
        })
        return allProducts;
      }
    })
  }
})