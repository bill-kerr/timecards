import React from 'react';

export const IconPlus: React.FC<React.HTMLAttributes<HTMLOrSVGElement>> = React.forwardRef<
  SVGSVGElement,
  React.HTMLAttributes<HTMLOrSVGElement>
>((props, ref) => {
  return (
    <svg
      ref={ref}
      className="w-6 h-6"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
});
