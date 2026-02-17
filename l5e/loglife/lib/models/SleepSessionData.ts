export interface SleepStage {
  startTime: Date;
  endTime: Date;
  type: number; // e.g., 1 for Deep, 2 for REM, etc.
}

export interface SleepSessionData {
  uid: string;
  title?: string; // The '?' makes it optional/nullable
  notes?: string;
  startTime: Date;
  startZoneOffset?: string; // Usually represented as ISO string like "+02:00"
  endTime: Date;
  endZoneOffset?: string;
  durationInMinutes?: number; // Better to store as a number (minutes or ms)
  stages: SleepStage[];
}
