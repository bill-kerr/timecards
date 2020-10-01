import React from 'react';
import { noop } from '../../utils';
import { IconPlus } from '../icons/IconPlus';

interface AddForemanButtonProps {
  onClick?: () => void;
}

export const AddForemanButton: React.FC<AddForemanButtonProps> = ({ onClick = noop }) => {
  return (
    <button onClick={() => onClick()} className="flex items-center justify-between cursor-pointer focus:outline-none">
      <IconPlus className="h-4 w-4" />
      <span>Add as foreman</span>
    </button>
  );
};
