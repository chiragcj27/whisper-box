"use client";
import { useState } from "react";
import SendFeedbackCard from "@/components/SendFeedbackCard";
import SendMessageCard from "@/components/SendMessageCard";
import Wall from "@/components/Wall";
import mail from "@/illustrations/mail.webp";
import starfirst from "@/illustrations/starfirst.png";
import stargif from "@/illustrations/giphy.webp";
import firstframe from "@/illustrations/1frame.png";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { TextHoverEffect } from "@/components/ui/TextHover";
import Navbar from "@/components/Navbar";

export default function Page() {
  const [showButtons, setShowButtons] = useState(true);
  const [showSendMessageCard, setShowSendMessageCard] = useState(false);
  const [showSendFeedbackCard, setShowSendFeedbackCard] = useState(false);

  const handleSendMessageClick = () => {
    setShowButtons(false);
    setShowSendMessageCard(true);
  };

  const handleSendFeedbackClick = () => {
    setShowButtons(false);
    setShowSendFeedbackCard(true);
  };

  const handleFormSubmit = () => {
    setShowButtons(true); 
    setShowSendMessageCard(false);
    setShowSendFeedbackCard(false);
  };

  const handleGoBack = () => {
    setShowButtons(true);
    setShowSendMessageCard(false);
    setShowSendFeedbackCard(false);
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen grid md:grid-cols-3 grid-cols-1 gap-4 p-4">
      <div className="bg-slate-600 size-full p-4 ">
        <div className="p-4 size-full md:p-0">
          <Wall />
        </div>
      </div>
      <div className="bg-slate-700 md:col-span-2 flex flex-col items-center justify-center p-4 overflow-hidden">
        {showButtons && (
          <div className="flex flex-col items-center space-y-8">
          
            <TextHoverEffect text="Whisper It!" />
          
          <div className="flex flex-row items-center space-x-8">
          <div className="w-full max-w-80 cursor-pointer group w-80 " onClick={handleSendMessageClick}>
            <Card className="p-4 rounded-2xl shadow-lg shadow-blue-200">
              <div className="relative w-24 h-24 mx-auto">
                <img 
                  
                  src={firstframe.src} 
                  alt="Send Message" 
                  className="w-full h-full pb-2 absolute group-hover:hidden"
                />
                <img 
                  src={mail.src} 
                  alt="Send Message Animation" 
                  className="w-full h-full pb-2 absolute hidden group-hover:block"
                />
              </div>
              <CardTitle className="text-center text-lg">Send Message</CardTitle>
              <CardDescription className="text-base text-center mx-2">
                Send an anonymous message to them. Dont know what to say? AI can help you with that.
              </CardDescription>
            </Card>
          </div>
        
          <div className="w-full max-w-80 cursor-pointer group w-80 " onClick={handleSendFeedbackClick}>
            <Card className="p-4 rounded-2xl shadow-lg shadow-blue-200">
              <div className="relative w-[225px] h-24 mx-auto">
                <img 
                  src={starfirst.src} 
                  alt="Send Feedback" 
                  className="w-full h-full absolute group-hover:hidden"
                />
                <img 
                  src={stargif.src} 
                  alt="Send Feedback Animation" 
                  className="w-full h-full absolute hidden group-hover:block"
                />
              </div>
              <CardTitle className="text-center text-lg">Send Feedback</CardTitle>
              <CardDescription className="text-base text-center mx-2">
                Share an anonymous feedback to help them improve or address your concerns.
              </CardDescription>
            </Card>
          </div>
        </div>
        </div>
        
        )}
        {showSendMessageCard && (
          <div className="w-full max-w-md p-4">
            <SendMessageCard onSubmit={handleFormSubmit} onGoBack={handleGoBack} />
          </div>
        )}
        {showSendFeedbackCard && (
          <div className="w-full max-w-md p-4">
            <SendFeedbackCard onSend={handleFormSubmit} onGoBack={handleGoBack} />
          </div>
        )}
      </div>
    </div>
    </>
  );
}