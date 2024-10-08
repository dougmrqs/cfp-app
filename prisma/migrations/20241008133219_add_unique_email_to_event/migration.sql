/*
  Warnings:

  - You are about to drop the column `email` on the `Event` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Event` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "email";

-- CreateIndex
CREATE UNIQUE INDEX "Event_name_key" ON "Event"("name");
