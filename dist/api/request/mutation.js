"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.approveRequestArgs = exports.requestProductArgs = exports.RequestMutation = void 0;
const nexus_1 = require("nexus");
exports.RequestMutation = (0, nexus_1.extendType)({
    type: 'Mutation',
    definition(t) {
        t.crud.updateOneRequest();
        t.field('requestProductFromStock', {
            type: 'String',
            args: { data: (0, nexus_1.nonNull)((0, nexus_1.arg)({ type: exports.requestProductArgs })) },
            resolve: async (parent, args, ctx) => {
                try {
                    const existingShop = await ctx.prisma.shop.findFirst({
                        where: {
                            id: args.data.shopId
                        }
                    });
                    const existingProduct = await ctx.prisma.product.findFirst({
                        where: {
                            id: args.data.productId
                        }
                    });
                    if (!existingProduct) {
                        throw new Error('Product with provided id does not exist');
                    }
                    if (!existingShop) {
                        throw new Error('Shop with provided id does not exist');
                    }
                    if (existingProduct.amount < args.data.amount) {
                        throw new Error('There is no provided amout of product on warehouse.');
                    }
                    await ctx.prisma.request.create({
                        data: {
                            productId: args.data.productId,
                            shopId: args.data.shopId,
                            amount: args.data.amount
                        }
                    });
                    return 'Success';
                }
                catch (error) {
                    throw new Error(error);
                }
            }
        });
        t.field('approveRequest', {
            type: 'String',
            args: { data: (0, nexus_1.nonNull)((0, nexus_1.arg)({ type: exports.approveRequestArgs })) },
            resolve: async (parent, args, ctx) => {
                try {
                    const existingRequest = await ctx.prisma.request.findFirst({
                        where: {
                            id: args.data.requestId
                        },
                        include: {
                            product: true
                        }
                    });
                    if (existingRequest.product.amount < existingRequest.amount) {
                        throw new Error('There is no provided amout of product on warehouse.');
                    }
                    await ctx.prisma.request.update({
                        where: {
                            id: args.data.requestId
                        },
                        data: {
                            approved: true
                        }
                    });
                    await ctx.prisma.transaction.create({
                        data: {
                            productId: existingRequest.product.id,
                            shopId: existingRequest.shopId,
                            amount: existingRequest.amount
                        }
                    });
                    await ctx.prisma.product.update({
                        where: {
                            id: existingRequest.product.id
                        },
                        data: {
                            amount: existingRequest.product.amount - existingRequest.amount
                        }
                    });
                    return 'Success';
                }
                catch (error) {
                    throw new Error(error);
                }
            }
        });
    }
});
exports.requestProductArgs = (0, nexus_1.inputObjectType)({
    name: 'RequestProductArgs',
    definition(t) {
        t.nonNull.string('productId');
        t.nonNull.string('shopId');
        t.nonNull.float('amount');
    },
});
exports.approveRequestArgs = (0, nexus_1.inputObjectType)({
    name: 'ApproveRequestArgs',
    definition(t) {
        t.nonNull.string('requestId');
    },
});
//# sourceMappingURL=mutation.js.map