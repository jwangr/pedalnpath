-- CreateTable
CREATE TABLE "Bikepath" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "difficulty" TEXT,
    "distanceKm" REAL,
    "duration" TEXT,
    "startLat" REAL NOT NULL,
    "startLng" REAL NOT NULL,
    "endLat" REAL NOT NULL,
    "endLng" REAL NOT NULL,
    "notes" TEXT,
    "trackType" TEXT,
    "highlights" JSONB,
    "coordinates" JSONB NOT NULL
);

-- CreateTable
CREATE TABLE "BikepathSuitableFor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "suitableFor" TEXT NOT NULL,
    "bikepathId" INTEGER NOT NULL,
    CONSTRAINT "BikepathSuitableFor_bikepathId_fkey" FOREIGN KEY ("bikepathId") REFERENCES "Bikepath" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserBikepath" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "bikepathId" INTEGER NOT NULL,
    "assignedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UserBikepath_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "UserBikepath_bikepathId_fkey" FOREIGN KEY ("bikepathId") REFERENCES "Bikepath" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
