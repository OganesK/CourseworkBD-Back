import { extendType } from "nexus";

export const ShipmentMutation = extendType({
  type: 'Mutation',
  definition (t) {
    t.crud.createOneShipment();
    t.crud.updateOneShipment();
  }
})