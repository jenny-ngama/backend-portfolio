-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "requestId" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "date_inscription" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "requestId" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "objet" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "confirmed" BOOLEAN NOT NULL DEFAULT false,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reponse" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

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
CREATE UNIQUE INDEX "User_requestId_key" ON "User"("requestId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Message_requestId_key" ON "Message"("requestId");

-- CreateIndex
CREATE UNIQUE INDEX "MessageReponse_requestId_key" ON "MessageReponse"("requestId");

-- CreateIndex
CREATE UNIQUE INDEX "MessageReponse_messageRequestId_key" ON "MessageReponse"("messageRequestId");

-- AddForeignKey
ALTER TABLE "MessageReponse" ADD CONSTRAINT "MessageReponse_messageRequestId_fkey" FOREIGN KEY ("messageRequestId") REFERENCES "Message"("requestId") ON DELETE RESTRICT ON UPDATE CASCADE;
