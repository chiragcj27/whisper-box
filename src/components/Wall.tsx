import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "./ui/use-toast";
import MessageCard from "./messageCard";
import PublishedMessageCard from "./PublishedMessageCard";
// Removed incorrect import

interface Message {
  _id: string;
  content: string;
  createdAt: string;
}

export default function Wall() {
  const { data: session, status } = useSession();
 
  const [publishedMessages, setPublishedMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  async function getPublishedMessages() {
    try {
      const res = await axios.get("/api/get-published-messages",{headers: { username: window.location.href.split("/").pop()  }});
      if (res.data.success) {
        setPublishedMessages(res.data.publishedMessages);
      } else {
        toast({ title: "Error", description: res.data.message});
      }
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Failed to fetch messages" });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (status === "authenticated") {
      getPublishedMessages();
    }
  }, [status]);

 

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <ScrollArea className="h-[350px] w-[750px] rounded-md border p-4">
      {publishedMessages.length > 0 ? (
        publishedMessages.map((message) => (
          <PublishedMessageCard key={message._id} message={message} />
        ))
      ) : (
        <p>No messages available</p>
      )}
    </ScrollArea>
  );
}
