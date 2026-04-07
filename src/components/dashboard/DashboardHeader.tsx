import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Settings, LogOut, User } from "lucide-react";
import logo from "@/assets/pepsico-resized.svg";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
}

export function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
  return (
    <header className="bg-[#1e293b]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between pt-3 pb-2 sm:pt-4 sm:pb-3">
          <img src={logo} alt="Logo" className="h-8 w-auto brightness-0 invert sm:h-10" />
          <DropdownMenu>
            <DropdownMenuTrigger className="flex cursor-pointer items-center gap-2 rounded-full bg-white/10 py-1 pl-1 pr-3 text-sm font-medium text-white outline-none transition-colors hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-white/40">
              <Avatar size="sm">
                <AvatarFallback className="bg-white/20 text-xs text-white">U</AvatarFallback>
              </Avatar>
              <span className="hidden sm:inline">User</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={8}>
              <DropdownMenuItem onClick={() => console.log("Settings")}>
                <Settings className="mr-2 size-4" /> Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => console.log("Access")}>
                <User className="mr-2 size-4" /> Access
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => console.log("Logout")}>
                <LogOut className="mr-2 size-4" /> Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="pb-4 sm:pb-5">
          <h1 className="text-lg font-semibold text-white sm:text-xl">{title}</h1>
          {subtitle && (
            <p className="mt-0.5 text-xs text-slate-400 sm:text-sm">{subtitle}</p>
          )}
        </div>
      </div>
    </header>
  );
}
