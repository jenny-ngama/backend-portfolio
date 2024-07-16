/*
  Warnings:

  - You are about to drop the column `reponse` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the `MessageReponse` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MessageReponse" DROP CONSTRAINT "MessageReponse_messageRequestId_fkey";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "reponse";

-- DropTable
DROP TABLE "MessageReponse";
