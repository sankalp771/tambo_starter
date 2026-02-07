import { ChevronDown, ArrowLeftRight } from "lucide-react";
import { withInteractable } from "@tambo-ai/react";
import { z } from "zod";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const searchHeaderSchema = z.object({
    fromCity: z.string(),
    toCity: z.string(),
    departureDate: z.string(),
    travellers: z.string(),
    tripType: z.string(),
});

type SearchHeaderProps = z.infer<typeof searchHeaderSchema>;

function SearchHeaderBase(props: SearchHeaderProps) {
    const [data, setData] = useState<SearchHeaderProps>(props);

    useEffect(() => {
        setData(props);

        // Sync with URL when AI updates the interactable props
        if (typeof window !== 'undefined') {
            const url = new URL(window.location.href);
            if (props.fromCity) url.searchParams.set("from", props.fromCity);
            if (props.toCity) url.searchParams.set("to", props.toCity);
            // date and other params can be added here
            window.history.pushState({}, '', url.toString());
        }
    }, [props]);

    const [activeField, setActiveField] = useState<string | null>(null);

    return (
        <div className="bg-white border-b sticky top-0 z-[60] py-3 shadow-sm">
            <div className="max-w-[1240px] mx-auto px-4">
                <div className="flex items-center gap-3">
                    {/* Trip Type */}
                    <div
                        onClick={() => setActiveField('tripType')}
                        className={`flex flex-col border rounded-md px-3 py-1 cursor-pointer transition-all min-w-[120px] ${activeField === 'tripType' ? "border-blue-500 bg-blue-50 shadow-sm" : "border-gray-100 hover:bg-gray-50"}`}
                    >
                        <span className="text-[10px] text-blue-500 font-bold uppercase flex items-center gap-1">
                            Trip Type <ChevronDown className="w-3 h-3" />
                        </span>
                        <span className="text-sm font-black">{data.tripType}</span>
                    </div>

                    {/* From */}
                    <div
                        onClick={() => setActiveField('from')}
                        className={`flex flex-col border rounded-md px-3 py-1 cursor-pointer transition-all flex-1 relative ${activeField === 'from' ? "border-blue-500 bg-blue-50 shadow-sm" : "border-gray-100 hover:bg-gray-50"}`}
                    >
                        <span className="text-[10px] text-gray-500 font-bold uppercase">From</span>
                        <span className="text-sm font-black truncate">{data.fromCity}</span>
                        <div className="absolute -right-3.5 top-1/2 -translate-y-1/2 bg-white border rounded-full p-1 z-10 shadow-sm border-blue-100 hover:scale-110 active:scale-95 transition-all">
                            <ArrowLeftRight className="w-3 h-3 text-blue-500" />
                        </div>
                    </div>

                    {/* To */}
                    <div
                        onClick={() => setActiveField('to')}
                        className={`flex flex-col border rounded-md px-3 py-1 cursor-pointer transition-all flex-1 ml-1 ${activeField === 'to' ? "border-blue-500 bg-blue-50 shadow-sm" : "border-gray-100 hover:bg-gray-50"}`}
                    >
                        <span className="text-[10px] text-gray-500 font-bold uppercase">To</span>
                        <span className="text-sm font-black truncate">{data.toCity}</span>
                    </div>

                    {/* Depart */}
                    <div
                        onClick={() => setActiveField('depart')}
                        className={`flex flex-col border rounded-md px-3 py-1 cursor-pointer transition-all min-w-[140px] ${activeField === 'depart' ? "border-blue-500 bg-blue-50 shadow-sm" : "border-gray-100 hover:bg-gray-50"}`}
                    >
                        <span className="text-[10px] text-gray-500 font-bold uppercase">Depart</span>
                        <span className="text-sm font-black">{data.departureDate}</span>
                    </div>

                    {/* Return */}
                    <div className="flex flex-col border rounded-md px-3 py-1 cursor-not-allowed bg-gray-50 min-w-[140px] opacity-60">
                        <span className="text-[10px] text-gray-400 font-bold uppercase">Return</span>
                        <span className="text-sm font-bold text-gray-400">Select Return</span>
                    </div>

                    {/* Passenger & Class */}
                    <div
                        onClick={() => setActiveField('passengers')}
                        className={`flex flex-col border rounded-md px-3 py-1 cursor-pointer transition-all min-w-[180px] ${activeField === 'passengers' ? "border-blue-500 bg-blue-50 shadow-sm" : "border-gray-100 hover:bg-gray-50"}`}
                    >
                        <span className="text-[10px] text-gray-500 font-bold uppercase">Passenger & Class</span>
                        <span className="text-sm font-black truncate">{data.travellers}</span>
                    </div>

                    {/* Search Button */}
                    <button
                        onClick={() => {
                            if (typeof window !== 'undefined') {
                                const from = data.fromCity.split(',')[0].trim();
                                const to = data.toCity.split(',')[0].trim();
                                window.location.href = `/flights?from=${from}&to=${to}&date=${data.departureDate}&travellers=${data.travellers}&class=Economy`;
                            }
                        }}
                        className="bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-md px-8 py-3 font-black uppercase text-sm shadow-lg shadow-blue-200 hover:scale-105 active:scale-95 transition-transform ml-2"
                    >
                        Search
                    </button>
                </div>

                {/* Fare Types */}
                <div className="flex items-center gap-6 mt-3 overflow-x-auto pb-1 scrollbar-hide">
                    <span className="text-[11px] font-bold text-gray-500 whitespace-nowrap">Fare type:</span>
                    {[
                        { label: "Regular", active: true },
                        { label: "Travelling for work?", tag: "NEW" },
                        { label: "Student" },
                        { label: "Armed Forces" },
                        { label: "Senior Citizen" },
                        { label: "Doctor and Nurses" }
                    ].map((fare, i) => (
                        <div
                            key={i}
                            onClick={() => setActiveField(`fare-${i}`)}
                            className="flex items-center gap-1.5 cursor-pointer whitespace-nowrap group"
                        >
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${fare.active || activeField === `fare-${i}` ? "border-blue-500 bg-blue-500" : "border-gray-300 group-hover:border-blue-400"}`}>
                                {(fare.active || activeField === `fare-${i}`) && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                            </div>
                            <span className={`text-[11px] font-bold transition-colors ${fare.active || activeField === `fare-${i}` ? "text-blue-600" : "text-gray-600 group-hover:text-blue-500"}`}>
                                {fare.label}
                                {fare.tag && <span className="ml-1 text-[8px] bg-purple-100 text-purple-600 px-1 rounded">{fare.tag}</span>}
                            </span>
                        </div>
                    ))}
                    <div
                        className={`ml-auto flex items-center gap-2 border rounded p-1 px-2 cursor-pointer transition-all hover:bg-blue-50 whitespace-nowrap ${activeField === 'protection' ? "border-blue-400 bg-blue-50" : "border-gray-200"}`}
                        onClick={() => setActiveField('protection')}
                    >
                        <div className={`w-3 h-3 border rounded transition-colors ${activeField === 'protection' ? "bg-blue-600 border-blue-600" : "border-gray-400"}`}></div>
                        <span className={`text-[10px] font-bold uppercase transition-colors ${activeField === 'protection' ? "text-blue-600" : "text-gray-600"}`}>Add Flight Delay Protection</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

const InteractableSearchHeader = withInteractable(SearchHeaderBase, {
    componentName: "SearchHeader",
    description: "The header on the flight results page that allows refining the search.",
    propsSchema: searchHeaderSchema,
});

export function SearchHeader() {
    const searchParams = useSearchParams();
    const from = searchParams.get("from") || "DEL";
    const to = searchParams.get("to") || "BOM";
    const date = searchParams.get("date") || "2026-02-08";
    const travellers = searchParams.get("travellers") || "1 Adult";
    const travelClass = searchParams.get("class") || "Economy";

    return (
        <InteractableSearchHeader
            fromCity={from}
            toCity={to}
            departureDate={date}
            travellers={`${travellers}, ${travelClass}`}
            tripType="One Way"
        />
    );
}
