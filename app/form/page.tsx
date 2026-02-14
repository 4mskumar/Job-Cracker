import { auth } from "@/auth";
import LoginFormClient from "@/components/LoginFormClient";
import { redirect } from "next/navigation";

export default async function LoginForm() {

  const session = await auth()
  console.log(session);
  

  if(session){
    redirect('/dashboard')
  }

  return (
    <div className="flex items-center w-full h-[70vh] justify-center">
      <LoginFormClient />
    </div>
  );
}
    