import React from 'react';
import { useTypedDispatch, useTypedSelector } from '../../store';
import { updateEmployee } from '../../store/employees/actions';
import { noop, values } from '../../utils';
import { IconX } from '../icons/IconX';
import { Tooltip } from '../Tooltip';

interface AddForemenProps {
  dismiss?: () => void;
}

export const AddForemen: React.FC<AddForemenProps> = ({ dismiss = noop }) => {
  const dispatch = useTypedDispatch();
  const employees = useTypedSelector(state => state.employees.employees);

  const renderRemoveForeman = (id: string) => {
    return <div onClick={() => dispatch(updateEmployee(id, { isForeman: false }))}>Remove</div>;
  };

  const renderAddForeman = (id: string) => {
    return <div onClick={() => dispatch(updateEmployee(id, { isForeman: true }))}>Add</div>;
  };

  return (
    <div className="mx-6 max-h-full max-w-screen-lg bg-white rounded overflow-hidden">
      <div className="p-6 flex items-center justify-between bg-gradient-to-r from-teal-800 to-teal-700 rounded-t text-gray-100">
        <h2 className="text-xl font-black uppercase">Add Foremen</h2>
        <div className="flex justify-between items-center">
          <Tooltip content="Close">
            <IconX
              onClick={() => dismiss()}
              className="h-6 w-6 text-teal-300 hover:text-teal-400 cursor-pointer outline-none"
            />
          </Tooltip>
        </div>
      </div>
      <div className="mt-6 p-2 bg-gray-200 rounded">
        <div className="overflow-y-scroll h-96">
          {values(employees).map(employee => (
            <div key={employee.id} className="my-1 flex items-center justify-between">
              <span>{employee.name}</span>
              {employee.isForeman
                ? renderRemoveForeman(employee.id)
                : renderAddForeman(employee.id)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
