"use client";
import { useState } from "react";
import SendFeedbackCard from "@/components/SendFeedbackCard";
import SendMessageCard from "@/components/SendMessageCard";
import Wall from "@/components/Wall";

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
    <div className="min-h-screen grid md:grid-cols-3 grid-cols-1 gap-4 p-4">
      <div className="bg-slate-600 relative p-4 overflow-hidden">
        <div className="absolute bottom-0 left-0 p-4 md:p-0">
          <Wall />
        </div>
      </div>
      <div className="bg-slate-700 md:col-span-2 flex flex-col items-center justify-center p-4 overflow-hidden">
        {showButtons && (
          <div className="flex flex-col items-center space-y-4">
            <button
              className="bg-slate-800 p-4 m-2 rounded text-white"
              onClick={handleSendMessageClick}
            >
              Send Message
            </button>
            <button
              className="bg-slate-800 p-4 m-2 rounded text-white"
              onClick={handleSendFeedbackClick}
            >
              Send Feedback
            </button>
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
  );
}