/*
  Warnings:

  - You are about to alter the column `rating` on the `Barbershop` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(1,1)`.

*/
-- AlterTable
ALTER TABLE "Barbershop" ALTER COLUMN "rating" SET DEFAULT 0,
ALTER COLUMN "rating" SET DATA TYPE DECIMAL(1,1);
