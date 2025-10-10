-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Session" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Bikepath" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "difficulty" TEXT,
    "distanceKm" DOUBLE PRECISION,
    "duration" TEXT,
    "startLat" DOUBLE PRECISION NOT NULL,
    "startLng" DOUBLE PRECISION NOT NULL,
    "endLat" DOUBLE PRECISION NOT NULL,
    "endLng" DOUBLE PRECISION NOT NULL,
    "notes" TEXT,
    "trackType" TEXT,
    "highlights" JSONB,
    "coordinates" JSONB NOT NULL,
    "suitableFor" JSONB,

    CONSTRAINT "Bikepath_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserPath" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "bikepathId" INTEGER NOT NULL,
    "dateAdded" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserPath_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Review" (
    "id" SERIAL NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "comment" TEXT,
    "userId" INTEGER NOT NULL,
    "bikepathId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Bikepath_title_key" ON "public"."Bikepath"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Bikepath_startLat_startLng_endLat_endLng_key" ON "public"."Bikepath"("startLat", "startLng", "endLat", "endLng");

-- CreateIndex
CREATE UNIQUE INDEX "UserPath_userId_bikepathId_key" ON "public"."UserPath"("userId", "bikepathId");

-- AddForeignKey
ALTER TABLE "public"."Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserPath" ADD CONSTRAINT "UserPath_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserPath" ADD CONSTRAINT "UserPath_bikepathId_fkey" FOREIGN KEY ("bikepathId") REFERENCES "public"."Bikepath"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Review" ADD CONSTRAINT "Review_bikepathId_fkey" FOREIGN KEY ("bikepathId") REFERENCES "public"."Bikepath"("id") ON DELETE CASCADE ON UPDATE CASCADE;
