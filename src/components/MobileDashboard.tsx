"use client";

import MobileHero from "@/components/MobileHero";
import MobileContinueLearning from "@/components/MobileContinueLearning";
import MobileExploreCourses from "@/components/MobileExploreCourses";
import MobileShell from "@/components/MobileShell";

interface MobileDashboardProps {
  search: string;
  onSearch: (value: string) => void;
}

export default function MobileDashboard({
  search,
  onSearch,
}: MobileDashboardProps) {
  return (
    <MobileShell search={search} onSearch={onSearch}>
      <div className="flex flex-col gap-6 px-5 pt-2 pb-6">
        <MobileHero />
        <MobileContinueLearning search={search} />
        <MobileExploreCourses search={search} />
      </div>
    </MobileShell>
  );
}
