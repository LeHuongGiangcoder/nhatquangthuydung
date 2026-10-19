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

/** Dấu "&" nối tên cô dâu chú rể — dùng chung nhịp hiện với dấu thánh giá. */
export function Amp({
  size = "1.6rem",
  className = "",
}: {
  size?: string;
  className?: string;
}) {
  return (
    <span aria-hidden className={`cross-mark ${className}`} style={{ fontSize: size }}>
      &amp;
    </span>
  );
}
