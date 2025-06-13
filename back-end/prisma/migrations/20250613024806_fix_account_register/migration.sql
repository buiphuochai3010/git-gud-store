-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "register_code" INTEGER,
ADD COLUMN     "register_code_expiry" TIMESTAMP(3);
