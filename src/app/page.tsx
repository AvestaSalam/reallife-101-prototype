"use client";

import { useState } from "react";
import DesktopDashboard from "@/components/DesktopDashboard";
import MobileDashboard from "@/components/MobileDashboard";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function Dashboard() {
  const [search, setSearch] = useState("");
  // Reads the viewport synchronously on the client (see useIsMobile): during
  // client-side navigation the first render already matches the device, and
  // SSR/hydration uses the desktop baseline via the server snapshot.
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? (
        <MobileDashboard search={search} onSearch={setSearch} />
      ) : (
        <DesktopDashboard search={search} onSearch={setSearch} />
      )}
    </>
  );
}

