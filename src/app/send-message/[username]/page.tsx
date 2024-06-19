"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";


export default function Page() {
  const params = useParams<{ username: string }>();
  const username = params.username;
  const [content, setContent] = useState("");

  async function onSend() {
    try {
      const response = await axios.post(
        "/api/send-message",
        {
          username,
          content,
        }
      );
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
            variant: "destructive"
          });
        }
      } else {
        toast({
            title: "Failed !!",
            description: "Something unexpected happened",
            variant: "destructive"
          });
      }
    }
  }

  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="text"
        placeholder="Enter your message"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button onClick={onSend}>Send</Button>
    </div>
  );
}
