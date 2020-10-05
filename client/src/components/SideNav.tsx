import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { IconClock } from './icons/IconClock';
import { IconCog } from './icons/IconCog';
import { IconUser } from './icons/IconUser';
import { IconUserGroup } from './icons/IconUserGroup';

export const SideNav: React.FC = () => {
  return (
    <div className="h-full flex flex-col justify-between bg-teal-600 text-teal-100 shadow">
      <div className="p-3">
        <Link to="/" className="flex items-center">
          <IconClock className="h-8 w-8" />
          <h1 className="ml-2 font-black text-lg tracking-wider">Timecards</h1>
        </Link>
        <div className="mt-6 text-teal-200">
          <NavLink
            to="/employee-overview"
            className="p-2 pr-20 flex items-center text-sm font-semibold rounded whitespace-no-wrap hover:bg-teal-700"
            activeClassName="bg-teal-800 hover:bg-teal-800 text-teal-100 shadow-inner"
          >
            <IconUserGroup className="h-5 w-5 text-teal-300" />
            <span className="ml-3">Employee Overview</span>
          </NavLink>
          <NavLink
            to="/foreman-overview"
            className="mt-3 p-2 pr-20 flex items-center text-sm font-semibold rounded whitespace-no-wrap hover:bg-teal-700"
            activeClassName="bg-teal-800 hover:bg-teal-800 text-teal-100 shadow-inner"
          >
            <IconUser className="h-5 w-5 text-teal-300" />
            <span className="ml-3">Foreman Overview</span>
          </NavLink>
        </div>
      </div>
      <div className="p-3 border-teal-500 border-t text-teal-200">
        <NavLink
          to="/settings"
          className="p-2 pr-20 flex items-center text-sm font-semibold rounded whitespace-no-wrap hover:bg-teal-700"
          activeClassName="bg-teal-800 hover:bg-teal-800 text-teal-100 shadow-inner"
        >
          <IconCog className="h-5 w-5 text-teal-300" />
          <span className="ml-3">Settings</span>
        </NavLink>
      </div>
    </div>
  );
};
