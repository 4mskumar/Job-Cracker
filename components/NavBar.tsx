'use client'

import { Session } from "next-auth";
import Link from "next/link";
import { Button } from "./ui/button";
import { GithubIcon, Mail } from "lucide-react";
import { loginWithCredentials, loginWithGitHub, logout } from "@/lib/actions/auth-actions";
import { RainbowButton } from "./ui/rainbow-button";

export default function NavBar({session}: {session : Session | null}){
    return (
        <div className="w-full h-10 flex items-center justify-between md:px-20 lg:px-5 sm:px-0 py-8">
            <div className="">
                <h1 className="text-2xl font-bold tracking-tighter text-white">JobCracker</h1>
            </div>
            <div>
                {
                    !session  ?    
                    <div className="flex items-center gap-4">
                        <form action={loginWithGitHub}>

                            <RainbowButton >
                            Login with <span><GithubIcon /></span>

                            </RainbowButton>                        
                        </form>
                        {/* <Link href={'/form'}>

                            <Button variant={'secondary'} className="cursor-pointer">
                            Login with <span><Mail /></span>

                            </Button>                        
                        </Link> */}
                        
                    </div>                    
                    : 
                    null
                }
            </div>
                {session ?
                    <Button onClick={logout} className=" bg-red-700 cursor-pointer" variant={'destructive'}>
                        Logout
                    </Button>
                    : ''
                }
        </div>
    )
}