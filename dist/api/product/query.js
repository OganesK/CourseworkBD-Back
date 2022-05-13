"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductQuery = void 0;
const nexus_1 = require("nexus");
exports.ProductQuery = (0, nexus_1.extendType)({
    type: 'Query',
    definition(t) {
        t.crud.product();
        t.crud.products();
        t.field('getApprovedProduct', {
            type: (0, nexus_1.list)('Product'),
            args: {},
            resolve: async (parent, args, ctx) => {
                const allProducts = await ctx.prisma.product.findMany({
                    where: {
                        registered: true
                    }
                });
                return allProducts;
            }
        });
        t.field('getNotApprovedProduct', {
            type: (0, nexus_1.list)('Product'),
            args: {},
            resolve: async (parent, args, ctx) => {
                const allProducts = await ctx.prisma.product.findMany({
                    where: {
                        registered: false
                    }
                });
                return allProducts;
            }
        });
    }
});
//# sourceMappingURL=query.js.map