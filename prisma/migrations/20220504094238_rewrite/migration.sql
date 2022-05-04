/*
  Warnings:

  - You are about to drop the column `count` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `manufacturerId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `recieptDate` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `Shop` table. All the data in the column will be lost.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Shipment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductToShop` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `amount` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registered` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shopOwnerId` to the `Shop` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "USER_ROLE" AS ENUM ('SHOP_OWNER', 'FIRM_OWNER', 'ADMINISTRATOR', 'MANAGER');

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_manufacturerId_fkey";

-- DropForeignKey
ALTER TABLE "Shipment" DROP CONSTRAINT "Shipment_productId_fkey";

-- DropForeignKey
ALTER TABLE "Shipment" DROP CONSTRAINT "Shipment_shopId_fkey";

-- DropForeignKey
ALTER TABLE "Shop" DROP CONSTRAINT "Shop_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToShop" DROP CONSTRAINT "_ProductToShop_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToShop" DROP CONSTRAINT "_ProductToShop_B_fkey";

-- DropIndex
DROP INDEX "Shop_name_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "count",
DROP COLUMN "manufacturerId",
DROP COLUMN "recieptDate",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "registered" BOOLEAN NOT NULL,
ADD COLUMN     "stockDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Shop" DROP COLUMN "ownerId",
ADD COLUMN     "shopOwnerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "USER_ROLE" NOT NULL DEFAULT E'MANAGER';

-- DropTable
DROP TABLE "Shipment";

-- DropTable
DROP TABLE "_ProductToShop";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "shopId" TEXT,
    "manufacturerid" TEXT,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Request" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "shopId" TEXT NOT NULL,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Shop" ADD CONSTRAINT "Shop_shopOwnerId_fkey" FOREIGN KEY ("shopOwnerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_manufacturerid_fkey" FOREIGN KEY ("manufacturerid") REFERENCES "Manufacturer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
