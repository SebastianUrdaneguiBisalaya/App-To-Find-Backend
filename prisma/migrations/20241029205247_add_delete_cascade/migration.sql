-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_user_id_fkey";

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "event_id" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "order_id" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "Purchase" ALTER COLUMN "purchase_id" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "Ticket" ALTER COLUMN "ticket_id" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "age" INTEGER,
ALTER COLUMN "user_id" SET DEFAULT gen_random_uuid();

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
