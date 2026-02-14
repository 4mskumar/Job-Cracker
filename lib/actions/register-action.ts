'use server'

import bcrypt from 'bcrypt'
import { prisma } from '../prisma'

export async function registerUser(email: string, password: string, name ?: string){
    const hashedPassword = await bcrypt.hash(password, 10)
    // console.log(email, password, name);
    

    await prisma.user.create({
        data: {

            email,
            password: hashedPassword,
            name
        }
    })
}