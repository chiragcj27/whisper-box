import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import wall from "@/illustrations/sloth.png";
import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "./ui/use-toast";
import PublishedMessageCard from "./PublishedMessageCard";

interface Message {
  _id: string;
  content: string;
  createdAt: string;
  noOfstars: number;
}

export default function Wall() {
  const [publishedMessages, setPublishedMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  async function getPublishedMessages() {
    try {
      const res = await axios.get("/api/get-published-messages", {
        headers: { username: window.location.href.split("/").pop() },
      });
      if (res.data.success) {
        setPublishedMessages(res.data.publishedMessages);
      } else {
        toast({ title: "Error", description: res.data.message });
      }
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Failed to fetch messages" });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
      setInterval(()=>{getPublishedMessages();},10000);
    },[]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <ScrollArea className="size-full rounded-md border p-4">
      {publishedMessages.length > 0 ? (
        publishedMessages.map((message) => (
          <PublishedMessageCard key={message._id} message={message} />
        ))
      ) : (
        <>
        <Image src={wall} alt="No messages" className=" pt-10 content-end" />
        <p className="text-center text-white">No Published Whispers To checkout at this moment</p>
        </>
      )}
    </ScrollArea>
  );
}
