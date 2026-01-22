
import React from 'react';
import { Dossier } from '../types';

interface DossierDisplayProps {
  dossier: Dossier;
  onReset: () => void;
}

export const DossierDisplay: React.FC<DossierDisplayProps> = ({ dossier, onReset }) => {
  const getThreatColor = (level: string) => {
    switch (level.toUpperCase()) {
      case 'CRITICAL': return 'text-red-600 border-red-600';
      case 'EXTREME': return 'text-red-400 border-red-400';
      case 'HIGH': return 'text-orange-400 border-orange-400';
      default: return 'text-yellow-400 border-yellow-400';
    }
  };

  return (
    <div className="max-w-4xl w-full bg-zinc-900/90 border-2 border-green-500/30 p-8 rounded-lg shadow-[0_0_50px_rgba(0,255,65,0.1)] relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4">
         <div className={`px-4 py-2 border-2 font-bold uppercase ${getThreatColor(dossier.threatLevel)}`}>
           Threat Level: {dossier.threatLevel}
         </div>
      </div>

      <header className="mb-8 border-b border-green-500/20 pb-4">
        <h1 className="text-4xl font-bold tracking-tighter text-white mb-2 font-['Orbitron']">
          {dossier.name.toUpperCase()}
        </h1>
        <p className="text-green-400 italic font-mono">AKA: "{dossier.alias}"</p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        <section className="space-y-4">
          <div>
            <h3 className="text-green-600 text-xs font-bold uppercase mb-1">Subject Metadata</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-green-900">Birth Date:</span> <span className="text-green-100">{dossier.birthDate}</span>
              <span className="text-green-900">Profession:</span> <span className="text-green-100">{dossier.profession}</span>
              <span className="text-green-900">ID Hash:</span> <span className="text-green-100 font-mono text-[10px]">{dossier.biometricId}</span>
              <span className="text-green-900">Last Seen:</span> <span className="text-green-100">{dossier.lastKnownLocation}</span>
            </div>
          </div>

          <div>
            <h3 className="text-green-600 text-xs font-bold uppercase mb-1">Historical Archive (Past Deeds)</h3>
            <ul className="list-disc list-inside text-sm text-green-100/80 space-y-1">
              {dossier.pastDeeds.map((deed, i) => (
                <li key={i}>{deed}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <div className="bg-black/50 p-4 border border-red-900/30 rounded">
            <h3 className="text-red-500 text-xs font-bold uppercase mb-2">Criminal Activity Logs</h3>
            <p className="text-sm text-red-200/70 leading-relaxed font-mono">
              {dossier.criminalRecord}
            </p>
          </div>

          <div>
            <h3 className="text-green-600 text-xs font-bold uppercase mb-1">Clearance Protocol</h3>
            <p className="text-lg text-green-300 font-bold tracking-widest bg-green-500/10 px-3 py-1 inline-block">
              {dossier.securityClearance.toUpperCase()}
            </p>
          </div>
        </section>
      </div>

      <div className="mt-8 flex justify-end">
        <button 
          onClick={onReset}
          className="bg-green-600 text-black font-bold py-2 px-8 hover:bg-green-400 transition-colors uppercase tracking-widest text-sm"
        >
          Flush Data & New Scan
        </button>
      </div>

      {/* Decorative Glitch Overlay */}
      <div className="absolute bottom-4 left-4 text-[8px] text-green-900 font-mono opacity-20 pointer-events-none">
        CONFIDENTIAL - PROPERTY OF NEURO-SCAN INTEL - DO NOT DISTRIBUTE - CLEARANCE LEVEL 7 REQUIRED
      </div>
    </div>
  );
};
