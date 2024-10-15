/*
  Warnings:

  - Changed the type of `pre_sale_discount` on the `Event` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "pre_sale_discount",
ADD COLUMN     "pre_sale_discount" DOUBLE PRECISION NOT NULL;
