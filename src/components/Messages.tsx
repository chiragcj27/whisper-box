import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "./ui/use-toast";
import MessageCard from "./messageCard";

interface Message {
  _id: string;
  content: string;
  createdAt: string;
  noOfstars : number;
  isPublished: boolean;
}

export default function Message() {
  const { data: session, status } = useSession();
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  async function getMessages() {
    try {
      const res = await axios.get("/api/get-messages");
      if (res.data.success) {
        setMessages(res.data.messages);
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
    if (status === "authenticated") {
      getMessages();
    }
  }, [status]);

  async function handleDelete(messageId: string) {
    try {
      const res = await axios.delete(`/api/delete-message/${messageId}`);
      if (res.data.success) {
        setMessages(messages.filter((message) => message._id !== messageId));
        toast({ title: "Success", description: "Message deleted successfully" });
      } else {
        toast({ title: "Error", description: res.data.message });
      }
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Failed to delete message" });
    }
  }

  async function handlePublish(messageId: string, isPublished: boolean) {
    try {
      const res = await axios.post(`/api/publish-message/${messageId}`, { action: !isPublished });
      if (res.data.success) {
        setMessages(messages.map(message => 
          message._id === messageId ? { ...message, isPublished: !isPublished } : message
        ));
        toast({ title: "Success", description: `Message ${isPublished ? 'unpublished' : 'published'} successfully` });
      } else {
        toast({ title: "Error", description: res.data.message });
      }
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Failed to publish/unpublish message" });
    }
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <ScrollArea className="h-[350px] w-[750px] rounded-md border p-4">
      {messages.length > 0 ? (
        messages.map((message) => (
          <MessageCard 
            key={message._id} 
            message={message} 
            onDelete={handleDelete} 
            onPublish={() => handlePublish(message._id, message.isPublished)}
          />
        ))
      ) : (
        <p>No messages available</p>
      )}
    </ScrollArea>
  );
}