import React from 'react';
import { Link } from 'react-router-dom';
import { IconArrowNarrowRight } from './icons/IconArrowNarrowRight';

interface LinkCardProps extends React.HTMLAttributes<HTMLAnchorElement> {
  to: string;
  title: string;
  description: string;
  linkText: string;
}

export const LinkCard: React.FC<LinkCardProps> = ({ to, title, description, linkText, className, ...props }) => {
  return (
    <Link
      to={to}
      className={`flex flex-col justify-between w-64 p-4 rounded shadow bg-white group ${className}`}
      {...props}
    >
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-gray-600">{description}</p>
      </div>
      <div className="mt-3 flex items-center justify-end text-teal-700 text-sm">
        <span className="border-b group-hover:border-teal-700 border-transparent">{linkText}</span>
        <IconArrowNarrowRight className="ml-2 h-4 w-4" />
      </div>
    </Link>
  );
};
