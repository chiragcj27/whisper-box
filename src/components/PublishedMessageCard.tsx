import { Rating } from '@mui/material';
import React from 'react';

interface PublishedMessageCardProps {
  message: {
    _id: string;
    content: string;
    createdAt: string;
    noOfstars: number;
  };
}

const MessageCard: React.FC<PublishedMessageCardProps> = ({ message }) => {
  return (
    <div className="message-card border dark:bg-black bg-white rounded-md p-4 mb-2 flex justify-between items-center">
      <div>
        <p className="message-content">{message.content}</p>
        <p className="message-date text-sm text-gray-500">{new Date(message.createdAt).toLocaleString()}</p>
      </div>
      <div>
        {message.noOfstars > 0 && (<Rating value={message.noOfstars} readOnly />)}
      </div>
    </div>
  );
};

export default MessageCard;
