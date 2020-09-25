import React, { useEffect } from 'react';
import { useTypedDispatch, useTypedSelector } from '../store';
import { getEmployees } from '../store/employees/actions';
import { getEquipment } from '../store/equipment/actions';
import { getJobs } from '../store/jobs/actions';
import { getTimecards } from '../store/timecards/actions';
import { filterDict, values } from '../utils';
import { Foreman } from './Foreman';

export const App: React.FC = () => {
  const dispatch = useTypedDispatch();
  const foremen = useTypedSelector((state) => filterDict(state.employees, (e) => e.isForeman));
  const timecards = useTypedSelector((state) => filterDict(state.timecards, (t) => t.foremanId in foremen));

  useEffect(() => {
    dispatch(getEmployees());
    dispatch(getTimecards('2020-09-01', '2020-09-25'));
    dispatch(getJobs());
    dispatch(getEquipment());
  }, [dispatch]);

  return (
    <>
      {values(foremen).map((foreman) => (
        <Foreman foreman={foreman} timecards={values(timecards, (t) => t.foremanId === foreman.id)} />
      ))}
    </>
  );
};
