-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "avatar_id" INTEGER;

-- CreateTable
CREATE TABLE "File" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" TEXT,
    "size" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "File_uid_key" ON "File"("uid");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_avatar_id_fkey" FOREIGN KEY ("avatar_id") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;
