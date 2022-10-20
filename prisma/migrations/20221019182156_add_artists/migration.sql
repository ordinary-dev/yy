-- CreateTable
CREATE TABLE "Person" (
    "id" SERIAL NOT NULL,
    "nameEn" TEXT NOT NULL,
    "nameRu" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "nameEn" TEXT NOT NULL,
    "nameRu" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artist" (
    "id" SERIAL NOT NULL,
    "personId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,
    "photoId" INTEGER NOT NULL,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Person_nameEn_key" ON "Person"("nameEn");

-- CreateIndex
CREATE UNIQUE INDEX "Person_nameRu_key" ON "Person"("nameRu");

-- CreateIndex
CREATE UNIQUE INDEX "Person_url_key" ON "Person"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Role_nameEn_key" ON "Role"("nameEn");

-- CreateIndex
CREATE UNIQUE INDEX "Role_nameRu_key" ON "Role"("nameRu");

-- CreateIndex
CREATE UNIQUE INDEX "Role_url_key" ON "Role"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Artist_personId_roleId_photoId_key" ON "Artist"("personId", "roleId", "photoId");

-- AddForeignKey
ALTER TABLE "Artist" ADD CONSTRAINT "Artist_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artist" ADD CONSTRAINT "Artist_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artist" ADD CONSTRAINT "Artist_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "Photo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
