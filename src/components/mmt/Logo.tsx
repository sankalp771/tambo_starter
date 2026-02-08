"use client";

import { cn } from "@/lib/utils";

interface LogoProps {
    variant?: "light" | "dark";
    className?: string;
}

export function Logo({ variant = "light", className }: LogoProps) {
    return (
        <div className={cn("flex items-center gap-2 cursor-pointer group", className)}>
            <div className="bg-white p-1.5 rounded-md shadow-[0_2px_10px_-3px_rgba(0,0,0,0.1)] border border-gray-100 group-hover:scale-105 transition-transform duration-300">
                <div className="w-5 h-5 bg-[#e01e26] rounded-[3px] flex items-center justify-center text-[10px] font-black text-white italic">my</div>
            </div>
            <div className={cn(
                "text-2xl font-black italic tracking-tighter transition-colors duration-300",
                variant === "dark" ? "text-white" : "text-gray-900"
            )}>
                make <span className="text-[#008cff]">my</span> trip
            </div>
        </div>
    );
}
