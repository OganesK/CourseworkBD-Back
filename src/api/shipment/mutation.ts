import { extendType, inputObjectType, nonNull, arg } from "nexus";
import { Context } from '../../graphql/context';
import { GraphQLError } from "graphql";

export const ShipmentMutation = extendType({
  type: 'Mutation',
  definition (t) {
    t.crud.updateOneShipment();
    t.field('createOneShipment', {
      type: 'Shipment',
      args: { data: nonNull(arg({ type: CreateShipmentArgs })) },
      resolve: async (_, { data }, ctx: Context) => {
        const existingShop = ctx.prisma.shop.findUnique({
          where: {
            id: data.productId
          }
        })

        const existingProduct = await ctx.prisma.product.findUnique({
          where: {
            id: data.productId
          }
        })
        if (!existingShop) {
          throw new GraphQLError('Not existing shop')
        }
        if (!existingProduct) {
          throw new GraphQLError('Not existing product')
        }
        if (existingProduct.count < data.count) {
          throw new GraphQLError('There is no such quantity in stock')
        }

        await ctx.prisma.product.update({
          where: {
            id: data.productId
          },
          data: {
            count: existingProduct.count - data.count
          }
        })

        return ctx.prisma.shipment.create({
          data: {
            shopId: data.shopId,
            count: data.count,
            productId: data.productId
          }
        })
      }
    })
  }
})

export const CreateShipmentArgs = inputObjectType({
  name: 'CreateShipmentArgs',
  definition (t) {
    t.nonNull.string('productId');
    t.nonNull.int('count');
    t.nonNull.string('shopId');
  },
});