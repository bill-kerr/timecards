import { useTypedDispatch, useTypedSelector } from '../store';
import { getTimecardCostCodes } from '../store/timecard-cost-codes/actions';
import { getTimecardEmployees } from '../store/timecard-employees/actions';
import { getTimecards } from '../store/timecards/actions';
import { firstAndLastOfWeek } from '../utils';
import { useInterval } from './useInterval';

export const useTimecards = (interval: number, immediate = true) => {
  const { weekEnding, user } = useTypedSelector(state => ({
    weekEnding: state.settings.weekEnding,
    user: state.auth.user,
  }));
  const dispatch = useTypedDispatch();

  useInterval(
    () => {
      if (!user) {
        return;
      }
      const dates = firstAndLastOfWeek(weekEnding);
      dispatch(getTimecards(dates));
      dispatch(getTimecardEmployees(dates));
      dispatch(getTimecardCostCodes(dates));
    },
    interval * 1000 * 60,
    immediate
  );
};
