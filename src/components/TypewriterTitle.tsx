"use client";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { useRouter } from "next/navigation";
import { text } from "stream/consumers";
export function TypewriterTitle() {
  const router = useRouter();
  const words = [
    {
      text: "WhisperBox :",
      className: "text-blue-500 dark:text-blue-500",
    },
    {
      text: "The",
    },
    {
      text: "Anonymous",
    },
    {
      text: "Messenger",
    },
    {
      text: "of",
    },
    {
      text: "Secrets!",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[40rem]  ">
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
        The road to secrets starts from here
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        {/* <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
          Join now
        </button> */}
        <button
          onClick={() => {router.push('/sign-up')}}
          className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
