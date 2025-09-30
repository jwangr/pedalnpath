/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Bikepath` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[startLat,startLng,endLat,endLng]` on the table `Bikepath` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Bikepath_title_key" ON "Bikepath"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Bikepath_startLat_startLng_endLat_endLng_key" ON "Bikepath"("startLat", "startLng", "endLat", "endLng");
