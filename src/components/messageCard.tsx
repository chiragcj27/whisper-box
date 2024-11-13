import React, { useState } from 'react';

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

const MessageCard: React.FC<MessageCardProps> = ({ message, onDelete, onPublish }) => {

  const handleTogglePublish = async () => {
    try {
      await onPublish(message._id, !message.isPublished);
    } catch (error) {
      console.error('Failed to update publish status:', error);
    }
  };

  return (
    <div className="message-card border border-gray-300 rounded-lg shadow-md p-6 mb-4 flex items-start justify-between bg-white">
      <div>
        <p className="message-content text-lg font-semibold text-gray-800 mb-2">{message.content}</p>
        <p className="message-date text-sm text-gray-500">{new Date(message.createdAt).toLocaleString()}</p>
      </div>
      {message.noOfstars > 0 && (<>
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3l2.76 5.5 6.24.9-4.5 4.38 1.06 6.16L10 16.5 4.44 19.04l1.06-6.16-4.5-4.38 6.24-.9L10 3z" clipRule="evenodd" />
          </svg>
          <p className="text-yellow-400 font-semibold">{message.noOfstars}</p>
        </div>
      </>)}
      <div className="button-group flex space-x-2">
        <button
          className="delete-button bg-red-500 hover:bg-red-600 text-white font-medium rounded-md px-3 py-1.5 transition duration-200"
          onClick={() => onDelete(message._id)}
        >
          Delete
        </button>
        <button
          className={`publish-button ${
            message.isPublished ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'
          } text-white font-medium rounded-md px-3 py-1.5 transition duration-200`}
          onClick={handleTogglePublish}
        >
          {message.isPublished ? 'Unpublish' : 'Publish'}
        </button>
      </div>
    </div>
  );
};

export default MessageCard;
