import React, { useState } from 'react';

interface MessageCardProps {
  message: {
    _id: string;
    content: string;
    createdAt: string;
  };
  onDelete: (id: string) => void;
  onPublish: (id: string, isPublished: boolean) => void;
}

const MessageCard: React.FC<MessageCardProps> = ({ message, onDelete, onPublish }) => {
  const [isPublished, setIsPublished] = useState(false);

  const handleTogglePublish = () => {
    onPublish(message._id, !isPublished);
    setIsPublished(!isPublished);
  };

  return (
    <div className="message-card border border-gray-300 rounded-lg shadow-md p-6 mb-4 flex items-start justify-between bg-white">
      <div>
        <p className="message-content text-lg font-semibold text-gray-800 mb-2">{message.content}</p>
        <p className="message-date text-sm text-gray-500">{new Date(message.createdAt).toLocaleString()}</p>
      </div>
      <div className="button-group flex space-x-2">
        <button
          className="delete-button bg-red-500 hover:bg-red-600 text-white font-medium rounded-md px-3 py-1.5 transition duration-200"
          onClick={() => onDelete(message._id)}
        >
          Delete
        </button>
        <button
          className={`publish-button ${
            isPublished ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'
          } text-white font-medium rounded-md px-3 py-1.5 transition duration-200`}
          onClick={handleTogglePublish}
        >
          {isPublished ? 'Unpublish' : 'Publish'}
        </button>
      </div>
    </div>
  );
};

export default MessageCard;
