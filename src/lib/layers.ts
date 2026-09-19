// Auto-generated từ public/assets/layers.json — kích thước gốc + vị trí trên canvas 3875x5462
export type LayerId = keyof typeof LAYERS;

export const LAYERS = {
  "6": { src: "/assets/hero-background.3e7fb7e2.webp", w: 1108, h: 1420, left: 0.0, top: 0.2725, width: 1.0, height: 0.6575 },
  "7": { src: "/assets/7.webp", w: 1013, h: 475, left: 0.0537, top: 0.2169, width: 0.8925, height: 0.2969 },
  "18": { src: "/assets/18.webp", w: 999, h: 510, left: 0.0599, top: 0.2044, width: 0.8802, height: 0.3187 },
  "19": { src: "/assets/19.webp", w: 1072, h: 762, left: 0.0115, top: 0.1319, width: 0.9445, height: 0.4763 },
  "37": { src: "/assets/hero-background.3e7fb7e2.webp", w: 1108, h: 1420, left: 0.06374, top: 0.16835, width: 0.87226, height: 0.79311 },
  "38": { src: "/assets/38.webp", w: 1437, h: 1700, left: 0.0, top: 0.12688, width: 1.0, height: 0.83925 },
  "39": { src: "/assets/39.webp", w: 573, h: 1700, left: 0.20103, top: 0.23947, width: 0.30581, height: 0.64372 },
  "40": { src: "/assets/40.webp", w: 573, h: 1700, left: 0.48439, top: 0.23947, width: 0.30581, height: 0.64372 },
} as const;

/**
 * Element rời từ bộ minh hoạ thứ hai — chỉ dùng làm decor nên không có toạ độ
 * trên canvas như LAYERS.
 *
 * Tiền tố `el-` là bắt buộc chứ không phải cho đẹp: `assets/18.webp` là xe hoa
 * còn `design/elements/18.png` là đài phun nước, trùng số nhưng khác hẳn hình.
 */
export const ELEMENTS = {
  "el-43": { src: "/assets/el-43.webp", w: 560, h: 967 },
  "el-44": { src: "/assets/el-44.webp", w: 560, h: 1404 },
  "el-45": { src: "/assets/el-45.webp", w: 900, h: 469 },
  /** Đài phun nước — khác với "18" trong LAYERS (xe hoa). */
  "el-18": { src: "/assets/el-18.webp", w: 700, h: 829 },
  "el-46": { src: "/assets/el-46.webp", w: 520, h: 400 },
  /** Dải bụi hoa trắng: 54.png lặp 5 lần, vuốt mép và chồng lấn để liền mạch. */
  "el-54-strip": { src: "/assets/el-54-strip.webp", w: 1700, h: 361 },

  /* Bộ asset dựng bằng scripts/build-hero-time-assets.mjs. */

  /** Rèm hoa tử đằng trắng — đỉnh hero (cắt từ design/curtain-plant.png). */
  "hero-wisteria": { src: "/assets/hero-wisteria.webp", w: 1200, h: 438 },
  /** Ruy băng thắt nơ: dải ngang ở trên, nơ bên phải, đuôi thả dọc mép phải. */
  ribbon: { src: "/assets/ribbon.c81e3f27.webp", w: 1181, h: 1136 },
  /** Cành hoa rum ôm góc: hoa vắt ngang phía trên, thân thả dọc bên trái. */
  "rsvp-lily": { src: "/assets/rsvp-lily.1b67fe58.webp", w: 900, h: 1046 },

  /* Cắt từ design/element set.png, design/flower.png, design/dress element.png */

  /** Bộ bàn tiệc: đĩa bạc + thẻ giấy trống ở giữa, dao nĩa hai bên. */
  "el-plate": { src: "/assets/el-plate.webp", w: 900, h: 784 },
  /** Dấu sáp vàng. */
  seal: { src: "/assets/seal.webp", w: 868, h: 900 },
  "el-rings": { src: "/assets/el-rings.webp", w: 700, h: 503 },
  "el-ring-box": { src: "/assets/el-ring-box.webp", w: 563, h: 700 },
  "el-candles": { src: "/assets/el-candles.webp", w: 665, h: 700 },
  "el-bouquet-white": { src: "/assets/el-bouquet-white.webp", w: 602, h: 700 },
  "el-bouquet-magnolia": { src: "/assets/el-bouquet-magnolia.webp", w: 624, h: 700 },
  "el-dinner-setting": { src: "/assets/el-dinner-setting.webp", w: 592, h: 700 },
  "el-champagne-tower": { src: "/assets/el-champagne-tower.webp", w: 546, h: 700 },
  "el-champagne-glasses": { src: "/assets/el-champagne-glasses.webp", w: 431, h: 700 },
  /** Tượng Aphrodite — đứng thay một cột rèm ở Chương trình. */
  "el-statue": { src: "/assets/el-statue.webp", w: 295, h: 900 },
  "el-arch": { src: "/assets/el-arch.webp", w: 788, h: 900 },
  "el-flower-1": { src: "/assets/el-flower-1.webp", w: 432, h: 700 },
  "el-flower-2": { src: "/assets/el-flower-2.webp", w: 394, h: 700 },
  "el-flower-3": { src: "/assets/el-flower-3.webp", w: 446, h: 700 },
  "el-flower-4": { src: "/assets/el-flower-4.webp", w: 355, h: 700 },
  "el-flower-5": { src: "/assets/el-flower-5.webp", w: 386, h: 700 },
  "el-flower-6": { src: "/assets/el-flower-6.webp", w: 401, h: 700 },
  "el-heels-bow": { src: "/assets/el-heels-bow.webp", w: 309, h: 700 },
  "el-mannequin": { src: "/assets/el-mannequin.webp", w: 420, h: 700 },
  /** Mr. & Mrs. hôn nhau sau hai chiếc ô. */
  "el-umbrellas": { src: "/assets/el-umbrellas.webp", w: 480, h: 700 },

  /** Tấm giấy viền ren (cắt từ design/lace-paper.png). Lòng giấy ~14–86% ngang, 17–83% dọc. */
  "lace-paper": { src: "/assets/lace-paper.webp", w: 1200, h: 857 },
  /** Dải hoa ngang ngăn giữa hai section — ghép từ các bó trong design/flower.png. */
  "flower-divider-a": { src: "/assets/flower-divider-a.webp", w: 1100, h: 300 },
  "flower-divider-b": { src: "/assets/flower-divider-b.webp", w: 952, h: 300 },
  /** Trăng khuyết và sao bốn cánh mạ vàng — trang trí Đêm nhạc. */
  moon: { src: "/assets/moon.webp", w: 700, h: 688 },
  star: { src: "/assets/star.webp", w: 547, h: 700 },
} as const;

/** Mọi hình Decor có thể dùng — LAYERS chỉ khác ở chỗ có thêm toạ độ canvas. */
export const ART = { ...LAYERS, ...ELEMENTS };
export type ArtId = keyof typeof ART;

/** Cô dâu chú rể đi trên lối vào của tranh lễ đường.
 *  left/bottom/width tính theo canvas tranh 1108x1420, không phải theo section —
 *  ảnh tranh và lớp này phải nằm chung một khung thì mới khớp ở mọi bề ngang. */
export const COUPLE_WALKING = {
  src: "/assets/couple-walking.webp",
  w: 480,
  h: 582,
  left: 0.4208,
  bottom: 0.2324,
  width: 0.1625,
} as const;
