import { useEffect } from "react";

export function useRefreshAlert (isDirty: boolean) {
  useEffect(() => {
    const handle = (e: Event) => {
      e.preventDefault();
      // @ts-ignore
      e.returnValue = '';
    }

    if (isDirty) {
      window.addEventListener('beforeunload', handle);
  
      return () => window.removeEventListener('beforeunload', handle);
    }
  }, [isDirty]);
}