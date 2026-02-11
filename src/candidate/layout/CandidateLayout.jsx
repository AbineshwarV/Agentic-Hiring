import CandidateSidebar from "../components/CandidateSidebar"
import CandidateHeader from "../components/CandidateHeader"
import { Outlet } from "react-router-dom"
import {
  SidebarProvider,
  SidebarTrigger,
} from "../../components/ui/sidebar"

export default function CandidateLayout() {
  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen w-full">
        {/* Sidebar */}
        <CandidateSidebar />

        {/* Main area */}
        <div className="flex flex-1 flex-col">
          {/* Header */}
          <header className="flex h-14 items-center border-b px-4">
            {/* LEFT SIDE ONLY */}
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <CandidateHeader />
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 overflow-y-auto p-6 bg-muted/40">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
