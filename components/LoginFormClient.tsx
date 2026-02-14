"use client";

import { useState } from "react";

import { loginWithCredentials } from "@/lib/actions/auth-actions";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Link from "next/link";

export default function LoginFormClient(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const user = await loginWithCredentials(email, password);
    console.log(user);
    
    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm bg-white space-y-4 border p-6 rounded-lg shadow"
    >
      <h2 className="text-xl font-semibold text-center">Login</h2>

      <div className="space-y-2">
        <label htmlFor="email">Email</label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password">Password</label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <p>Don't have account? <Link href={'/register'}>register</Link></p>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
};
