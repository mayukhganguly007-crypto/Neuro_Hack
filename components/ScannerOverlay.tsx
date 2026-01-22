
import React from 'react';

export const ScannerOverlay: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
      {/* Target Reticle */}
      <div className="relative w-64 h-64 border-2 border-green-500 rounded-full opacity-50 animate-pulse">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-full bg-green-500 opacity-20"></div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-green-500 opacity-20"></div>
        
        {/* Scanning line inside reticle */}
        <div className="absolute w-full h-1 bg-green-400 opacity-70 shadow-[0_0_10px_#4ade80] animate-[scan_2s_linear_infinite]"></div>
        
        {/* Corner Brackets */}
        <div className="absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 border-green-400"></div>
        <div className="absolute -top-2 -right-2 w-8 h-8 border-t-4 border-r-4 border-green-400"></div>
        <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-4 border-l-4 border-green-400"></div>
        <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 border-green-400"></div>
      </div>

      {/* Dynamic Data Streams */}
      <div className="absolute top-10 left-10 text-[10px] space-y-1 text-green-700 font-mono">
        <div>LAT: 34.0522° N</div>
        <div>LNG: 118.2437° W</div>
        <div>SYS_CLK: {Date.now()}</div>
        <div>PKT_RX: 1042kb/s</div>
      </div>
      
      <div className="absolute bottom-10 right-10 text-[10px] space-y-1 text-green-700 font-mono text-right">
        <div>BIO_HASH: 0x82f...a12</div>
        <div>DNA_SEQ: TTAGGG-992</div>
        <div>ENV_TEMP: 24.2°C</div>
        <div>STATUS: ACTIVE</div>
      </div>
    </div>
  );
};
