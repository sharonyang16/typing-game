-- CreateTable
CREATE TABLE "typing_test" (
    "id" SERIAL NOT NULL,
    "wordsTyped" TEXT NOT NULL,
    "timeToComplete" DOUBLE PRECISION NOT NULL,
    "rawWpm" INTEGER NOT NULL,
    "accuracy" INTEGER NOT NULL,
    "wpm" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "PK_cb119115f89df3bdbbfa207ae5a" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "firebaseId" TEXT NOT NULL,
    "dateJoined" DATE NOT NULL,

    CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UQ_97672ac88f789774dd47f7c8be3" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_1c2d0bf809fd5f537a43d8f8d8e" ON "users"("firebaseId");

-- AddForeignKey
ALTER TABLE "typing_test" ADD CONSTRAINT "typing_test_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
