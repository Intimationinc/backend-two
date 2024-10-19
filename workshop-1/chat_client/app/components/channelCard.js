import React from 'react'

function ChannelCard({ name, onClick }) {
    return (
      <div className="flex items-center p-4 bg-white rounded-lg shadow-md space-x-4 cursor-pointer" onClick={onClick}>
        {/* Channel Name */}
        <div className="text-base sm:text-lg font-medium">
          {name}
        </div>
      </div>
    );
  }
  

export default ChannelCard