import { Outlet } from "react-router-dom"

import RecruiterSidebar from "../components/RecruiterSidebar"
import RecruiterHeader from "../components/RecruiterHeader"
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function RecruiterLayout() {
  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen w-full overflow-x-hidden">

        {/* Sidebar */}
        <RecruiterSidebar />

        {/* Main area */}
        <div className="flex flex-1 flex-col min-w-0">
          {/* Header */}
          <header className="flex h-14 items-center border-b px-4">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <RecruiterHeader />
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 overflow-y-auto overflow-x-hidden bg-muted/40">
            <div className="px-6 py-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
