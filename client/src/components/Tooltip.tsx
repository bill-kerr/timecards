import React from 'react';
import Tippy, { TippyProps } from '@tippyjs/react';

export const Tooltip: React.FC<TippyProps> = ({ children, className, content, delay = 200, ...props }) => (
  <Tippy
    content={content}
    delay={delay}
    className={`bg-gray-900 text-gray-100 rounded px-2 py-1 text-xs bg-opacity-75 shadow ${className}`}
    {...props}
  >
    {children}
  </Tippy>
);
