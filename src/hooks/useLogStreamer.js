import { useRef, useCallback } from 'react';
import { useSimulation } from './useSimulation';
import { TIMING } from '../config/constants';
import { delay } from '../utils/delay';

export function useLogStreamer() {
  const { addAgentLog } = useSimulation();
  const queueRef = useRef([]);
  const abortRef = useRef(false);

  const createLogAdder = useCallback((agentKey) => {
    return async (logEntry) => {
      queueRef.current.push({ agentKey, logEntry });
    };
  }, []);

  const processQueue = useCallback(async (agentKey) => {
    abortRef.current = false;
    while (queueRef.current.length > 0 && !abortRef.current) {
      const item = queueRef.current.shift();
      if (item) {
        addAgentLog(item.agentKey, item.logEntry);
        await delay(TIMING.LOG_LINE_PACE);
      }
    }
  }, [addAgentLog]);

  const flushLogs = useCallback(async (agentKey, logs) => {
    abortRef.current = false;
    for (const logEntry of logs) {
      if (abortRef.current) break;
      addAgentLog(agentKey, logEntry);
      await delay(TIMING.LOG_LINE_PACE);
    }
  }, [addAgentLog]);

  const abort = useCallback(() => {
    abortRef.current = true;
    queueRef.current = [];
  }, []);

  return { createLogAdder, processQueue, flushLogs, abort };
}
