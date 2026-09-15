"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { exploreCourses, inProgressCourses } from "@/data/courses";

/**
 * Warms the router cache for every route right after boot so that page
 * switches are instant afterwards — the boot splash covers the prefetching,
 * and taps never hit the loading fallback. Rendered once in the root layout
 * (client-side navigations don't re-run it).
 */
export default function RouteWarmer() {
  const router = useRouter();

  useEffect(() => {
    const ids = new Set<string>([
      ...exploreCourses.map((c) => c.id),
      ...inProgressCourses.map((c) => c.id),
    ]);

    // Small delay so hydration + the initial paint of the current page come
    // first; the splash stays up while these warm in the background.
    const timer = setTimeout(() => {
      router.prefetch("/courses");
      router.prefetch("/profile");
      router.prefetch("/tools");
      ids.forEach((id) => router.prefetch(`/course/${id}`));
    }, 400);

    return () => clearTimeout(timer);
  }, [router]);

  return null;
}