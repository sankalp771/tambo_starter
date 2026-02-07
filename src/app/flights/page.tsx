"use client";

import { SearchHeader } from "@/components/mmt/SearchHeader";
import { FlightFilters } from "@/components/mmt/FlightFilters";
import { FlightResults } from "@/components/mmt/FlightResults";
import { ChevronDown } from "lucide-react";

export default function FlightsPage() {
    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 overflow-x-hidden">
            {/* Main Header (Logo and mini links) */}
            <nav className="bg-white px-8 py-3 flex items-center justify-between border-b sticky top-0 z-[70]">
                <div className="flex items-center gap-1.5 cursor-pointer">
                    <div className="bg-white p-1 rounded-sm shadow-sm border border-gray-100">
                        <div className="w-5 h-5 bg-[#e01e26] rounded-sm flex items-center justify-center text-[10px] font-black text-white italic">my</div>
                    </div>
                    <div className="text-gray-900 text-xl font-black italic tracking-tighter">make <span className="text-blue-500">my</span> trip</div>
                </div>

                <div className="flex items-center gap-8">
                    {['Flights', 'Hotels', 'Trains', 'Buses', 'Cabs', 'Visa', 'Insurance'].map((item, i) => (
                        <div key={item} className={`flex flex-col items-center gap-1 cursor-pointer group`}>
                            <span className="text-xl group-hover:scale-110 transition-transform">{['✈️', '🏨', '🚆', '🚌', '🚕', '📄', '🛡️'][i]}</span>
                            <span className={`text-[10px] font-black uppercase tracking-widest ${i === 0 ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-400 group-hover:text-blue-400"}`}>{item}</span>
                        </div>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <div className="bg-green-50 px-3 py-1.5 rounded-full flex items-center gap-2 border border-green-100 cursor-pointer">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-[8px] text-white font-black">MY</div>
                        <div className="text-[10px] font-black text-green-800 uppercase leading-none">Login or <br />Create Account</div>
                    </div>
                </div>
            </nav>

            <SearchHeader />

            <div className="max-w-[1240px] mx-auto px-4 py-8 flex gap-6 items-start">
                {/* Left Sidebar Filters */}
                <div className="w-[300px] sticky top-24 shrink-0">
                    <FlightFilters />
                </div>

                {/* Main Results Area */}
                <div className="flex-1 flex flex-col gap-6">
                    <div className="bg-blue-100/50 p-4 rounded-xl border border-blue-200 flex items-center justify-between group cursor-pointer hover:bg-blue-100 transition-all">
                        <p className="text-xs font-black italic uppercase tracking-wider text-blue-900">Sort by: Price (Cheapest)</p>
                        <ChevronDown className="w-4 h-4 text-blue-400 group-hover:rotate-180 transition-transform" />
                    </div>

                    <FlightResults />
                </div>
            </div>
        </div>
    );
}
