/*
  Warnings:

  - You are about to drop the `BikepathSuitableFor` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Bikepath" ADD COLUMN "suitableFor" JSONB;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "BikepathSuitableFor";
PRAGMA foreign_keys=on;
