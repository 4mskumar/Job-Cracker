"use client";

import CardSwap, { Card } from "@/components/CardSwap";
import { loginWithGitHub } from "@/lib/actions/auth-actions";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import React, { useRef } from "react";
// import { Card } from "../card";

const Skiper19 = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
  });

  return (
    <section
      ref={ref}
      className="mx-auto flex h-[275vh] w-screen flex-col  overflow-hidden bg-zinc-900 px-4 text-blue"
    >
      <div className="mt-42 relative flex w-fit  flex-col items-center justify-center gap-5 text-left">
        <div className="pl-10">
          <h1 className="font-jakarta-sans relative z-10 text-7xl font-medium tracking-[-0.08em] lg:text-9xl">
            Your Personal Job
            <br /> Application <span className=" ">Management</span> <br /> Dashboard.
          </h1>
          <p className="font-jakarta-sans pl-2 z-10 text-xl text-left font-light text-[#e7f6ff]">
            Stop losing track of applications in spreadsheets and notes.
          </p>
        </div>
        <LinePath
          className="absolute  -right-[40%] top-0 z-0"
          scrollYProgress={scrollYProgress}
        />
      </div>

      <div className="translate-y-[30vh] z-10 w-full flex flex-col items-center justify-center gap-10 text-center">
        <h2 className="font-jakarta-sans font-medium text-5xl tracking-tighter">
          Everything You Need to Manage Your Job Search
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mt-10">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h3 className="text-xl font-medium">Add Applications</h3>
            <p className="mt-2 text-sm text-white/70">
              Save company, role, and date in seconds with a clean interface.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h3 className="text-xl font-medium">Track Status</h3>
            <p className="mt-2 text-sm text-white/70">
              Applied, Interview, Rejected, or Offer — always know where you
              stand.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h3 className="text-xl font-medium">Smart Notes</h3>
            <p className="mt-2 text-sm text-white/70">
              Add interview dates, feedback, and follow-ups per job.
            </p>
          </div>

          <div className="rounded-2xl border  border-white/10 bg-white/5 p-6 backdrop-blur">
            <h3 className="text-xl font-medium">Visual Dashboard</h3>
            <p className="mt-2 text-sm text-white/70">
              See all your job progress in one focused dashboard.
            </p>
          </div>
        </div>
      </div>

      {/* CTA SECTION */}
      <div className="mt-[40vh] z-10 flex flex-col items-center justify-center gap-6 text-center">
        <h3 className="font-jakarta-sans z-10 text-4xl font-medium tracking-tight">
          Start Tracking Smarter
        </h3>
        <p className="text-white/70 backdrop-blur-3xl px-2 border border-zinc-600 py-1 rounded-full max-w-xl">
          Organize your job applications, stay focused, and never miss an
          opportunity.
        </p>

        <div className="flex gap-4 mt-4">
          <form action={loginWithGitHub}>
            <button className="rounded-full bg-[#95c137] px-6 py-3 text-white font-medium hover:opacity-90 transition">
              Get Started
            </button>
          </form>
          <button className="rounded-full border border-white/20 px-6 py-3 text-white hover:bg-white/10 transition">
            View Demo
          </button>
        </div>
      </div>

      <div className="relative top-[40rem]">
        <div>
          <p className="text-8xl absolute -top-96 left-20 font-semibold font-gratosk-sans tracking-tighter ">
            Read what 
            people has <br /> to say about us
          </p>
        </div>
        <div className="">
          <CardSwap
            cardDistance={60}
            verticalDistance={70}
            delay={5000}
            pauseOnHover={false}
            width={650}
            height={450}
          >
            <Card className="bg-zinc-700 border border-zinc-800 rounded-2xl p-8 text-white shadow-xl">
              <p className="text-lg leading-relaxed tracking-tight font-medium text-zinc-200">
                “Before this app, I was tracking job applications in Google
                Sheets and still missing interviews. Now everything is in one
                place and I can see my progress clearly. Super clean and easy to
                use.”
              </p>

              <div className="flex items-center gap-4 mt-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center font-bold">
                  A
                </div>
                <div>
                  <h4 className="font-semibold">Aditya Sharma</h4>
                  <p className="text-sm text-zinc-400">Final Year CS Student</p>
                </div>
              </div>
            </Card>

            {/* Testimonial 2 */}
            <Card className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-white shadow-xl">
              <p className="text-lg leading-relaxed tracking-tight font-medium text-zinc-200">
                “I apply to 10–15 jobs a week and used to forget which company
                replied. This tracker helped me organize everything — applied,
                interview, rejected, and offers. It actually reduced my stress
                during job hunting.”
              </p>

              <div className="flex items-center gap-4 mt-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center font-bold">
                  R
                </div>
                <div>
                  <h4 className="font-semibold">Rohit Mehta</h4>
                  <p className="text-sm text-zinc-400">Frontend Developer</p>
                </div>
              </div>
            </Card>

            {/* Testimonial 3 */}
            <Card className="bg-zinc-700 border border-zinc-800 rounded-2xl p-8 text-white shadow-xl">
              <p className="text-lg leading-relaxed tracking-tight font-medium text-zinc-200">
                “Simple but powerful. I love how I can track every company and
                its current status without opening multiple apps. The UI feels
                modern and the dark theme is perfect for long usage.”
              </p>

              <div className="flex items-center gap-4 mt-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center font-bold">
                  S
                </div>
                <div>
                  <h4 className="font-semibold">Sneha Verma</h4>
                  <p className="text-sm text-zinc-400">UI/UX Designer</p>
                </div>
              </div>
            </Card>
          </CardSwap>
        </div>
      </div>
      <footer className="relative mt-32 translate-y-[102vh] bg-zinc-900 z-20 border-t border-white/10">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-pink-600/10 blur-2xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Brand */}
            <div className="text-white font-semibold text-lg">
              JobTrack<span className="text-purple-400">.</span>
            </div>

            {/* Links */}
            <div className="flex gap-6 text-sm text-zinc-400">
              <a href="#" className="hover:text-white transition">
                Features
              </a>
              <a href="#" className="hover:text-white transition">
                Pricing
              </a>
              <a href="#" className="hover:text-white transition">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition">
                Contact
              </a>
            </div>

            {/* Copyright */}
            <div className="text-sm text-zinc-500">
              © {new Date().getFullYear()} JobTrack. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
};

