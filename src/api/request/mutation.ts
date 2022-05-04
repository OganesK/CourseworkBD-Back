import { extendType, nonNull, list, inputObjectType, arg } from 'nexus';
import { Context } from '../../graphql/context';

export const RequestMutation = extendType({
  type: 'Mutation',
  definition (t) {
    t.crud.updateOneRequest();
    t.field('requestProductFromStock', {
      type: 'String',
      args: { data: nonNull(arg({ type: requestProductArgs })) },
      resolve: async (parent, args, ctx: Context) => {
        try {
          const existingShop = await ctx.prisma.shop.findFirst({
            where: {
              id: args.data.shopId
            }
          })
          const existingProduct = await ctx.prisma.product.findFirst({
            where: {
              id: args.data.productId
            }
          })


          if (!existingProduct) {
            throw new Error('Product with provided id does not exist');
          }

          if (!existingShop) {
            throw new Error('Shop with provided id does not exist');
          }

          if (existingProduct.amount < args.data.amount) {
            throw new Error('There is no provided amout of product on warehouse.')
          }

          await ctx.prisma.request.create({
            data: {
              productId: args.data.productId,
              shopId: args.data.shopId,
              amount: args.data.amount
            }
          })

          return 'Success';
        } catch(error) {
          throw new Error(error);
        }
      }
    });
    t.field('approveRequest', {
      type: 'String',
      args: { data: nonNull(arg({ type: approveRequestArgs })) },
      resolve: async (parent, args, ctx: Context) => {
        try {
          const existingRequest = await ctx.prisma.request.findFirst({
            where: {
              id: args.data.requestId
            },
            include: {
              product: true
            }
          })


          if (existingRequest.product.amount < existingRequest.amount) {
            throw new Error('There is no provided amout of product on warehouse.')
          }

          await ctx.prisma.request.update({
            where: {
              id: args.data.requestId
            },
            data: {
              approved: true
            }
          })

          await ctx.prisma.transaction.create({
            data: {
              productId: existingRequest.product.id,
              shopId: existingRequest.shopId,
              amount: existingRequest.amount
            }
          })

          await ctx.prisma.product.update({
            where: {
              id: existingRequest.product.id
            },
            data: {
              amount: existingRequest.product.amount - existingRequest.amount
            }
          })

          return 'Success';
        } catch(error) {
          throw new Error(error);
        }
      }
    })
  }
})

export const requestProductArgs = inputObjectType({
  name: 'RequestProductArgs',
  definition (t) {
    t.nonNull.string('productId');
    t.nonNull.string('shopId');
    t.nonNull.float('amount');
  },
});

export const approveRequestArgs = inputObjectType({
  name: 'ApproveRequestArgs',
  definition (t) {
    t.nonNull.string('requestId');
  },
});