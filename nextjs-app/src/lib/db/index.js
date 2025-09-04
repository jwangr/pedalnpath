import { PrismaClient } from '@/generated/prisma'

export const db = new PrismaClient()
// use `prisma` in your application to read and write data in your DB
// this db object/client can create, save, delete and fetch snippets