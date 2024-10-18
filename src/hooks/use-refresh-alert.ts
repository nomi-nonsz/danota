import { useEffect } from "react";

export function useRefreshAlert (isEmpty: boolean) {
  useEffect(() => {
    const handle = (e: Event) => {
      e.preventDefault();
      // @ts-ignore
      e.returnValue = '';
    }

    window.addEventListener('beforeunload', handle);

    return () => window.removeEventListener('beforeunload', handle);
  }, []);
}