export default function trimId(string: string | undefined): string {
  const first = string?.slice(0, 4);
  const second = string?.slice(-4);

  return `${first}-${second}`;
}
