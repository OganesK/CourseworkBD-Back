import { extendType } from "nexus";

export const ShipmentQuery = extendType({
  type: 'Query',
  definition (t) {
    t.crud.shipment();
    t.crud.shipments();
  }
})