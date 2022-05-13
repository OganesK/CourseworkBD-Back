"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shipGoodsToStockArgs = exports.ManufacturerMutation = void 0;
const nexus_1 = require("nexus");
const prisma_client_1 = __importDefault(require("../../prisma-client"));
exports.ManufacturerMutation = (0, nexus_1.extendType)({
    type: 'Mutation',
    definition(t) {
        t.crud.createOneManufacturer();
        t.crud.updateOneManufacturer();
        t.field('shipGoodsToStock', {
            type: 'String',
            args: { data: (0, nexus_1.nonNull)((0, nexus_1.arg)({ type: exports.shipGoodsToStockArgs })) },
            resolve: async (parent, args, ctx) => {
                try {
                    let allProuctsOnWarehouse = await prisma_client_1.default.product.findMany({});
                    let productFromThisManufacturerExists = allProuctsOnWarehouse.filter((product) => product.manufacturerId === args.data.manufacturerId && product.name === args.data.productName);
                    if (productFromThisManufacturerExists.length !== 0) {
                        await prisma_client_1.default.product.update({
                            where: {
                                id: productFromThisManufacturerExists[0].id,
                            },
                            data: {
                                amount: productFromThisManufacturerExists[0].amount + args.data.productAmount
                            }
                        });
                    }
                    else {
                        await prisma_client_1.default.product.create({
                            data: {
                                name: args.data.productName,
                                amount: args.data.productAmount,
                                unit: args.data.productUnit,
                                manufacturerId: args.data.manufacturerId,
                                expirationDate: args.data.expirationDate,
                                registered: false
                            }
                        });
                    }
                    allProuctsOnWarehouse = await prisma_client_1.default.product.findMany({});
                    productFromThisManufacturerExists = allProuctsOnWarehouse.filter((product) => product.manufacturerId === args.data.manufacturerId && product.name === args.data.productName);
                    await prisma_client_1.default.transaction.create({
                        data: {
                            productId: productFromThisManufacturerExists[0].id,
                            amount: args.data.productAmount,
                            manufacturerid: args.data.manufacturerId
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
exports.shipGoodsToStockArgs = (0, nexus_1.inputObjectType)({
    name: 'ShipGoodsToStockArgs',
    definition(t) {
        t.nonNull.string('productName');
        t.nonNull.float('productAmount');
        t.nonNull.string('productUnit');
        t.nonNull.string('manufacturerId');
        t.nonNull.string('expirationDate');
    },
});
//# sourceMappingURL=mutation.js.map