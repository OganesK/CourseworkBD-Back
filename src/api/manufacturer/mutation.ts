import { extendType, nonNull, list, inputObjectType, arg } from 'nexus';
import { Context } from '../../graphql/context';

import prisma from '../../prisma-client'

export const ManufacturerMutation = extendType({
  type: 'Mutation',
  definition (t) {
    t.crud.createOneManufacturer();
    t.crud.updateOneManufacturer();

    t.field('shipGoodsToStock', {
      type: 'String',
      args: { data: nonNull(arg({ type: shipGoodsToStockArgs })) },
      resolve: async (parent, args, ctx: Context) => {
        try {
          let allProuctsOnWarehouse = await prisma.product.findMany({});
          let productFromThisManufacturerExists = allProuctsOnWarehouse.filter((product) => product.manufacturerId === args.data.manufacturerId && product.name === args.data.productName)

          if (productFromThisManufacturerExists.length !== 0){
            await prisma.product.update({
              where: {
                id: productFromThisManufacturerExists[0].id,
              },
              data: {
                amount: productFromThisManufacturerExists[0].amount + args.data.productAmount
              }
            })
          } else {
            await prisma.product.create({
              data: {
                name: args.data.productName,
                amount: args.data.productAmount,
                unit: args.data.productUnit,
                manufacturerId: args.data.manufacturerId,
                expirationDate: args.data.expirationDate,
                registered: false
              }
            })
          }
          allProuctsOnWarehouse = await prisma.product.findMany({});
          productFromThisManufacturerExists = allProuctsOnWarehouse.filter((product) => product.manufacturerId === args.data.manufacturerId && product.name === args.data.productName)
          await prisma.transaction.create({
            data: {
              productId: productFromThisManufacturerExists[0].id,
              amount: args.data.productAmount,
              manufacturerid: args.data.manufacturerId
            }
          })
          return 'Success'
        } catch(error) {
          throw new Error(error)
        }
        
      }
    })
  }
})

export const shipGoodsToStockArgs = inputObjectType({
  name: 'ShipGoodsToStockArgs',
  definition (t) {
    t.nonNull.string('productName');
    t.nonNull.float('productAmount');
    t.nonNull.string('productUnit');
    t.nonNull.string('manufacturerId');
    t.nonNull.string('expirationDate');
  },
});