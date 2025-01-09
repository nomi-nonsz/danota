'use client'

import { useRouter, useSearchParams, type ReadonlyURLSearchParams } from "next/navigation";

export const useFilterByParam = (queryName: string) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const set = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value.length < 1 && params.has(queryName)) {
      params.delete(queryName);
    }
    else {
      params.set(queryName, value);
    }

    router.replace(`?${params.toString()}`);
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    set(query);
  }

  return { onChange };
}

export const useFilterByParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const set = (object: Object) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(object).forEach((i) => {
      const queryName = i[0];
      const value = i[1];

      if (value.length < 1 && params.has(queryName)) {
        params.delete(queryName);
      }
      else {
        params.set(queryName, value);
      }
    })

    router.replace(`?${params.toString()}`);
  }

  return { set };
}