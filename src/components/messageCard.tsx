import React from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";

interface MessageCardProps {
  message: {
    _id: string;
    content: string;
    createdAt: string;
    noOfstars: number;
    isPublished: boolean;
  };
  onDelete: (id: string) => void;
  onPublish: (id: string, isPublished: boolean) => Promise<void>;
}

const MessageCard: React.FC<MessageCardProps> = ({
  message,
  onDelete,
  onPublish,
}) => {
  const handleTogglePublish = async () => {
    try {
      await onPublish(message._id, !message.isPublished);
    } catch (error) {
      console.error("Failed to update publish status:", error);
    }
  };

  return (
    <Card className="rounded-lg shadow-lg mb-2 ">
      <CardContent className="mt-2 flex flex-row justify-between">
        <CardTitle className="text-2xl mt-3 font-normal">
          {message.content}
        </CardTitle>
        {message.noOfstars > 0 && (
          <div className="flex items-center space-x-2 text-yellow-400">
            {Array.from({ length: message.noOfstars }).map((_, index) => (
              <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3l2.76 5.5 6.24.9-4.5 4.38 1.06 6.16L10 16.5 4.44 19.04l1.06-6.16-4.5-4.38 6.24-.9L10 3z"
                  clipRule="evenodd"
                />
              </svg>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="mt-62flex flex-row justify-between space-x-4">
        <div className="flex space-x-3">
          <Button
            className="bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg px-4 py-2 transition duration-200"
            onClick={() => onDelete(message._id)}
          >
            Delete
          </Button>
          <Button
            className={`${
              message.isPublished
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-green-500 hover:bg-green-600"
            } text-white font-medium rounded-lg px-4 py-2 transition duration-200`}
            onClick={handleTogglePublish}
          >
            {message.isPublished ? "Unpublish" : "Publish"}
          </Button>
        </div>
        <CardDescription className="text-sm  text-gray-400">
          {new Date(message.createdAt).toLocaleString()}
        </CardDescription>
      </CardFooter>
    </Card>
  );
};

export default MessageCard;
