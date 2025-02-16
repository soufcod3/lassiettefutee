"use client";

import { useRouter, useSearchParams } from "next/navigation";


export function setSearchParam(router: ReturnType<typeof useRouter>, key: string, value: string | null) {
  const params = new URLSearchParams(window.location.search);
  if (value) {
    params.set(key, value);
  } else {
    params.delete(key);
  }
  const newPathname = `${window.location.pathname}?${params.toString()}`;
  router.push(newPathname);
}
