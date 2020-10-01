import React from 'react';

export const IconChevronLeft: React.FC<React.HTMLAttributes<HTMLOrSVGElement>> = React.forwardRef<
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
        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
});
