
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  BookOpen,
  CheckSquare,
  Target,
  CalendarCheck,
  Menu,
  X,
  User,
  Video
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

type NavItem = {
  label: string;
  path: string;
  icon: React.ElementType;
};

const navItems: NavItem[] = [
  { label: "Dashboard", path: "/", icon: Home },
  { label: "Journal", path: "/journal", icon: BookOpen },
  { label: "Tasks", path: "/tasks", icon: CheckSquare },
  { label: "Vision", path: "/vision", icon: Target },
  { label: "Planning", path: "/planning", icon: CalendarCheck },
  { label: "Videos", path: "/videos", icon: Video },
];

export function Sidebar() {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 p-4 border-r border-border bg-card">
        <div className="mb-8">
          <h1 className="text-xl font-semibold text-serenity-700 dark:text-serenity-300">Serenity</h1>
          <p className="text-xs text-muted-foreground">Life Compass</p>
        </div>
        
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all",
                  "hover:bg-secondary",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "text-foreground"
                )
              }
            >
              <item.icon className="h-4 w-4 mr-3" />
              {item.label}
            </NavLink>
          ))}
        </nav>
        
        <div className="mt-auto pt-4 border-t">
          <NavLink
            to="/login"
            className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-secondary transition-all"
          >
            <User className="h-4 w-4 mr-3" />
            Account
          </NavLink>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] sm:w-[280px]">
          <div className="flex flex-col h-full">
            <div className="mb-8">
              <h1 className="text-xl font-semibold text-serenity-700 dark:text-serenity-300">Serenity</h1>
              <p className="text-xs text-muted-foreground">Life Compass</p>
            </div>
            
            <nav className="flex-1 space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all",
                      "hover:bg-secondary",
                      isActive 
                        ? "bg-primary text-primary-foreground" 
                        : "text-foreground"
                    )
                  }
                >
                  <item.icon className="h-4 w-4 mr-3" />
                  {item.label}
                </NavLink>
              ))}
            </nav>
            
            <div className="mt-auto pt-4 border-t">
              <NavLink
                to="/login"
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-secondary transition-all"
              >
                <User className="h-4 w-4 mr-3" />
                Account
              </NavLink>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
