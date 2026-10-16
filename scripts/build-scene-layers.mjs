/**
 * Cắt bộ element màu nước tách lớp (public/Watercolor-Wedding-Element-Set)
 * thành asset webp dùng được cho intro và hero.
 *
 * Bộ gốc vẽ xanh đậm và rực hơn hẳn tranh của site (sage/kem rất nhạt), nên
 * mỗi lớp đều đi qua một bước "hạ tông": bớt bão hoà, nâng sáng, ngả về phía
 * giấy kem. Không chỉnh thì cảnh vườn nhảy hẳn ra khỏi tông của cả thiệp.
 *
 * Chạy: node scripts/build-scene-layers.mjs
 * sharp đi kèm next nên không cần cài thêm; next đổi nhà thì cài `sharp` rời.
 */
import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const SRC = "public/Watercolor-Wedding-Element-Set";
const OUT = "public/assets";

/** Cây lá của cảnh vườn — mảng màu lớn nhất, hạ mạnh tay nhất. */
const LEAF = { saturation: 0.5, brightness: 1.09, lightness: 8 };
/** Kiến trúc và hoa: giữ nhiều chi tiết hơn một chút. */
const SOFT = { saturation: 0.6, brightness: 1.06, lightness: 6 };
/** Lớp vốn đã trắng/kem (cột, rèm, đèn chùm, bồ câu) chỉ cần chạm rất nhẹ. */
const PALE = { saturation: 0.82, brightness: 1.02, lightness: 2 };

/** [file nguồn, tên đích, bề rộng đích, tông màu] */
const JOBS = [
  /* ── Cảnh vườn của hero. Thứ tự chồng lớp theo HUONG-DAN.txt:
        cây xa → lâu đài → sân vườn & đài phun nước → cây lớn →
        bồ câu & cặp đôi → hoa tiền cảnh. ── */
  ["01-Garden/04-Distant-Trees.png", "garden-trees-far", 900, LEAF],
  ["01-Garden/01-Chateau.png", "garden-chateau", 900, SOFT],
  ["01-Garden/02-Garden-and-Fountain.png", "garden-parterre", 900, LEAF],
  ["01-Garden/03-Framing-Tree.png", "garden-tree", 900, LEAF],
  ["01-Garden/05-Foreground-Flowers-Left.png", "garden-bloom-left", 900, SOFT],
  ["01-Garden/06-Foreground-Flowers-Right.png", "garden-bloom-right", 900, SOFT],
  ["03-Couple-and-Doves/01-Couple.png", "garden-couple", 900, PALE],

  /* ── Khung cổng của intro, từ dưới lên:
        bậc thềm → hai cột → hai rèm → đèn chùm → hoa trên & hoa chân cột. ── */
  ["02-Arch/08-Stair-Platform.png", "arch-steps", 900, PALE],
  ["02-Arch/01-Column-Left.png", "arch-column-left", 560, PALE],
  ["02-Arch/02-Column-Right.png", "arch-column-right", 560, PALE],
  ["02-Arch/03-Curtain-Left.png", "arch-curtain-left", 900, PALE],
  ["02-Arch/04-Curtain-Right.png", "arch-curtain-right", 900, PALE],
  ["02-Arch/07-Chandelier.png", "arch-chandelier", 700, PALE],
  ["02-Arch/05-Upper-Flowers-Left.png", "arch-flowers-top-left", 900, SOFT],
  ["02-Arch/06-Upper-Flowers-Right.png", "arch-flowers-top-right", 900, SOFT],
  ["02-Arch/09-Base-Flowers-Left.png", "arch-flowers-base-left", 900, SOFT],
  ["02-Arch/10-Base-Flowers-Right.png", "arch-flowers-base-right", 900, SOFT],

  /* Bồ câu rời: mỗi con một đường bay (02-Dove-01.png trong bộ gốc hỏng file) */
  ["03-Couple-and-Doves/03-Dove-02.png", "dove-1", 420, PALE],
  ["03-Couple-and-Doves/04-Dove-03.png", "dove-2", 420, PALE],
  ["03-Couple-and-Doves/05-Dove-04.png", "dove-3", 420, PALE],
  ["03-Couple-and-Doves/06-Dove-05.png", "dove-4", 420, PALE],
];

const manifest = {};

await mkdir(OUT, { recursive: true });

for (const [src, name, width, tone] of JOBS) {
  // withoutEnlargement: bộ gốc nhỏ (cao nhất 723px), phóng to chỉ làm nhoè —
  // bề rộng đích ở trên là trần, không phải đích phải đạt.
  const img = sharp(path.join(SRC, src), { limitInputPixels: false })
    .resize({ width, withoutEnlargement: true })
    .modulate({ saturation: tone.saturation, brightness: tone.brightness })
    // `lightness` của modulate cộng thẳng vào kênh L* — kéo cả lớp về phía
    // giấy kem thay vì chỉ làm nhạt màu.
    .modulate({ lightness: tone.lightness });

  const out = path.join(OUT, `${name}.webp`);
  const info = await img.webp({ quality: 86, alphaQuality: 92, effort: 6 }).toFile(out);
  manifest[name] = { src: `/assets/${name}.webp`, w: info.width, h: info.height };
  console.log(`${name.padEnd(24)} ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)}KB`);
}

await writeFile(path.join(OUT, "scene-layers.json"), JSON.stringify(manifest, null, 2) + "\n");
console.log(`\n→ ${OUT}/scene-layers.json`);
