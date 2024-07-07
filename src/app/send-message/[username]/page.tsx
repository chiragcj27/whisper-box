"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import SuggestedMessages from "@/components/SuggestedMessages";
import team_up from "@/illustrations/team_up.svg";
import Image from "next/image";

export default function Page() {
  const params = useParams<{ username: string }>();
  const username = params.username;
  const [content, setContent] = useState("");

  async function onSend() {
    try {
      const response = await axios.post("/api/send-message", {
        username,
        content,
      });
      toast({
        title: response.data?.success ? "Success" : "Failed",
        description: response.data?.message,
      });
      setContent(""); // Clear the text field
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 403) {
          toast({
            title: "Failed !!",
            description: error.response.data?.message,
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Failed !!",
          description: "Something unexpected happened",
          variant: "destructive",
        });
      }
    }
  }

  return (
    <div className="min-h-screen grid md:grid-cols-3 grid-cols-1">
      <div className="bg-slate-600 relative">
        <div className="absolute bottom-0 left-0 p-4 md:p-0">
          <Image src={team_up} alt="illustration" className="w-24 md:w-auto" />
        </div>
      </div>
      <div className="mt-20 md:mt-60 mx-4 md:mx-56 md:col-span-2 col-span-1">
        <div className="flex w-full max-w-screen-md space-x-2">
          <Input
            type="text"
            placeholder="Enter your message"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="mt-3">
          <Button onClick={onSend} className="mr-2">Send</Button>
          <SuggestedMessages/>
        </div>
      </div>
    </div>
  );
}
