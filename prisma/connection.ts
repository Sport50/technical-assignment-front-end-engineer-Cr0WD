import { PrismaClient } from '@prisma/client'

declare global {
	// By prisma reference
	// noinspection ES6ConvertVarToLetConst
	var prisma: PrismaClient | undefined // eslint-disable-line
}

export const prisma = global.prisma || new PrismaClient() // eslint-disable-line

if (process.env.NODE_ENV !== 'production') global.prisma = prisma
