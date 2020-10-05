import React from 'react';
import { Link } from 'react-router-dom';
import { IconArrowNarrowRight } from './icons/IconArrowNarrowRight';

export const HomePage: React.FC = () => {
  return (
    <div className="px-6 flex flex-wrap items-stretch">
      <Link
        to="/foreman-overview"
        className="flex flex-col justify-between w-64 p-4 border border-gray-200 rounded group"
      >
        <div>
          <h3 className="font-semibold">Foreman Overview</h3>
          <p className="mt-1 text-sm text-gray-600">View the weekly timecard status for each foreman.</p>
        </div>
        <div className="mt-3 flex items-center justify-end text-teal-700 text-sm">
          <span className="border-b group-hover:border-teal-700 border-transparent">Foreman overview</span>
          <IconArrowNarrowRight className="ml-2 h-4 w-4" />
        </div>
      </Link>
      <Link
        to="/employee-overview"
        className="ml-6 flex flex-col justify-between w-64 p-4 border border-gray-200 rounded group"
      >
        <div>
          <h3 className="font-semibold">Employee Overview</h3>
          <p className="mt-1 text-sm text-gray-600">
            View all employees with hours on submitted timecards for the selected week.
          </p>
        </div>
        <div className="mt-3 flex items-center justify-end text-teal-700 text-sm">
          <span className="border-b group-hover:border-teal-700 border-transparent">Employee overview</span>
          <IconArrowNarrowRight className="ml-2 h-4 w-4" />
        </div>
      </Link>
    </div>
  );
};
