import React from 'react';
import { useTypedDispatch, useTypedSelector } from '../../store';
import { updateEmployee } from '../../store/employees/actions';
import { values } from '../../utils';

export const AddForemen: React.FC = () => {
  const dispatch = useTypedDispatch();
  const employees = useTypedSelector(state => state.employees.employees);

  const renderRemoveForeman = (id: string) => {
    return <div onClick={() => dispatch(updateEmployee(id, { isForeman: false }))}>Remove</div>;
  };

  const renderAddForeman = (id: string) => {
    return <div onClick={() => dispatch(updateEmployee(id, { isForeman: true }))}>Add</div>;
  };

  return (
    <div className="p-6 max-h-full bg-white rounded overflow-hidden">
      <div className="p-2 bg-gray-200 rounded">
        <div className="overflow-y-scroll h-96">
          {values(employees).map(employee => (
            <div key={employee.id} className="flex items-center justify-between">
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