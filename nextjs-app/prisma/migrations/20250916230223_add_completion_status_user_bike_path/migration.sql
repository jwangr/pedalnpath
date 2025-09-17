/*
  Warnings:

  - You are about to drop the column `assignedAt` on the `UserBikepath` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserBikepath" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "bikepathId" INTEGER NOT NULL,
    "dateAdded" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "UserBikepath_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "UserBikepath_bikepathId_fkey" FOREIGN KEY ("bikepathId") REFERENCES "Bikepath" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_UserBikepath" ("bikepathId", "id", "userId") SELECT "bikepathId", "id", "userId" FROM "UserBikepath";
DROP TABLE "UserBikepath";
ALTER TABLE "new_UserBikepath" RENAME TO "UserBikepath";
CREATE UNIQUE INDEX "UserBikepath_userId_bikepathId_key" ON "UserBikepath"("userId", "bikepathId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
