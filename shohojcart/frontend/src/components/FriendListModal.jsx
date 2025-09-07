import React from "react";
import { X } from "lucide-react";

const FriendListModal = ({ isOpen, onClose, friends = [] }) => {
  if (!isOpen) return null;

  // Helper to get the correct profile picture URL
  const getProfilePictureUrl = (profilePicture) => {
    if (profilePicture && profilePicture.url) {
      return profilePicture.url;
    }
    return "/default-profile.png";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Friends List</h2>
          <button
            onClick={onClose}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            <X size={24} />
          </button>
        </div>
        <ul className="space-y-3">
          {friends.map((friend) => (
            <li key={friend._id} className="flex items-center space-x-3">
              <img
                src={getProfilePictureUrl(friend.profilePictureId)}
                alt={friend.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-gray-900 dark:text-gray-100">{friend.name}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{friend.title}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FriendListModal;
