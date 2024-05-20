/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Project` table without a default value. This is not possible if the table is not empty.

*/

-- DropForeignKey
ALTER TABLE "Quotation" DROP CONSTRAINT "Quotation_createdById_fkey";

-- AlterTable
ALTER TABLE "Project" ADD COLUMN "description" TEXT;
ALTER TABLE "Project" ADD COLUMN "title" TEXT DEFAULT 'Default Title';
ALTER TABLE "Project" ADD COLUMN "userId" INTEGER DEFAULT 1;  -- Assuming user with ID 1 exists

-- Update the existing rows to have a valid userId and title
UPDATE "Project" SET "title" = 'Default Title' WHERE "title" IS NULL;
UPDATE "Project" SET "userId" = 1 WHERE "userId" IS NULL;  -- Assuming user with ID 1 exists

-- Make columns required after setting default values
ALTER TABLE "Project" ALTER COLUMN "title" SET NOT NULL;
ALTER TABLE "Project" ALTER COLUMN "userId" SET NOT NULL;

ALTER TABLE "Project" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Quotation" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
