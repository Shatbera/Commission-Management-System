-- CreateEnum
CREATE TYPE "HotelStatus" AS ENUM ('STANDARD', 'PREFERRED');

-- CreateTable
CREATE TABLE "hotels" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "HotelStatus" NOT NULL DEFAULT 'STANDARD',

    CONSTRAINT "hotels_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "hotels_name_key" ON "hotels"("name");

-- CreateIndex
CREATE INDEX "hotels_status_idx" ON "hotels"("status");
