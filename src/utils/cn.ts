/**
 * cn — tiny classNames helper.
 * Accepts strings, arrays, objects ({ classA: boolean }).
 */
type Cn = string | undefined | null | false | Record<string, unknown> | Cn[];

export function cn(...args: Cn[]): string {
  const out: string[] = [];
  for (const a of args) {
    if (!a) continue;
    if (typeof a === 'string') out.push(a);
    else if (Array.isArray(a)) {
      const inner = cn(...a);
      if (inner) out.push(inner);
    } else if (typeof a === 'object') {
      for (const [k, v] of Object.entries(a)) if (v) out.push(k);
    }
  }
  return out.join(' ');
}
