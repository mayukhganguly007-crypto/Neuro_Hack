
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Terminal } from './components/Terminal';
import { ScannerOverlay } from './components/ScannerOverlay';
import { DossierDisplay } from './components/DossierDisplay';
import { ScanStatus, Dossier } from './types';
import { generateDossier } from './services/geminiService';

const App: React.FC = () => {
  const [status, setStatus] = useState<ScanStatus>(ScanStatus.IDLE);
  const [logs, setLogs] = useState<string[]>(["SYSTEM_INITIALIZED", "WAITING_FOR_SUBJECT..."]);
  const [dossier, setDossier] = useState<Dossier | null>(null);
  const [progress, setProgress] = useState(0);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const addLog = useCallback((msg: string) => {
    setLogs(prev => [...prev, msg]);
  }, []);

  const startScan = async () => {
    try {
      setStatus(ScanStatus.INITIALIZING);
      addLog("INITIATING_RETINA_LINK...");
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user', width: 1280, height: 720 } 
      });
      
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      setStatus(ScanStatus.SCANNING);
      addLog("SUBJECT_IN_FOCUS_AREA");
      addLog("SCANNING_RETINA_VESSELS...");
      addLog("CAPTURING_NEURAL_WAVES...");
      
      // Simulation progress
      let p = 0;
      const interval = setInterval(() => {
        p += 5;
        setProgress(p);
        if (p >= 100) {
          clearInterval(interval);
          processData();
        }
      }, 150);

    } catch (err) {
      console.error(err);
      addLog("CRITICAL_ERROR: BIOMETRIC_HARDWARE_NOT_FOUND");
      setStatus(ScanStatus.ERROR);
    }
  };

  const processData = async () => {
    setStatus(ScanStatus.PROCESSING);
    addLog("SCAN_COMPLETE_100%");
    addLog("EXTRACTING_ENCRYPTED_FILES...");
    addLog("BYPASSING_NEURAL_FIREWALL...");
    addLog("UPLOADING_PAST_DEEDS_DATABASE...");
    
    try {
      const generated = await generateDossier();
      setDossier(generated);
      setStatus(ScanStatus.COMPLETED);
      addLog("DOSSIER_RECONSTRUCTED_SUCCESSFULLY");
    } catch (err) {
      addLog("DATA_CORRUPTION: FAILED_TO_PARSE_NEURAL_BACKUP");
      setStatus(ScanStatus.ERROR);
    }
  };

  const reset = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setDossier(null);
    setStatus(ScanStatus.IDLE);
    setProgress(0);
    setLogs(["BUFFER_FLUSHED", "SYSTEM_READY"]);
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative font-mono">
      {/* Background Grid */}
      <div className="fixed inset-0 pointer-events-none opacity-10 bg-[radial-gradient(#00ff41_1px,transparent_1px)] [background-size:40px_40px]"></div>

      <main className="z-10 w-full max-w-5xl flex flex-col items-center gap-8">
        
        {status === ScanStatus.IDLE && (
          <div className="text-center space-y-8 animate-in fade-in zoom-in duration-500">
            <h1 className="text-6xl font-bold tracking-tighter glitch font-['Orbitron'] mb-4">
              NEURO-SCAN
            </h1>
            <p className="text-green-500/60 max-w-md mx-auto text-sm leading-relaxed">
              Biometric Intelligence Retrieval System v8.4.2<br/>
              Authorization Required. Subject must be within 24 inches.
            </p>
            <button 
              onClick={startScan}
              className="group relative px-12 py-4 bg-transparent border-2 border-green-500 text-green-500 font-bold text-xl overflow-hidden hover:text-black transition-colors"
            >
              <div className="absolute inset-0 bg-green-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
              <span className="relative z-10">INITIATE SCAN</span>
            </button>
          </div>
        )}

        {(status === ScanStatus.INITIALIZING || status === ScanStatus.SCANNING || status === ScanStatus.PROCESSING) && (
          <div className="w-full max-w-2xl relative">
             <div className="aspect-video bg-black border-4 border-green-900 overflow-hidden relative rounded-lg shadow-[0_0_30px_rgba(0,255,65,0.2)]">
                <video 
                  ref={videoRef} 
                  autoPlay 
                  muted 
                  playsInline 
                  className={`w-full h-full object-cover grayscale opacity-70 ${status === ScanStatus.SCANNING ? 'animate-pulse' : ''}`}
                />
                <ScannerOverlay />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                
                <div className="absolute bottom-0 left-0 w-full h-1 bg-green-900">
                   <div 
                    className="h-full bg-green-400 shadow-[0_0_10px_#4ade80] transition-all duration-300"
                    style={{ width: `${progress}%` }}
                   ></div>
                </div>
             </div>
             
             <div className="mt-6">
                <Terminal logs={logs} />
             </div>
             
             <div className="mt-4 flex justify-center">
                <div className="text-green-500 animate-pulse font-bold tracking-widest text-sm">
                  {status === ScanStatus.SCANNING ? 'CAPTURING_BIOMETRICS...' : 'DECRYPTING_PAST_LIFE_DATA...'}
                </div>
             </div>
          </div>
        )}

        {status === ScanStatus.COMPLETED && dossier && (
          <div className="animate-in slide-in-from-bottom duration-700">
            <DossierDisplay dossier={dossier} onReset={reset} />
            <div className="mt-6">
               <Terminal logs={logs} />
            </div>
          </div>
        )}

        {status === ScanStatus.ERROR && (
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-red-600 animate-bounce">SYSTEM_FAILURE</h2>
            <Terminal logs={logs} />
            <button 
              onClick={reset}
              className="mt-4 text-green-500 border border-green-500 px-4 py-2 hover:bg-green-500 hover:text-black"
            >
              REBOOT_SYSTEM
            </button>
          </div>
        )}

      </main>

      {/* Persistent Decorative UI Elements */}
      <footer className="fixed bottom-4 left-4 right-4 flex justify-between text-[10px] text-green-900 font-mono select-none">
        <div>NET_LINK: ESTABLISHED (SECURE)</div>
        <div className="flex gap-4">
          <span>MEM: 128TB/v</span>
          <span>CPU: 42.1GHz</span>
          <span>&copy; 2099 NEURO-SCAN CORP</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
