import { extendType, nonNull, list, inputObjectType, arg } from 'nexus';
import { Context } from '../../graphql/context';

export const ProductMutation = extendType({
  type: 'Mutation',
  definition (t) {
    t.crud.createOneProduct();
    t.crud.updateOneProduct();
    t.field('approveShipment', {
      type: 'String',
      args: { data: nonNull(arg({ type: approveShipmentArgs })) },
      resolve: async (parent, args, ctx: Context) => {
        try {
          const existingProduct = await ctx.prisma.product.findFirst({
            where: {
              id: args.data.productId
            }
          })
          if (!existingProduct) {
            throw new Error('Product with provided id does not exist.');
          }
          await ctx.prisma.product.update({
            where: {
              id: args.data.productId
            },
            data: {
              registered: true
            }
          })
          return 'Success'
        } catch(error) {
          throw new Error(error);
        }
      }
    })
  },
})

export const approveShipmentArgs = inputObjectType({
  name: 'ApproveShipmentArgs',
  definition (t) {
    t.nonNull.string('productId');
  },
});