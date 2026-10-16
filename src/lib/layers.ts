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

  /** Hai góc hoa của hero — mép trên và mép ngoài cắt thẳng, đặt sát góc. */
  "hero-corner-left": { src: "/assets/hero-corner-left.970d9fd1.webp", w: 900, h: 712 },
  "hero-corner-right": { src: "/assets/hero-corner-right.5fdbea97.webp", w: 900, h: 778 },
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

  /* Bộ element tách lớp — dựng bằng scripts/build-scene-layers.mjs từ
     public/Watercolor-Wedding-Element-Set. Bản gốc xanh đậm hơn tranh của
     site nhiều, script đã hạ tông sẵn; đừng dùng thẳng file PNG gốc. */

  /* Cảnh vườn của hero, xếp từ xa ra gần đúng thứ tự trong HUONG-DAN.txt:
     cây xa → lâu đài → sân vườn & đài phun nước → cây lớn → cặp đôi →
     hoa tiền cảnh. */
  "garden-trees-far": { src: "/assets/garden-trees-far.webp", w: 600, h: 353 },
  "garden-chateau": { src: "/assets/garden-chateau.webp", w: 564, h: 450 },
  "garden-parterre": { src: "/assets/garden-parterre.webp", w: 723, h: 236 },
  "garden-tree": { src: "/assets/garden-tree.webp", w: 499, h: 611 },
  "garden-couple": { src: "/assets/garden-couple.webp", w: 459, h: 637 },
  "garden-bloom-left": { src: "/assets/garden-bloom-left.webp", w: 511, h: 437 },
  "garden-bloom-right": { src: "/assets/garden-bloom-right.webp", w: 515, h: 451 },

  /* Khung cổng của intro, xếp từ dưới lên: bậc thềm → hai cột → hai rèm →
     đèn chùm → hoa góc trên & hoa chân cột. */
  "arch-steps": { src: "/assets/arch-steps.webp", w: 656, h: 221 },
  "arch-column-left": { src: "/assets/arch-column-left.webp", w: 179, h: 534 },
  "arch-column-right": { src: "/assets/arch-column-right.webp", w: 179, h: 534 },
  "arch-curtain-left": { src: "/assets/arch-curtain-left.webp", w: 351, h: 538 },
  "arch-curtain-right": { src: "/assets/arch-curtain-right.webp", w: 344, h: 540 },
  "arch-chandelier": { src: "/assets/arch-chandelier.webp", w: 303, h: 442 },
  "arch-flowers-top-left": { src: "/assets/arch-flowers-top-left.webp", w: 457, h: 549 },
  "arch-flowers-top-right": { src: "/assets/arch-flowers-top-right.webp", w: 471, h: 544 },
  "arch-flowers-base-left": { src: "/assets/arch-flowers-base-left.webp", w: 351, h: 354 },
  "arch-flowers-base-right": { src: "/assets/arch-flowers-base-right.webp", w: 345, h: 357 },


  /* Vườn lễ cưới — dựng bằng scripts/build-ceremony-layers.mjs từ
     public/Watercolor-Ceremony-Layers. Khác bộ lâu đài: 14 lớp này đã căn
     sẵn trên cùng một canvas 1108x1420, nên mỗi lớp kèm luôn toạ độ của nó
     trong CEREMONY bên dưới — cứ xếp đúng toạ độ đó là khít.
     Thứ tự chồng: cây bách → hai cây lá → hàng rào → cỏ & lối đi → nhà vòm
     → bình hoa → ghế → hoa cuối lối → hoa giữa lối → hoa tiền cảnh. */
  "cer-cypress": { src: "/assets/cer-cypress.webp", w: 555, h: 554 },
  "cer-tree-left": { src: "/assets/cer-tree-left.webp", w: 202, h: 288 },
  "cer-tree-right": { src: "/assets/cer-tree-right.webp", w: 197, h: 287 },
  "cer-fence": { src: "/assets/cer-fence.webp", w: 815, h: 180 },
  "cer-lawn": { src: "/assets/cer-lawn.webp", w: 829, h: 616 },
  "cer-gazebo": { src: "/assets/cer-gazebo.webp", w: 283, h: 470 },
  "cer-urns": { src: "/assets/cer-urns.webp", w: 477, h: 126 },
  "cer-chairs": { src: "/assets/cer-chairs.webp", w: 973, h: 264 },
  "cer-rear-left": { src: "/assets/cer-rear-left.webp", w: 117, h: 118 },
  "cer-rear-right": { src: "/assets/cer-rear-right.webp", w: 122, h: 112 },
  "cer-mid-left": { src: "/assets/cer-mid-left.webp", w: 170, h: 149 },
  "cer-mid-right": { src: "/assets/cer-mid-right.webp", w: 172, h: 149 },
  "cer-front-left": { src: "/assets/cer-front-left.webp", w: 289, h: 203 },
  "cer-front-right": { src: "/assets/cer-front-right.webp", w: 276, h: 200 },

  /* Cảm ơn: cặp đôi và hai chiếc ô tách rời, để ô xoay được quanh tâm nó mà
     người đứng yên. Bản gộp cũ (el-umbrellas) không làm được việc đó. */
  "thanks-couple": { src: "/assets/thanks-couple.webp", w: 760, h: 1466 },
  "thanks-parasol-mr": { src: "/assets/thanks-parasol-mr.webp", w: 620, h: 615 },
  "thanks-parasol-mrs": { src: "/assets/thanks-parasol-mrs.webp", w: 620, h: 618 },

  /** Bồ câu rời, mỗi con một đường bay. `7.webp` vẫn là đàn ở xa. */
  "dove-1": { src: "/assets/dove-1.webp", w: 420, h: 414 },
  "dove-2": { src: "/assets/dove-2.webp", w: 420, h: 406 },
  "dove-3": { src: "/assets/dove-3.webp", w: 420, h: 233 },
  "dove-4": { src: "/assets/dove-4.webp", w: 420, h: 442 },
} as const;


/**
 * Toạ độ từng lớp vườn lễ cưới trên canvas gốc 1108x1420, tính theo phần
 * trăm. Do scripts/build-ceremony-layers.mjs ghi ra — đừng sửa tay.
 */
export const CEREMONY = {
  "cer-cypress": { left: 0.22292, top: 0.22606, width: 0.55505 },
  "cer-tree-left": { left: 0.01895, top: 0.42254, width: 0.20217 },
  "cer-tree-right": { left: 0.78069, top: 0.41972, width: 0.19675 },
  "cer-fence": { left: 0.09116, top: 0.58099, width: 0.81498 },
  "cer-lawn": { left: 0.08484, top: 0.4838, width: 0.82852 },
  "cer-gazebo": { left: 0.3574, top: 0.31056, width: 0.28339 },
  "cer-urns": { left: 0.26264, top: 0.56479, width: 0.47653 },
  "cer-chairs": { left: 0.01264, top: 0.67958, width: 0.97292 },
  "cer-rear-left": { left: 0.3204, top: 0.64789, width: 0.11733 },
  "cer-rear-right": { left: 0.55957, top: 0.6507, width: 0.12184 },
  "cer-mid-left": { left: 0.24729, top: 0.73803, width: 0.16968 },
  "cer-mid-right": { left: 0.57942, top: 0.73803, width: 0.17238 },
  "cer-front-left": { left: 0.09838, top: 0.8331, width: 0.28881 },
  "cer-front-right": { left: 0.61733, top: 0.83521, width: 0.27617 },
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
