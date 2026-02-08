"use client";

import { SearchHeader } from "@/components/mmt/SearchHeader";
import { FlightFilters } from "@/components/mmt/FlightFilters";
import { FlightResults } from "@/components/mmt/FlightResults";
import { ChevronDown } from "lucide-react";
import { Header } from "@/components/layout/Header";

export default function FlightsPage() {
    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 overflow-x-hidden">
            <Header className="px-8" showCategoryNav />

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
