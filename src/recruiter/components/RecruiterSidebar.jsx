import { NavLink } from "react-router-dom"
import {
  LayoutGrid,
  Briefcase,
  BarChart3,
  ShieldAlert,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

/* ================= Sidebar Link ================= */
const SidebarLink = ({ to, icon: Icon, label, end }) => {
  return (
    <SidebarMenuItem>
      <NavLink to={to} end={end} className="w-full">
        {({ isActive }) => (
          <Tooltip delayDuration={150}>
            <TooltipTrigger asChild>
              <SidebarMenuButton
                className={cn(
                  "group relative flex w-full items-center gap-3 rounded-lg px-3 py-2",
                  "transition-colors duration-200",
                  "hover:bg-muted/80",
                  "focus-visible:ring-2 focus-visible:ring-ring",
                  "group-data-[collapsible=icon]:justify-center",
                  isActive
                    ? "bg-muted text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {/* Active indicator */}
                <span
                  className={cn(
                    "absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r bg-primary transition-opacity",
                    isActive ? "opacity-100" : "opacity-0"
                  )}
                />

                {/* Icon */}
                <Icon className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-110" />

                {/* Label */}
                <span className="group-data-[collapsible=icon]:hidden">
                  {label}
                </span>
              </SidebarMenuButton>
            </TooltipTrigger>

            {/* Tooltip (collapsed sidebar) */}
            <TooltipContent
              side="right"
              className="hidden group-data-[collapsible=icon]:block"
            >
              {label}
            </TooltipContent>
          </Tooltip>
        )}
      </NavLink>
    </SidebarMenuItem>
  )
}

/* ================= Recruiter Sidebar ================= */
export default function RecruiterSidebar() {
  return (
    <Sidebar collapsible="icon">
      {/* Header */}
      <SidebarHeader>
        <div className="px-3 py-2.5">
          <div className="flex items-center justify-between">
            <span className="tracking-wide group-data-[collapsible=icon]:hidden">
              <span className="text-lg font-semibold text-slate-500">
                Virtu
              </span>
              <span className="ml-1 text-xl font-extrabold text-orange-500">
                Forge
              </span>
            </span>
          </div>

          <Separator className="mt-2 group-data-[collapsible=icon]:hidden" />
        </div>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent>
        <SidebarMenu className="gap-1 px-1 pt-2">
          {/* Dashboard (EXACT MATCH) */}
          <SidebarLink
            to="/recruiter/dashboard"
            icon={LayoutGrid}
            label="Dashboard"
            end
          />

          {/* Child routes */}
          <SidebarLink
            to="/recruiter/dashboard/jobs"
            icon={Briefcase}
            label="Create Jobs"
          />

          <SidebarLink
            to="/recruiter/dashboard/analytics"
            icon={BarChart3}
            label="Analytics Reports"
          />

          <SidebarLink
            to="/recruiter/dashboard/fraud-detection"
            icon={ShieldAlert}
            label="Fraud Detection"
          />
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}
