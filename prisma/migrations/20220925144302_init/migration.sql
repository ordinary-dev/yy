-- CreateTable
CREATE TABLE "Photo" (
    "id" SERIAL NOT NULL,
    "descriptionRu" TEXT,
    "descriptionEn" TEXT,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);
