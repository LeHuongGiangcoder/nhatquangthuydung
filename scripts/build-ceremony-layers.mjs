/**
 * Cắt bộ vườn lễ cưới (public/Watercolor-Ceremony-Layers) thành asset webp
 * cho section Thời gian & Địa điểm.
 *
 * Khác bộ lâu đài ở một điểm quan trọng: 18 file trong 02-Aligned-Layers đã
 * được CĂN SẴN trên cùng một canvas 1108x1420, chồng lên nhau là khớp. Nên
 * thay vì tự đoán toạ độ từng lớp, script cắt gọn mỗi lớp về đúng khung bao
 * của nó rồi GHI LẠI vị trí cũ dưới dạng phần trăm canvas. File nhẹ đi nhiều
 * mà xếp lại vẫn khít tuyệt đối.
 *
 * Bộ gốc xanh đậm hơn tranh của site (cypress rgb(125,132,90) so với ~195 của
 * bộ lâu đài), nên vẫn phải đi qua bước hạ tông như bộ trước.
 *
 * Chạy: node scripts/build-ceremony-layers.mjs
 */
import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const SRC = "public/Watercolor-Ceremony-Layers/02-Aligned-Layers-1108x1420";
const OUT = "public/assets";
const CANVAS_W = 1108;
const CANVAS_H = 1420;
/** Bề rộng tối đa của asset xuất ra, tính trên canvas đầy đủ. */
const TARGET_W = 1000;

/* Mỗi nhóm cần một tay khác hẳn nhau vì bộ gốc vốn đã lệch tông rất khác:
   cây bách tối thui (rgb 125,132,90) nên phải nâng mạnh, còn nhà vòm vốn ĐÃ
   sáng hơn tranh của site (rgb 228,219,199 so với ~199) nên nâng thêm nữa là
   nó trắng xoá, mất hết nét đá — vì thế nhóm này phải HẠ xuống. */
const LEAF = { saturation: 0.42, brightness: 1.2, lightness: 15 };
const STONE = { saturation: 0.82, brightness: 0.97, lightness: -3 };
const SOFT = { saturation: 0.62, brightness: 1.04, lightness: 4 };
const PALE = { saturation: 0.86, brightness: 1.0, lightness: 0 };

/**
 * [tên đích, [file nguồn…], tông]
 * Gộp những lớp không cần chuyển động riêng (hàng rào, ghế, bình hoa) để bớt
 * số ảnh phải tải; giữ riêng những lớp có nhịp riêng (hai cây, các cụm hoa).
 */
const JOBS = [
  ["cer-cypress", ["02-Cypress-Grove.png"], LEAF],
  ["cer-tree-left", ["03-Tree-Left.png"], LEAF],
  ["cer-tree-right", ["04-Tree-Right.png"], LEAF],
  ["cer-fence", ["05-Fence-Left.png", "06-Fence-Right.png"], STONE],
  ["cer-lawn", ["01-Lawn-and-Stone-Aisle.png"], SOFT],
  ["cer-gazebo", ["07-Gazebo.png"], STONE],
  ["cer-urns", ["08-Urn-and-Pedestal-Left.png", "09-Urn-and-Pedestal-Right.png"], STONE],
  ["cer-chairs", ["10-Chairs-Left.png", "11-Chairs-Right.png"], PALE],
  ["cer-rear-left", ["12-Flowers-Rear-Left.png"], SOFT],
  ["cer-rear-right", ["13-Flowers-Rear-Right.png"], SOFT],
  ["cer-mid-left", ["14-Flowers-Middle-Left.png"], SOFT],
  ["cer-mid-right", ["15-Flowers-Middle-Right.png"], SOFT],
  ["cer-front-left", ["16-Flowers-Foreground-Left.png"], SOFT],
  ["cer-front-right", ["17-Flowers-Foreground-Right.png"], SOFT],
];

const manifest = {};
await mkdir(OUT, { recursive: true });

for (const [name, files, tone] of JOBS) {
  // Gộp nhiều file: chồng lên đúng canvas gốc rồi mới cắt, nếu cắt trước thì
  // mất tương quan vị trí giữa chúng.
  let buf;
  if (files.length === 1) {
    buf = await sharp(path.join(SRC, files[0]), { limitInputPixels: false }).png().toBuffer();
  } else {
    buf = await sharp({
      create: { width: CANVAS_W, height: CANVAS_H, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
    })
      .composite(files.map((f) => ({ input: path.join(SRC, f) })))
      .png()
      .toBuffer();
  }

  // trim() cắt viền trong suốt và trả về offset đã cắt trong info.trimOffset
  const trimmed = await sharp(buf).trim({ threshold: 1 }).toBuffer({ resolveWithObject: true });
  const off = trimmed.info.trimOffsetLeft !== undefined
    ? { left: -trimmed.info.trimOffsetLeft, top: -trimmed.info.trimOffsetTop }
    : { left: 0, top: 0 };

  const scale = TARGET_W / CANVAS_W;
  const info = await sharp(trimmed.data)
    .resize({ width: Math.max(1, Math.round(trimmed.info.width * scale)), withoutEnlargement: true })
    .modulate({ saturation: tone.saturation, brightness: tone.brightness })
    .modulate({ lightness: tone.lightness })
    .webp({ quality: 86, alphaQuality: 92, effort: 6 })
    .toFile(path.join(OUT, `${name}.webp`));

  // Vị trí ghi theo PHẦN TRĂM canvas gốc, nên dựng lại ở bất kỳ cỡ nào cũng khít
  manifest[name] = {
    src: `/assets/${name}.webp`,
    w: info.width,
    h: info.height,
    left: +(off.left / CANVAS_W).toFixed(5),
    top: +(off.top / CANVAS_H).toFixed(5),
    width: +(trimmed.info.width / CANVAS_W).toFixed(5),
  };
  console.log(
    `${name.padEnd(18)} ${String(info.width).padStart(4)}x${String(info.height).padEnd(4)} ` +
      `@ ${(manifest[name].left * 100).toFixed(1)}%,${(manifest[name].top * 100).toFixed(1)}% ` +
      `w=${(manifest[name].width * 100).toFixed(1)}%  ${(info.size / 1024).toFixed(0)}KB`,
  );
}

await writeFile(path.join(OUT, "ceremony-layers.json"), JSON.stringify(manifest, null, 2) + "\n");
console.log(`\n→ ${OUT}/ceremony-layers.json`);
