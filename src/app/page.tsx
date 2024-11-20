import Navbar from "@/components/Navbar";
import Image from "next/image";
import inlove from "@/illustrations/inlove.svg"
import { TypewriterTitle } from "@/components/TypewriterTitle";

export default function Home() {
  return (
    <div>
      <div className="object-top">  
      <TypewriterTitle/> 
      </div>
      <div className="-z-10 fixed bottom-0 right-0 ">
        <Image height={500} width={500} src={inlove} alt="image"/>
      </div>
    </div>
  );
}
