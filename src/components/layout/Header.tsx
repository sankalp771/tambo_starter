"use client";

import { ChevronDown, Globe } from "lucide-react";
import { Logo } from "@/components/mmt/Logo";
import { cn } from "@/lib/utils";

interface HeaderProps {
  variant?: "light" | "dark";
  className?: string;
  showCategoryNav?: boolean;
}

const CATEGORIES = [
  { name: 'Flights', icon: '✈️', path: '/' },
  { name: 'Hotels', icon: '🏨', path: '/hotels' },
  { name: 'Trains', icon: '🚆', path: '/trains' },
  { name: 'Buses', icon: '🚌', path: '/buses' },
  { name: 'Cabs', icon: '🚕', path: '/cabs' },
  { name: 'Visa', icon: '📄', path: '/visa' },
  { name: 'Insurance', icon: '🛡️', path: '/insurance' },
];

export function Header({ variant = "light", className, showCategoryNav = false }: HeaderProps) {
  const isDark = variant === "dark";

  return (
    <nav className={cn(
      "py-3 sticky top-0 z-[70] transition-all duration-300 w-full",
      isDark
        ? "bg-[#051322]/80 backdrop-blur-xl border-b border-white/10"
        : "bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm",
      className
    )}>
      <div className="max-w-[1240px] mx-auto w-full px-4 flex items-center justify-between">
        <Logo variant={variant} />

        {showCategoryNav && (
          <div className="hidden lg:flex items-center gap-8 ml-8">
            {CATEGORIES.map((item, i) => (
              <div key={item.name} className="flex flex-col items-center gap-1 cursor-pointer group relative">
                <span className="text-xl group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                <span className={cn(
                  "text-[10px] font-black uppercase tracking-widest transition-colors",
                  i === 0 && !isDark ? "text-blue-600" : (isDark ? "text-white/60 group-hover:text-white" : "text-gray-400 group-hover:text-blue-400")
                )}>
                  {item.name}
                </span>
                {i === 0 && !isDark && <div className="absolute -bottom-1.5 left-0 w-full h-0.5 bg-blue-600 rounded-full" />}
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center gap-8">
          <div className={cn(
            "hidden xl:flex items-center gap-6 text-[11px] font-black uppercase tracking-wider",
            isDark ? "text-white/80" : "text-gray-500"
          )}>
            <div className="flex items-center gap-2 cursor-pointer hover:text-blue-500 transition-colors">
              <span className="text-sm">🏡</span> List Your Property
            </div>
            <div className="flex items-center gap-2 cursor-pointer hover:text-blue-500 transition-colors">
              <span className="text-sm">💼</span> myBiz <span className={cn(
                "text-[8px] px-1.5 py-0.5 rounded-full ml-1 font-bold",
                isDark ? "bg-white/10 text-white" : "bg-blue-50 text-blue-600"
              )}>NEW</span>
            </div>
            <div className={cn(
              "flex items-center gap-2 cursor-pointer hover:text-blue-500 transition-colors border-l pl-6",
              isDark ? "border-white/10" : "border-gray-200"
            )}>
              <span className="text-sm">❤️</span> Wishlist
            </div>
            <div className="flex items-center gap-2 cursor-pointer hover:text-blue-500 transition-colors">
              <span className="text-sm">🎒</span> My Trips
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className={cn(
              "flex items-center rounded-xl px-4 py-2 cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95",
              isDark
                ? "bg-blue-500/10 border border-blue-400/20 hover:bg-blue-500/20 shadow-lg shadow-blue-500/5"
                : "bg-blue-50 border border-blue-100 hover:bg-blue-100"
            )}>
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-blue-700 flex items-center justify-center text-[10px] text-white font-black mr-3 shadow-md border border-white/20">👤</div>
              <div className={cn(
                "text-[11px] font-black uppercase tracking-tight",
                isDark ? "text-white" : "text-blue-600"
              )}>
                Login or Create Account <ChevronDown className="inline w-3.5 h-3.5 ml-1 opacity-50" />
              </div>
            </div>

            <div className={cn(
              "flex items-center gap-3 border-l pl-6 ml-2",
              isDark ? "border-white/10" : "border-gray-200"
            )}>
              <div className={cn(
                "flex items-center gap-2 text-[11px] font-black uppercase tracking-widest cursor-pointer hover:text-blue-500 transition-colors",
                isDark ? "text-white/90" : "text-gray-900"
              )}>
                <Globe className="w-4 h-4 text-green-500" /> INR <ChevronDown className="w-3.5 h-3.5 opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
