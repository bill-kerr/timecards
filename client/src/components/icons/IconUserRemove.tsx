import React from 'react';

export const IconUserRemove: React.FC<React.HTMLAttributes<HTMLOrSVGElement>> = React.forwardRef<
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
      <path d="M11 6a3 3 0 11-6 0 3 3 0 016 0zM14 17a6 6 0 00-12 0h12zM13 8a1 1 0 100 2h4a1 1 0 100-2h-4z" />
    </svg>
  );
});
