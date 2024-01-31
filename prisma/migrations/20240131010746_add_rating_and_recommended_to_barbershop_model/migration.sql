-- AlterTable
ALTER TABLE "Barbershop" ADD COLUMN     "rating" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "recommended" BOOLEAN NOT NULL DEFAULT false;
