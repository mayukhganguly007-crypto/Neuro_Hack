
export interface Dossier {
  name: string;
  alias: string;
  birthDate: string;
  profession: string;
  pastDeeds: string[];
  criminalRecord: string;
  lastKnownLocation: string;
  securityClearance: string;
  threatLevel: 'Low' | 'Medium' | 'High' | 'Extreme' | 'Critical';
  biometricId: string;
}

export enum ScanStatus {
  IDLE = 'IDLE',
  INITIALIZING = 'INITIALIZING',
  SCANNING = 'SCANNING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}
