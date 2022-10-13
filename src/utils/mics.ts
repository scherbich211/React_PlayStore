export const redirect = (url: string) => {
  if (typeof window !== undefined) {
    window.location.href = url;
  }
};

export function getValueAtIndex(index: number) {
  const str = window.location.href;
  return str.replace(/^\/+/g, "").split("/")[index];
}
