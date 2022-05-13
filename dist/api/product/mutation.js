"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.approveShipmentArgs = exports.ProductMutation = void 0;
const nexus_1 = require("nexus");
exports.ProductMutation = (0, nexus_1.extendType)({
    type: 'Mutation',
    definition(t) {
        t.crud.createOneProduct();
        t.crud.updateOneProduct();
        t.field('approveShipment', {
            type: 'String',
            args: { data: (0, nexus_1.nonNull)((0, nexus_1.arg)({ type: exports.approveShipmentArgs })) },
            resolve: async (parent, args, ctx) => {
                try {
                    const existingProduct = await ctx.prisma.product.findFirst({
                        where: {
                            id: args.data.productId
                        }
                    });
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
                    });
                    return 'Success';
                }
                catch (error) {
                    throw new Error(error);
                }
            }
        });
    },
});
exports.approveShipmentArgs = (0, nexus_1.inputObjectType)({
    name: 'ApproveShipmentArgs',
    definition(t) {
        t.nonNull.string('productId');
    },
});
//# sourceMappingURL=mutation.js.map