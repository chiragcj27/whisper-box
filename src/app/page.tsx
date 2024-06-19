import Navbar from "@/components/Navbar";
import Image from "next/image";
import inlove from "@/illustrations/inlove.svg"
import { TypewriterTitle } from "@/components/TypewriterTitle";

export default function Home() {
  return (
    <div>
      <TypewriterTitle/>
      <div className="fixed bottom-0 right-0 ">
        <Image src={inlove} alt="image"/>
      </div>
    </div>
  );
}
