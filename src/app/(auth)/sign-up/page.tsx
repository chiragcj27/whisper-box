'use client'
import SignUpForm from "@/components/SignUpForm";
import DotPattern from "@/components/Dot-Pattern";

export default function Signup() {
    
    // return <div>
    //     <div className="z-1"><DotPattern/></div>
    //     <div className="h-screen z-2 bg-gray-100 flex items-center justify-center">
    //     <SignUpForm />      
    // </div>
    // </div>

    return (
        <div className="relative h-screen w-full">
            <div className="absolute inset-0 z-0">
                <DotPattern />
            </div>
            <div className="absolute inset-0 z-10 flex items-center justify-center">
                <SignUpForm />
            </div>
        </div>
    );
    
}