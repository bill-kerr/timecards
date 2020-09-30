import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <div className="flex items-center justify-between border-b border-gray-200">
      <div className="text-gray-600">
        <NavLink
          to="/foreman-overview"
          className="px-4 py-3 rounded-t-lg inline-block focus:outline-none"
          activeClassName="bg-gray-200 text-gray-900"
        >
          Foreman Overview
        </NavLink>
        <NavLink
          to="/employee-overview"
          className="ml-3 px-4 py-3 rounded-t-lg inline-block focus:outline-none"
          activeClassName="bg-gray-200 text-gray-900"
        >
          Employee Overview
        </NavLink>
      </div>
      <div>Options</div>
    </div>
  );
};
