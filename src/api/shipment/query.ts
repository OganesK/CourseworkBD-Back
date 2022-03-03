import { extendType, list } from "nexus";
import { Context } from '../../graphql/context';

export const ShipmentQuery = extendType({
  type: 'Query',
  definition (t) {
    t.crud.shipment();
    t.crud.shipments();
    t.field('getDailyReport', {
      type: list('Shipment'),
      args: {},
      resolve: async (_, { }, ctx: Context) => {
        return ctx.prisma.shipment.findMany({
          where: {
            createdAt: {
              gte: new Date(`${new Date().getFullYear()}-${('0' + (new Date().getMonth() + 1).toString()).slice(-2)}-${('0' + (new Date().getDay() - 1).toString()).slice(-2)}T00:00:00.000Z`),
              lte: new Date(`${new Date().getFullYear()}-${('0' + (new Date().getMonth() + 1).toString()).slice(-2)}-${('0' + (new Date().getDay()).toString()).slice(-2)}T00:00:00.000Z`),
            // `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDay()}`?
          }
        }
        })
      }
    })
  }
})