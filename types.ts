
export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface ElevationPoint {
  name: string;
  distance: number;
  elevation: number;
  difficulty?: 'easy' | 'medium' | 'hard' | 'brutal';
}

export interface PaceSegment {
  name: string;
  distance: number; // 該段里程 (km)
  gain: number;     // 該段爬升 (m)
  avgElev: number;  // 該段平均海拔 (m)
  difficulty: 'easy' | 'medium' | 'hard' | 'brutal';
}

export enum EventType {
  TIS_CHUNG_YUE = 'TIS_CHUNG_YUE',
  NEVER_STOP = 'NEVER_STOP'
}

export interface EventInfo {
  id: EventType;
  title: string;
  date: Date;
  organizer: string;
  spirit: string;
  route: string;
  details: string[];
}
