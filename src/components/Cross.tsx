/** Dấu thánh giá nhỏ — dùng nối tên cô dâu chú rể và nối các mốc trong agenda. */
export function Cross({
  size = "1.15rem",
  className = "",
}: {
  size?: string;
  className?: string;
}) {
  return (
    <span aria-hidden className={`cross-mark ${className}`} style={{ fontSize: size }}>
      ✛
    </span>
  );
}


/**
 * Dấu "&" nối tên cô dâu chú rể.
 *
 * Chữ "&" của font tên (Mon Cheri) quá to bản và thô so với nét chữ mảnh của
 * hai dòng tên; bản italic của font body có bụng cong mềm, thu nhỏ lại và
 * chuyển sang màu vàng đồng thì đứng giữa hai dòng như một nét trang trí chứ
 * không phải một chữ bị chèn vào tên.
 *
 * Không đặt cỡ chữ mặc định: style inline đè cả stylesheet, nên để trống thì
 * màn chào và thiệp mới chỉnh được cỡ riêng trong CSS.
 */
export function Amp({
  size,
  className = "",
}: {
  size?: string;
  className?: string;
} = {}) {
  return (
    <span
      aria-hidden
      className={`amp-mark ${className}`}
      style={size ? { fontSize: size } : undefined}
    >
      &amp;
    </span>
  );
}
