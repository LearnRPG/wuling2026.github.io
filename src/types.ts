
export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface ElevationPoint {
  name: string;
  locationDetail?: string;
  distance: number; // 累計里程
  elevation: number; // 海拔
  segmentAscent?: number; // 該段上升
  segmentDescent?: number; // 該段下降
  segmentDistance?: number; // 該段距離
  segmentGrade?: number; // 該段平均坡度
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
