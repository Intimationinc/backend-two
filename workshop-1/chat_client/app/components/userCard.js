import React from 'react'

function UserCard({ name, onClick }) {
    return (
      <div className="flex items-center p-4 bg-white rounded-lg shadow-md space-x-4 cursor-pointer" onClick={onClick}>
        {/* Avatar */}
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-300 rounded-full flex items-center justify-center">
          <span className="text-gray-500 text-sm sm:text-lg">
            {name.charAt(0).toUpperCase()}
          </span>
        </div>
        {/* User Name */}
        <div className="text-base sm:text-lg font-medium">
          {name}
        </div>
      </div>
    );
  }
  

export default UserCard