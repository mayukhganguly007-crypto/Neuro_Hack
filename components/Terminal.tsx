
import React, { useEffect, useRef } from 'react';

interface TerminalProps {
  logs: string[];
}

export const Terminal: React.FC<TerminalProps> = ({ logs }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="bg-black/80 border border-green-900 p-4 font-mono text-xs h-40 overflow-y-auto scrollbar-hide rounded shadow-2xl" ref={scrollRef}>
      <div className="text-green-800 mb-2 border-b border-green-900 pb-1 flex justify-between">
        <span>SYSTEM_LOG_v4.2.1</span>
        <span className="animate-pulse">_ONLINE</span>
      </div>
      {logs.map((log, i) => (
        <div key={i} className="mb-1">
          <span className="text-green-900">[{new Date().toLocaleTimeString()}]</span>{' '}
          <span className={`${log.includes('CRITICAL') ? 'text-red-500' : 'text-green-400'}`}>
            {log}
          </span>
        </div>
      ))}
      <div className="animate-pulse">_</div>
    </div>
  );
};
