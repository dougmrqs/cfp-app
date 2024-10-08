-- DropForeignKey
ALTER TABLE "Proposal" DROP CONSTRAINT "Proposal_authorId_fkey";

-- AddForeignKey
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
