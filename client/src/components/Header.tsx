import React from 'react';

export const Header: React.FC = () => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <button className="px-4 py-2 border-b-2 font-bold border-teal-500 focus:outline-none">
          Foreman Overview
        </button>
        <button className="ml-2 px-4 py-2 border-b-2 border-gray-300 focus:outline-none">
          Employee Overview
        </button>
      </div>
      <div>Options</div>
    </div>
  );
};
