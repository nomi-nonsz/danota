'use client'

import { useRouter, type ReadonlyURLSearchParams } from "next/navigation";

export const useFilterByParam = (searchParams: ReadonlyURLSearchParams, queryName: string) => {
  const router = useRouter();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    const params = new URLSearchParams(searchParams);

    if (query.length < 1 && params.has(queryName)) {
      params.delete(queryName);
    }
    else {
      params.set(queryName, query);
    }

    router.replace(`?${params.toString()}`);
  }

  return { onChange }
}