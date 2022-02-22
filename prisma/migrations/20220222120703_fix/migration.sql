/*
  Warnings:

  - Changed the type of `count` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `count` to the `Shipment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shopId` to the `Shipment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "count",
ADD COLUMN     "count" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Shipment" ADD COLUMN     "count" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "shopId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Shipment" ADD CONSTRAINT "Shipment_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
