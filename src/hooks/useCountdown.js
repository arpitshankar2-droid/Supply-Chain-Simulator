import { useEffect, useRef } from 'react';
import { useSimulation } from './useSimulation';
import { APPROVAL_STATUS, SCREENS } from '../config/constants';

export function useCountdown() {
  const { state, tickCountdown, setApprovalStatus, setScreen } = useSimulation();
  const intervalRef = useRef(null);

  useEffect(() => {
    if (state.approval.status !== APPROVAL_STATUS.PENDING) return;

    intervalRef.current = setInterval(() => {
      tickCountdown();
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [state.approval.status]);

  useEffect(() => {
    if (state.approval.countdown <= 0 && state.approval.status === APPROVAL_STATUS.PENDING) {
      setApprovalStatus(APPROVAL_STATUS.AUTO);
      if (intervalRef.current) clearInterval(intervalRef.current);
      setTimeout(() => setScreen(SCREENS.SUMMARY), 1500);
    }
  }, [state.approval.countdown, state.approval.status]);

  const approve = () => {
    setApprovalStatus(APPROVAL_STATUS.APPROVED);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimeout(() => setScreen(SCREENS.SUMMARY), 1000);
  };

  const reject = () => {
    setApprovalStatus(APPROVAL_STATUS.REJECTED);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  return { approve, reject };
}
