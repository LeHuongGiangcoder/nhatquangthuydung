/** Toàn bộ nội dung hardcode — sửa ở đây là đổi cả site. */

/**
 * Domain thật của thiệp. Dùng cho thẻ xem trước khi chia sẻ (Open Graph) —
 * Facebook / Zalo / iMessage đòi đường dẫn tuyệt đối, đường dẫn tương đối là
 * ảnh không hiện.
 *
 * PHẢI khớp với `SITE_ORIGIN` trong docs/apps-script.gs, nếu không link riêng
 * gửi cho khách sẽ trỏ sang một domain khác.
 */
export const SITE_URL = "https://nhatquangthuydung.gloweb.site";

export const COUPLE = {
  groom: "Nhật Quang",
  bride: "Thùy Dung",
  dateDisplay: "17.04.2027",
  dateFull: "Thứ Bảy, ngày 17 tháng 04 năm 2027",
  lunar: "Nhằm ngày 11 tháng 03 năm Đinh Mùi",
  city: "TP. Hồ Chí Minh",
};

/** Monogram QD (bản nền trong, cắt sát từ monogram.png) — dùng ở intro, hero và thank you. */
export const MONOGRAM = { src: "/monogram-clear.png", w: 555, h: 566 };

/** Dòng chào ở hero. `guest` là tên mặc định khi thiệp mở không kèm link riêng. */
export const HERO = {
  greeting: "Kính gửi",
  guest: "Quý khách",
  invite: "Chúng mình trân trọng kính mời bạn đến chung vui trong ngày cưới",
};

/**
 * Buổi tiệc của đám cưới. Chỉ còn tiệc chính — `PARTIES` vẫn là một `Record`
 * để thêm lại một buổi nữa chỉ là thêm một khoá.
 */
export type PartyId = "main";

export type Party = {
  id: PartyId;
  /** Nhãn ngắn của buổi tiệc, dùng ở tiêu đề phụ và tiêu đề trang */
  tab: string;
  event: string;
  weekday: string;
  dateShort: string;
  time: string;
  /**
   * Mốc giờ đầy đủ kèm múi giờ Việt Nam — lịch nhỏ và dòng tháng/năm ở phần
   * Thời gian tính từ đây. Đổi `time` hay ngày cưới thì nhớ sửa cả dòng này.
   */
  startsAt: string;
  hall: string;
  venue: string;
  address: string;
  city: string;
  mapUrl: string;
};

export const PARTIES: Record<PartyId, Party> = {
  main: {
    id: "main",
    tab: "Tiệc chính",
    event: "Lễ thành hôn",
    weekday: "Thứ Bảy",
    dateShort: "17 . 04 . 2027",
    time: "17:30",
    startsAt: "2027-04-17T17:30:00+07:00",
    hall: "Sảnh Grand Skylar · Tầng 5",
    venue: "Thiskyhall Sala",
    address: "10 Mai Chí Thọ, P. An Khánh, TP.HCM",
    city: "TP. Hồ Chí Minh",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Thiskyhall+Sala+10+Mai+Chi+Tho+An+Khanh",
  },
};

/** Chương trình buổi tiệc. `art` là minh hoạ đi kèm từng mốc giờ. */
export const AGENDA = [
  { time: "17:30", title: "Welcome Guest", desc: "Đón khách", art: "el-bouquet-white" },
  { time: "18:30", title: "Toasting Ceremony", desc: "Nghi lễ", art: "el-champagne-tower" },
  { time: "19:00", title: "Dinner", desc: "Khai tiệc", art: "el-dinner-setting" },
  { time: "20:00", title: "Party", desc: "Đêm nhạc", art: "el-champagne-glasses" },
] as const;

/** Nghệ sĩ khách mời. Ảnh cắt từ design/singer-cutout.png (nền trong). */
export const ARTISTS = [
  { name: "Lê Hiếu", src: "/assets/singer-le-hieu.webp", w: 419, h: 900 },
  { name: "Quốc Thiên", src: "/assets/singer-quoc-thien.webp", w: 512, h: 900 },
];

export const DRESSCODE = {
  note: "Kính mong quý khách lựa chọn trang phục theo những gam màu dưới đây để cùng chúng mình hoàn thiện khung hình ngày trọng đại.",
  avoid: "Xin phép hạn chế tông trắng tinh và đen tuyền.",
  palette: [
    { name: "Nâu đậm", hex: "#663300" },
    { name: "Nâu sữa", hex: "#bf9a6a" },
    { name: "Vàng be", hex: "#ebdcb6" },
    { name: "Trắng ngà", hex: "#f7f3ea" },
    { name: "Xanh lá nhạt", hex: "#9db08b" },
    { name: "Xanh bạc hà", hex: "#d4ede1" },
    { name: "Hồng phấn", hex: "#f2d4d7" },
    { name: "Hồng đào", hex: "#e8bac1" },
  ],
};
