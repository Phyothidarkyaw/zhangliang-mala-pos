"use client";

import { useProfileStore } from "@/stores/useProfileStore";
import LogoutBtn from "./LogoutBtn";

function DashboardHeader() {
  const { profile } = useProfileStore();

  return (
    <header className="border-b bg-card mb-8">
      <div className="py-2 container mx-auto flex justify-between items-center">
        <div>
          <img className="h-8" src="/logo.svg" alt="" />
        </div>
        <div className="flex gap-3 items-center">
          <img
            className="size-10 rounded-full border-2 border-muted"
            src={`${profile?.photo}`}
            alt=""
          />
          <div>
            <h5 className="font-semibold text-foreground">{profile?.name}</h5>
            <p className="text-sm text-foreground">{profile?.email}</p>
          </div>
        <LogoutBtn/>
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;
