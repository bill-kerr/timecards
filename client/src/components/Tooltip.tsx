import React from 'react';
import Tippy, { TippyProps } from '@tippyjs/react';

export const Tooltip: React.FC<TippyProps> = ({
  children,
  className,
  content,
  delay = [200, null],
  offset = [0, 6],
  ...props
}) => (
  <Tippy
    content={content}
    delay={delay}
    offset={offset}
    className={`bg-gray-900 text-gray-100 rounded px-2 py-1 text-xs shadow ${className}`}
    {...props}
  >
    {children}
  </Tippy>
);
