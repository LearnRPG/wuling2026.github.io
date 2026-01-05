
import { ElevationPoint, EventInfo, EventType, PaceSegment } from './types';

export const ELEVATION_DATA: ElevationPoint[] = [
  { name: '地理中心碑', distance: 0, elevation: 450, difficulty: 'easy' },
  { name: '人止關', distance: 16, elevation: 790, difficulty: 'easy' },
  { name: '霧社', distance: 22, elevation: 1170, difficulty: 'medium' },
  { name: '清境', distance: 29, elevation: 1600, difficulty: 'medium' },
  { name: '翠峰', distance: 39, elevation: 2330, difficulty: 'hard' },
  { name: '鳶峰', distance: 45, elevation: 2730, difficulty: 'hard' },
  { name: '昆陽', distance: 52, elevation: 3100, difficulty: 'brutal' },
  { name: '武嶺', distance: 55, elevation: 3275, difficulty: 'brutal' },
];

// 基於真實地理資訊的細分路段 (用於功率計算)
export const PACE_SEGMENTS: PaceSegment[] = [
  { name: '起點 - 人止關', distance: 16, gain: 340, avgElev: 620, difficulty: 'easy' },
  { name: '人止關 - 霧社', distance: 6, gain: 380, avgElev: 980, difficulty: 'medium' },
  { name: '霧社 - 清境', distance: 7, gain: 430, avgElev: 1385, difficulty: 'medium' },
  { name: '清境 - 翠峰', distance: 10, gain: 730, avgElev: 1965, difficulty: 'hard' },
  { name: '翠峰 - 鳶峰', distance: 6, gain: 400, avgElev: 2530, difficulty: 'hard' },
  { name: '鳶峰 - 昆陽', distance: 7, gain: 370, avgElev: 2915, difficulty: 'brutal' },
  { name: '昆陽 - 武嶺', distance: 3, gain: 175, avgElev: 3180, difficulty: 'brutal' },
];

export const EVENTS: EventInfo[] = [
  {
    id: EventType.TIS_CHUNG_YUE,
    title: "2026 TIS 夏季崇越盃武嶺自行車挑戰賽",
    date: new Date('2026-06-15T05:00:00'),
    organizer: "桃園市鐵人運動協會",
    spirit: "3275是高度也是人生的態度，山在前無懼，是一種挑戰也是對山的一種尊敬。",
    route: "地理中心碑 → 人止關 → 霧社 → 清境 → 翠峰 → 鳶峰 → 昆陽 → 武嶺停車場",
    details: [
      "挑戰【玫瑰金武嶺鎮】：累計3次同款更換，或中途未參加累計5次更換。",
      "翠峰執行強制關門：如棄賽強行上山者需回收帽貼並簽切結書。",
      "金武嶺：4小時內完賽；銀武嶺：5小時內完賽；銅武嶺：5-7小時內完賽。",
      "晶片計時：RFID超高頻晶片，免押金免回收。"
    ]
  },
  {
    id: EventType.NEVER_STOP,
    title: "2026 NeverStop 永不放棄挑戰巔峰－武嶺",
    date: new Date('2026-06-27T05:00:00'),
    organizer: "臺灣自由車運動協會",
    spirit: "不在征服他人，而在自我挑戰，追求永不放棄之運動精神及毅力。",
    route: "埔里地理中心碑 → 人止關 → 霧社 → 清境 → 翠峰 → 鳶峰 → 昆陽 → 武嶺",
    details: [
      "競賽組限定時間 4 小時完成。",
      "挑戰組限定時間 7 小時完成。",
      "報名日期：2026/01/05 至 2026/05/22。",
      "組別包含 U15, U17, U23, ELITE, M30, M40 及女子組。"
    ]
  }
];
