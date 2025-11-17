-- DropForeignKey
ALTER TABLE "typing_test" DROP CONSTRAINT "typing_test_userId_fkey";

-- AddForeignKey
ALTER TABLE "typing_test" ADD CONSTRAINT "typing_test_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
