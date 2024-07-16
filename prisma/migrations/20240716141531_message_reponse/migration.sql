-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "reponse" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "MessageReponse" (
    "id" SERIAL NOT NULL,
    "requestId" TEXT NOT NULL,
    "objet" TEXT NOT NULL,
    "reponse" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "messageRequestId" TEXT NOT NULL,

    CONSTRAINT "MessageReponse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MessageReponse_requestId_key" ON "MessageReponse"("requestId");

-- CreateIndex
CREATE UNIQUE INDEX "MessageReponse_messageRequestId_key" ON "MessageReponse"("messageRequestId");

-- AddForeignKey
ALTER TABLE "MessageReponse" ADD CONSTRAINT "MessageReponse_messageRequestId_fkey" FOREIGN KEY ("messageRequestId") REFERENCES "Message"("requestId") ON DELETE RESTRICT ON UPDATE CASCADE;
