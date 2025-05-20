/*
  Warnings:

  - You are about to drop the column `jwt_token` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `jwt_token_expiry` on the `Account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "jwt_token",
DROP COLUMN "jwt_token_expiry",
ADD COLUMN     "access_token" TEXT,
ADD COLUMN     "access_token_expiry" TIMESTAMP(3),
ADD COLUMN     "refresh_token" TEXT,
ADD COLUMN     "refresh_token_expiry" TIMESTAMP(3);
