export function convertView(
  val: string,
  width: number,
  height: number
): number {
  const num = parseFloat(val.slice(0, -2));

  if (val.includes("vw")) return width * (num / 100);
  if (val.includes("vh")) return height * (num / 100);
}
