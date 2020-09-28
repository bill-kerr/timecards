import React from 'react';
import Tippy, { TippyProps } from '@tippyjs/react';

export const Tooltip: React.FC<TippyProps> = ({ children, className, ...props }) => (
  <Tippy
    content="Remove as foreman"
    delay={200}
    className={`bg-gray-900 text-gray-100 rounded px-2 py-1 text-xs bg-opacity-75 ${className}`}
    {...props}
  >
    {children}
  </Tippy>
);
