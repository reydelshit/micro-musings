-- DropForeignKey
ALTER TABLE "Likes" DROP CONSTRAINT "Likes_postId_fkey";

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "like" INTEGER NOT NULL DEFAULT 0;
