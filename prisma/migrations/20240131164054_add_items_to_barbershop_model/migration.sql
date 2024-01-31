/*
  Warnings:

  - The `phone` column on the `Barbershop` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Barbershop" ADD COLUMN     "bonusItems" TEXT[],
ADD COLUMN     "description" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "openings" TEXT[],
ADD COLUMN     "ratingQTD" INTEGER NOT NULL DEFAULT 1,
DROP COLUMN "phone",
ADD COLUMN     "phone" TEXT[];
