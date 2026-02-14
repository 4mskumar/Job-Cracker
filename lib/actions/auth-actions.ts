'use server'

import { signIn, signOut } from "@/auth";


export async function loginWithGitHub(){
    await signIn('github', {
        redirectTo: '/dashboard'
    })
}

export async function loginWithCredentials(email: string, password:string){
    await signIn('credentials', {
        email,
        password, 
        redirectTo: '/dashboard'
    })
}

export async function logout(){
    await signOut({redirectTo: '/'})
}