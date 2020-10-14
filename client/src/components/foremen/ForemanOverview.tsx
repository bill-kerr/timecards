import React, { useState } from 'react';
import { useTypedDispatch, useTypedSelector } from '../../store';
import { updateEmployee } from '../../store/employees/actions';
import { setWeekEnding } from '../../store/settings/actions';
import { filterDict, getEachDayOfWeek, nextWeekEnding, prevWeekEnding, values } from '../../utils';
import { IconPlus } from '../icons/IconPlus';
import { IconUserGroup } from '../icons/IconUserGroup';
import { Modal } from '../Modal';
import { Tooltip } from '../Tooltip';
import { WeekSelector } from '../WeekSelector';
import { AddForemen } from './AddForemen';
import { ForemanCard } from './ForemanCard';

export const ForemanOverview: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useTypedDispatch();
  const { foremen, timecards, weekdays, settings } = useTypedSelector(state => {
    const foremen = filterDict(state.employees.employees, e => e.isForeman);
    return {
      foremen,
      timecards: filterDict(state.timecards, t => t.foremanId in foremen),
      weekdays: getEachDayOfWeek(state.settings.weekEnding),
      settings: state.settings,
    };
  });

  const onSelectPrevWeek = () => {
    const date = prevWeekEnding(settings.weekEnding);
    dispatch(setWeekEnding(date));
  };

  const onSelectNextWeek = () => {
    const date = nextWeekEnding(settings.weekEnding);
    dispatch(setWeekEnding(date));
  };

  const renderNoForemen = () => (
    <div className="mt-10 px-6 flex flex-col items-center justify-center">
      <IconUserGroup className="text-gray-500 h-16 w-16" />
      <span className="mt-1 text-xl text-gray-600 text-center">
        No foremen have been added. Get started by adding some foremen.
      </span>
      <button
        className="mt-4 p-3 flex items-center justify-center text-center bg-teal-600 text-gray-100 rounded font-bold hover:bg-teal-500 focus:outline-none focus:shadow-outline"
        onClick={() => setShowModal(true)}
      >
        <IconPlus />
        <span className="ml-2">Add Foremen</span>
      </button>
      {showModal && (
        <Modal onDismiss={() => setShowModal(false)}>
          <AddForemen />
        </Modal>
      )}
    </div>
  );

  if (Object.keys(foremen).length === 0) {
    return renderNoForemen();
  }

  return (
    <div>
      <WeekSelector
        weekdays={getEachDayOfWeek(settings.weekEnding)}
        onPrevWeek={onSelectPrevWeek}
        onNextWeek={onSelectNextWeek}
      />
      <div className="mt-10 px-6 flex flex-col sm:flex-row flex-wrap items-stretch">
        {values(foremen).map(foreman => (
          <div key={foreman.id} className="sm:mr-6 mb-6 inline-block w-64">
            <ForemanCard
              foreman={foreman}
              timecards={values(timecards, t => t.foremanId === foreman.id)}
              weekdays={weekdays}
              className="w-full"
              onRemoveForeman={() => dispatch(updateEmployee(foreman.id, { isForeman: false }))}
            />
          </div>
        ))}
        <Tooltip content="Add foreman" placement="bottom" delay={[500, null]}>
          <button
            className="mb-6 px-4 py-3 w-24 flex items-center justify-center bg-white border-2 border-dashed border-teal-300 rounded-lg hover:bg-teal-100 cursor-pointer focus:outline-none"
            onClick={() => setShowModal(true)}
          >
            <IconPlus className="w-8 h-8 text-teal-400" />
          </button>
        </Tooltip>
        {showModal && (
          <Modal onDismiss={() => setShowModal(false)}>
            <AddForemen />
          </Modal>
        )}
      </div>
    </div>
  );
};
