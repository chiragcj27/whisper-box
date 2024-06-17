import React from 'react';

interface MessageCardProps {
  message: {
    _id: string;
    content: string;
    createdAt: string;
  };
  onDelete: (id: string) => void;
}

const MessageCard: React.FC<MessageCardProps> = ({ message, onDelete }) => {
  return (
    <div className="message-card border rounded p-4 mb-2 flex justify-between items-center">
      <div>
        <p className="message-content">{message.content}</p>
        <p className="message-date text-sm text-gray-500">{new Date(message.createdAt).toLocaleString()}</p>
      </div>
      <button 
        className="delete-button bg-red-500 text-white rounded px-2 py-1"
        onClick={() => onDelete(message._id)}
      >
        Delete
      </button>
    </div>
  );
};

export default MessageCard;
