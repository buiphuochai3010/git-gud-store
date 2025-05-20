/*
  Warnings:

  - You are about to drop the column `userId` on the `Account` table. All the data in the column will be lost.
  - The `account_type` column on the `Account` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `user_id` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('LOCAL', 'GOOGLE');

-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropIndex
DROP INDEX "Account_userId_key";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "userId",
ADD COLUMN     "user_id" INTEGER NOT NULL,
DROP COLUMN "account_type",
ADD COLUMN     "account_type" "AccountType" NOT NULL DEFAULT 'LOCAL',
ALTER COLUMN "jwt_token" DROP NOT NULL,
ALTER COLUMN "jwt_token_expiry" DROP NOT NULL;

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" SERIAL NOT NULL,
    "action" TEXT NOT NULL,
    "table_name" TEXT NOT NULL,
    "old_data" JSONB,
    "new_data" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "account_id" INTEGER NOT NULL,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
