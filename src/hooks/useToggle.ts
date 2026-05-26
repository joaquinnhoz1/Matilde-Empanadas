import { useCallback, useState } from 'react';

/** Boolean state with a stable toggler + setters. */
export function useToggle(initial = false) {
  const [on, setOn] = useState(initial);
  const toggle = useCallback(() => setOn((v) => !v), []);
  const open   = useCallback(() => setOn(true), []);
  const close  = useCallback(() => setOn(false), []);
  return { on, toggle, open, close, setOn };
}
