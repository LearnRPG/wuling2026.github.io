
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
