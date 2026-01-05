
import { ElevationPoint, EventInfo, EventType } from './types';

export const ELEVATION_DATA: ElevationPoint[] = [
  { name: '地理中心碑', distance: 0, elevation: 450 },
  { name: '人止關', distance: 16, elevation: 790 },
  { name: '霧社', distance: 22, elevation: 1170 },
  { name: '清境', distance: 29, elevation: 1600 },
  { name: '翠峰', distance: 39, elevation: 2330 },
  { name: '鳶峰', distance: 45, elevation: 2730 },
  { name: '昆陽', distance: 52, elevation: 3100 },
  { name: '武嶺', distance: 55, elevation: 3275 },
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
