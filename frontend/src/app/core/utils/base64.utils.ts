export function encodeObjectValues<T extends object>(obj: T): T {
  const result: Record<string, string> = {};

  for (const key of Object.keys(obj)) {
    const value = (obj as Record<string, unknown>)[key];
    const stringified = typeof value === 'string' ? value : JSON.stringify(value);
    result[key] = btoa(unescape(encodeURIComponent(stringified)));
  }

  return result as unknown as T;
}
