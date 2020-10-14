import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { IconUser } from './icons/IconUser';
import { IconUserGroup } from './icons/IconUserGroup';
import logo from '../assets/img/timecards_logo_white.svg';
import logoIcon from '../assets/img/timecards_icon_white.svg';
import { IconUserCircle } from './icons/IconUserCircle';
import { User } from '../store/auth/types';

interface SideNavProps {
  user: User;
}

export const SideNav: React.FC<SideNavProps> = ({ user }) => {
  return (
    <div className="h-full flex flex-col justify-between bg-gray-900 text-gray-100 shadow">
      <div className="p-3">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Timecards" style={{ width: '192px' }} className="hidden sm:block" />
          <img src={logoIcon} alt="Timecards" className="w-12 sm:hidden" />
        </Link>
        <div className="mt-6 text-gray-200">
          <NavLink
            to="/employee-overview"
            className="p-2 sm:pr-20 flex items-center justify-center text-sm font-semibold rounded whitespace-no-wrap hover:bg-gray-700"
            activeClassName="bg-gray-800 hover:bg-gray-800 text-gray-100 shadow-inner"
          >
            <IconUserGroup className="h-5 w-5 text-gray-300" />
            <span className="ml-3 hidden sm:block leading-none">Employee Overview</span>
          </NavLink>
          <NavLink
            to="/foreman-overview"
            className="mt-3 p-2 sm:pr-20 flex items-center justify-center text-sm font-semibold rounded whitespace-no-wrap hover:bg-gray-700"
            activeClassName="bg-gray-800 hover:bg-gray-800 text-gray-100 shadow-inner"
          >
            <IconUser className="h-5 w-5 text-gray-300" />
            <span className="ml-3 hidden sm:block leading-none">Foreman Overview</span>
          </NavLink>
        </div>
      </div>
      <div className="p-3 text-teal-200 bg-teal-700">
        <NavLink
          to="/settings"
          className="p-2 sm:pr-20 flex items-center justify-center sm:justify-start rounded whitespace-no-wrap hover:bg-teal-800"
          activeClassName="bg-teal-800 hover:bg-teal-800 text-teal-100 shadow-inner"
        >
          <IconUserCircle className="h-8 w-8 text-teal-300" />
          <div className="ml-3 hidden sm:flex flex-col leading-tight">
            <span className="font-semibold">{user.username}</span>
            <span className="text-sm text-teal-400">View profile</span>
          </div>
        </NavLink>
      </div>
    </div>
  );
};
