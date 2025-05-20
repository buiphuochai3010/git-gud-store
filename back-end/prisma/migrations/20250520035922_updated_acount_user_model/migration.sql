/*
  Warnings:

  - You are about to drop the column `accountId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `jwt_token` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jwt_token_expiry` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `full_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_accountId_fkey";

-- DropIndex
DROP INDEX "User_accountId_key";

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "account_type" TEXT NOT NULL DEFAULT 'LOCAL',
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "jwt_token" TEXT NOT NULL,
ADD COLUMN     "jwt_token_expiry" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "accountId",
DROP COLUMN "name",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "full_name" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Account_userId_key" ON "Account"("userId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
