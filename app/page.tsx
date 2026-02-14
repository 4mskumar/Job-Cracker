import { RainbowButton } from "@/components/ui/rainbow-button";
import { Skiper19 } from "@/components/ui/skiper-ui/skiper19";
import { loginWithGitHub } from "@/lib/actions/auth-actions";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-zinc-900 font-sans dark:bg-black">
      {/* <main className="flex flex-col gap-2 w-full justify-center h-[70vh] px-10">
        <div className="flex flex-col gap-2 items-start">
          <h1 className="text-6xl font-bold text-zinc-100 tracking-tight">
            Your Personal Job Application<br></br> Management Dashboard.
          </h1>
          <p className="text-md font-medium tracking-tight text-zinc-600">
            Stop losing track of applications in spreadsheets and notes.
          </p>
        </div>
        <div>
          <form action={loginWithGitHub}>
            <RainbowButton>Track Your Jobs Now</RainbowButton>
          </form>
        </div>
        <Skiper19 />
      </main> */}
      <Skiper19 />
    </div>
  );
}