export { Skiper19 };

const LinePath = ({
  className,
  scrollYProgress,
}: {
  className: string;
  scrollYProgress: any;
}) => {
  const pathLength = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  return (
    <svg
      width="1278"
      height="2319"
      viewBox="0 0 1278 2319"
      fill="none"
      overflow="visible"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <motion.path
        d="M876.605 394.131C788.982 335.917 696.198 358.139 691.836 416.303C685.453 501.424 853.722 498.43 941.95 409.714C1016.1 335.156 1008.64 186.907 906.167 142.846C807.014 100.212 712.699 198.494 789.049 245.127C889.053 306.207 986.062 116.979 840.548 43.3233C743.932 -5.58141 678.027 57.1682 672.279 112.188C666.53 167.208 712.538 172.943 736.353 163.088C760.167 153.234 764.14 120.924 746.651 93.3868C717.461 47.4252 638.894 77.8642 601.018 116.979C568.164 150.908 557 201.079 576.467 246.924C593.342 286.664 630.24 310.55 671.68 302.614C756.114 286.446 729.747 206.546 681.86 186.442C630.54 164.898 492 209.318 495.026 287.644C496.837 334.494 518.402 366.466 582.455 367.287C680.013 368.538 771.538 299.456 898.634 292.434C1007.02 286.446 1192.67 309.384 1242.36 382.258C1266.99 418.39 1273.65 443.108 1247.75 474.477C1217.32 511.33 1149.4 511.259 1096.84 466.093C1044.29 420.928 1029.14 380.576 1033.97 324.172C1038.31 273.428 1069.55 228.986 1117.2 216.384C1152.2 207.128 1188.29 213.629 1194.45 245.127C1201.49 281.062 1132.22 280.104 1100.44 272.673C1065.32 264.464 1044.22 234.837 1032.77 201.413C1019.29 162.061 1029.71 131.126 1056.44 100.965C1086.19 67.4032 1143.96 54.5526 1175.78 86.1513C1207.02 117.17 1186.81 143.379 1156.22 166.691C1112.57 199.959 1052.57 186.238 999.784 155.164C957.312 130.164 899.171 63.7054 931.284 26.3214C952.068 2.12513 996.288 3.87363 1007.22 43.58C1018.15 83.2749 1003.56 122.644 975.969 163.376C948.377 204.107 907.272 255.122 913.558 321.045C919.727 385.734 990.968 497.068 1063.84 503.35C1111.46 507.456 1166.79 511.984 1175.68 464.527C1191.52 379.956 1101.26 334.985 1030.29 377.017C971.109 412.064 956.297 483.647 953.797 561.655C947.587 755.413 1197.56 941.828 936.039 1140.66C745.771 1285.32 321.926 950.737 134.536 1202.19C-6.68295 1391.68 -53.4837 1655.38 131.935 1760.5C478.381 1956.91 1124.19 1515 1201.28 1997.83C1273.66 2451.23 100.805 1864.7 303.794 2668.89"
        stroke="#95c137"
        strokeWidth="20"
        style={{
          pathLength,
          strokeDashoffset: useTransform(pathLength, (value) => 1 - value),
        }}
      />
    </svg>
  );
};

/**
 * Skiper 19 — React + framer motion
 * Inspired by and adapted from https://comgio.ai/
 * We respect the original creators. This is an inspired rebuild with our own taste and does not claim any ownership.
 * These animations aren’t associated with the comgio.ai . They’re independent recreations meant to study interaction design
 *
 * License & Usage:
 * - Free to use and modify in both personal and commercial projects.
 * - Attribution to Skiper UI is required when using the free version.
 * - No attribution required with Skiper UI Pro.
 *
 * Feedback and contributions are welcome.
 *
 * Author: @gurvinder-singh02
 * Website: https://gxuri.in
 * Twitter: https://x.com/Gur__vi
 */
