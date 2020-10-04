import React from 'react';

export const IconUser: React.FC<React.HTMLAttributes<HTMLOrSVGElement>> = React.forwardRef<
  SVGSVGElement,
  React.HTMLAttributes<HTMLOrSVGElement>
>((props, ref) => {
  return (
    <svg
      className="w-6 h-6"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
        clipRule="evenodd"
      />
    </svg>
  );
});
