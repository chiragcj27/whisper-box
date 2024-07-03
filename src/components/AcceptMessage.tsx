import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card } from "./ui/card";

const AcceptMessage: React.FC = () => {
  const { data: session } = useSession();
  const user: any = session?.user;
  const [isAcceptingMessage, setIsAcceptingMessage] = useState<boolean>(
    user?.isAcceptingMessages ?? false
  );

  useEffect(() => {
    if (user) {
      setIsAcceptingMessage(user.isAcceptingMessages);
      
    }
  }, [user]);

  const handleToggle = async () => {
    if (!user) return; // Ensure user is defined

    const newStatus = !isAcceptingMessage;
    setIsAcceptingMessage(newStatus);

    try {
      const response = await axios.post("/api/accept-messages", {
        userId: user._id,
        acceptMessages: newStatus,
      });

      console.log("Response from server:", response.data);
    } catch (error) {
      console.error("Failed to update accepting messages status:", error);
      // Revert the state if API call fails
      setIsAcceptingMessage(!newStatus);
    }
  };

  return (
    <div>
      <Card>
        <div className="m-2 flex items-center space-x-2">
          <Switch
            id="accepting-message"
            checked={isAcceptingMessage}
            onCheckedChange={handleToggle}
          />
          <Label htmlFor="accepting-message">
            Accept Messages:
            {isAcceptingMessage ? "On" : "Off"}
          </Label>
        </div>
      </Card>
    </div>
  );
};

export default AcceptMessage;
