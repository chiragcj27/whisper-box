"use client"

import CopyUrlComponent from "@/components/CustomUrl";
import { useSession } from "next-auth/react";
import mindfullness from "@/illustrations/mindfullness.svg"
import wandering from "@/illustrations/wandering.svg"
import Image from "next/image";
import AcceptMessage from "@/components/AcceptMessage";

export default function Dashboard() {
  const session = useSession();
  const user = session.data?.user
  const username = user?.username
  const customUrl = "http://localhost:3000/send-message/"+username
  return (
   <>
   <div className="ml-10 mt-10">
        <text className="text-6xl font-medium font-serif capitalize">
            Hello {username} !!
        </text>
   </div>
   <div className="">
    {/* <div className="ml-10 mt-10 flex">
        Copy your Url
    </div>
   <div className="ml-10 mt-3 flex">
   <CopyUrlComponent url={customUrl} />
   </div>
   <AcceptMessage/> */}
   <div className="fixed bottom-0 right-0 width-24 m-4 height-24">
        <Image src={wandering} alt ="mindfullness image" />
   </div>
   </div>
   </>
  );
}
