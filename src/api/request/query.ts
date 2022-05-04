import { extendType } from "nexus";

export const RequestQuery = extendType({
  type: 'Query',
  definition (t) {
    t.crud.request();
    t.crud.requests();
  }
})