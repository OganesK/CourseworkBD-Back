import { extendType, list } from "nexus";
import { Context } from '../../graphql/context';

export const RequestQuery = extendType({
  type: 'Query',
  definition (t) {
    t.crud.request();
    t.crud.requests();
    t.field('getNotApprovedRequests', {
      type: list('Request'),
      args: {},
      resolve: async (parent, args, ctx: Context) => {
        const allProducts = await ctx.prisma.request.findMany({
          where: {
            approved: false
          }
        })
        return allProducts;
      }
    })
  }
})