"use client";

import { ChevronDown, Globe } from "lucide-react";

export function Header() {
  return (
    <nav className="bg-white px-20 py-3 flex items-center justify-between border-b sticky top-0 z-[70]">
      <div className="flex items-center gap-1.5 cursor-pointer">
        <div className="bg-white p-1 rounded-sm shadow-sm border border-gray-100">
          <div className="w-5 h-5 bg-[#e01e26] rounded-sm flex items-center justify-center text-[10px] font-black text-white italic">my</div>
        </div>
        <div className="text-gray-900 text-xl font-black italic tracking-tighter uppercase">make <span className="text-blue-500">my</span> trip</div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden lg:flex items-center gap-5 text-[11px] font-bold text-gray-900 uppercase tracking-tight">
          <div className="flex items-center gap-2 cursor-pointer opacity-80 hover:opacity-100">
            <span className="text-orange-400">🏡</span> List Your Property
          </div>
          <div className="flex items-center gap-2 cursor-pointer opacity-80 hover:opacity-100">
            <span className="text-blue-400">💼</span> myBiz <span className="text-[7px] bg-blue-100 text-blue-600 px-1 rounded ml-1">NEW</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer opacity-80 hover:opacity-100 border-l border-gray-200 pl-5">
            <span className="text-red-400">❤️</span> Wishlist
          </div>
          <div className="flex items-center gap-2 cursor-pointer opacity-80 hover:opacity-100">
            <span className="text-yellow-400">🎒</span> My Trips
          </div>
        </div>

        <div className="flex items-center bg-blue-50 border border-blue-100 rounded-md px-3 py-2 cursor-pointer hover:bg-blue-100 transition-all ml-4">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-300 to-blue-600 flex items-center justify-center text-[10px] text-white font-bold mr-2 shadow-inner">👤</div>
          <div className="text-blue-600 text-[11px] font-black uppercase">Login or Create Account <ChevronDown className="inline w-3 h-3 ml-1" /></div>
        </div>

        <div className="flex items-center gap-3 border-l border-gray-200 pl-6 ml-4">
          <div className="flex items-center gap-1.5 text-gray-900 text-[11px] font-bold uppercase cursor-pointer">
            <Globe className="w-4 h-4 text-green-500" /> INR <ChevronDown className="w-3 h-3" />
          </div>
        </div>
      </div>
    </nav>
  );
}
