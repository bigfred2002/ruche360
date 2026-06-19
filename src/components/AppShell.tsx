import type { ReactNode } from "react";
import { BottomNavigation } from "./BottomNavigation";
import { DesktopSidebar } from "./DesktopSidebar";
import { TopBar } from "./TopBar";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-cream-100 text-slate-950">
      <DesktopSidebar />
      <div className="min-h-screen lg:pl-72">
        <TopBar />
        <main id="cockpit" className="honeycomb-bg pb-32 md:pb-12">
          {children}
        </main>
      </div>
      <BottomNavigation />
    </div>
  );
}
