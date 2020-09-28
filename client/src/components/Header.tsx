import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="text-gray-600">
        <NavLink
          to="/foreman-overview"
          className="px-4 py-2 inline-block border-b-2 border-gray-300 focus:outline-none"
          activeClassName="border-teal-500 text-gray-900"
        >
          Foreman Overview
        </NavLink>
        <NavLink
          to="/employee-overview"
          className="ml-3 px-4 py-2 inline-block border-b-2 border-gray-300 focus:outline-none"
          activeClassName="border-teal-500 text-gray-900"
        >
          Employee Overview
        </NavLink>
      </div>
      <div>Options</div>
    </div>
  );
};
