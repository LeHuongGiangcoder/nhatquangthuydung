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
 * Dấu "&" nối tên cô dâu chú rể: chữ "&" của chính font tên, hai bên là hai
 * nét chỉ mảnh — đúng motif `.ornament` và dải hoa văn vẫn dùng khắp thiệp.
 *
 * Bản trước lấy "&" italic của font body nên nó lạc giọng giữa khối chữ
 * display: nhìn như một ký tự rơi vào chứ không phải một nét trang trí.
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
