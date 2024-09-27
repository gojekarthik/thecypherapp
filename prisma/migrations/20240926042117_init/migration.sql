/*
  Warnings:

  - Added the required column `h_password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "h_password" TEXT NOT NULL;
