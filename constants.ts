
import { ElevationPoint, EventInfo, EventType } from './types.ts';

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
    title: "2026 TIS 夏季崇越盃武嶺挑戰賽",
    date: new Date('2026-06-15T05:00:00'),
    organizer: "桃園市鐵人運動協會",
    spirit: "3275是高度也是人生的態度，山在前無懼，是一種挑戰也是對山的一種尊敬。",
    route: "地理中心碑 (0K/450M) → 人止關 (16K/790M) → 霧社 (22K/1170M) → 清境 (29K/1600M) → 翠峰 (39K/2330M) → 鳶峰 (45K/2730M) → 昆陽 (52K/3100M) → 武嶺停車場 (55K/3275M)",
    details: [
      "菁英組：04:50 出發，限時 4 小時完成，超時判未完賽無獎牌。",
      "挑戰組：05:00 分批出發，依個人晶片計時。",
      "獎項：(金) 4小時內、(銀) 5小時內、(銅) 7小時內、(鐵) 翠峰關門。",
      "玫瑰金武嶺鎮：累積 3 次同款或中斷 5 次可申請更換。",
      "特別注意：晶片坐管貼禁止上車頂架前黏貼，損壞需現場舉證碼表。"
    ]
  },
  {
    id: EventType.NEVER_STOP,
    title: "2026 NeverStop 挑戰巔峰－武嶺",
    date: new Date('2026-06-27T05:00:00'),
    organizer: "臺灣自由車運動協會",
    spirit: "追求卓越的自我，不在征服他人，而在自我挑戰，追求永不放棄之運動精神及毅力。",
    route: "埔里地理中心碑 → 人止關 → 霧社 → 清境 → 翠峰 → 鳶峰 → 昆陽 → 武嶺",
    details: [
      "報名日期：2026/01/05(一) 至 2026/05/22(五)。",
      "競賽組：限定 4 小時完賽。包含 ELITE, U23, M30, M40 等組別。",
      "挑戰組：限定 7 小時完賽。",
      "活動宗旨：以更高、更快、更強的奧林匹克格言為目標。"
    ]
  }
];
