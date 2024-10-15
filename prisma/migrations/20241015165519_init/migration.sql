-- CreateTable
CREATE TABLE "User" (
    "user_id" UUID NOT NULL,
    "user_name" TEXT NOT NULL,
    "user_lastname" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "user_password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Event" (
    "event_id" UUID NOT NULL,
    "event_name" TEXT NOT NULL,
    "event_category" TEXT NOT NULL,
    "event_date" TIMESTAMP(3) NOT NULL,
    "event_hour" TIMESTAMP(3) NOT NULL,
    "event_place" TEXT NOT NULL,
    "event_latitude" DOUBLE PRECISION NOT NULL,
    "event_longitude" DOUBLE PRECISION NOT NULL,
    "event_capacity" INTEGER NOT NULL,
    "event_img" TEXT NOT NULL,
    "event_description" TEXT NOT NULL,
    "event_artist" TEXT NOT NULL,
    "pre_sale_date" TIMESTAMP(3) NOT NULL,
    "pre_sale_end_date" TIMESTAMP(3) NOT NULL,
    "pre_sale_discount" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("event_id")
);

-- CreateTable
CREATE TABLE "Order" (
    "order_id" UUID NOT NULL,
    "order_date" TIMESTAMP(3) NOT NULL,
    "user_id" UUID NOT NULL,
    "order_state" TEXT NOT NULL,
    "event_id" UUID NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "Purchase" (
    "purchase_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "order_id" UUID NOT NULL,
    "purchase_quantity" INTEGER NOT NULL,
    "purchase_amount" DOUBLE PRECISION NOT NULL,
    "ticket_id" UUID NOT NULL,
    "bar_code" TEXT NOT NULL,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("purchase_id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "ticket_id" UUID NOT NULL,
    "event_id" UUID NOT NULL,
    "ticket_type" TEXT NOT NULL,
    "ticket_price" DOUBLE PRECISION NOT NULL,
    "ticket_quantity" INTEGER NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("ticket_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_event_id_key" ON "Order"("event_id");

-- CreateIndex
CREATE UNIQUE INDEX "Purchase_ticket_id_key" ON "Purchase"("ticket_id");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("event_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "Ticket"("ticket_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("event_id") ON DELETE RESTRICT ON UPDATE CASCADE;
