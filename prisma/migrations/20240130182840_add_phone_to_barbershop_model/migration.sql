/*
  Warnings:

  - Added the required column `phone` to the `Barbershop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Barbershop" ADD COLUMN     "phone" TEXT NOT NULL;
