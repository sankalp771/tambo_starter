import { withInteractable } from "@tambo-ai/react";
import { z } from "zod";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

const flightFiltersSchema = z.object({
    nonStop: z.boolean().optional(),
    morningDepartures: z.boolean().optional(),
    refundableFares: z.boolean().optional(),
});

type FlightFiltersProps = z.infer<typeof flightFiltersSchema>;

function FlightFiltersBase(props: FlightFiltersProps) {
    const [data, setData] = useState<FlightFiltersProps>(props);

    useEffect(() => {
        setData(props);
    }, [props]);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sticky top-24 h-[calc(100vh-120px)] overflow-y-auto overflow-x-hidden custom-scrollbar">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-black uppercase tracking-wider">Applied Filters</h3>
                <button className="text-[10px] font-black text-blue-500 uppercase hover:underline">Clear All</button>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
                {data.nonStop && (
                    <div className="flex items-center gap-1.5 bg-gray-100 rounded px-2 py-1">
                        <span className="text-[10px] font-black text-gray-700 uppercase">Non Stop</span>
                        <X className="w-3 h-3 text-blue-500 cursor-pointer" />
                    </div>
                )}
            </div>

            {/* Popular Filters */}
            <div className="mb-8">
                <h3 className="text-xs font-black uppercase tracking-wider mb-4">Popular Filters</h3>
                <div className="flex flex-col gap-3">
                    {[
                        { label: "Non Stop", count: "₹ 5,641", key: "nonStop" },
                        { label: "Morning Departures", count: "₹ 5,744", key: "morningDepartures" },
                        { label: "Refundable Fares", count: "₹ 5,641", key: "refundableFares" },
                        { label: "Hide Nearby Airports", count: "₹ 5,641" },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between group cursor-pointer" onClick={() => item.key && setData(prev => ({ ...prev, [item.key!]: !prev[item.key as keyof FlightFiltersProps] }))}>
                            <div className="flex items-center gap-3">
                                <div className={`w-4 h-4 border rounded flex items-center justify-center transition-colors ${item.key && data[item.key as keyof FlightFiltersProps] ? "bg-blue-600 border-blue-600" : "border-gray-300 group-hover:border-blue-400 font-bold"}`}>
                                    {item.key && data[item.key as keyof FlightFiltersProps] && <div className="w-2 h-1 border-white border-b-2 border-l-2 -rotate-44 mb-0.5"></div>}
                                </div>
                                <span className="text-xs font-bold text-gray-700">{item.label}</span>
                            </div>
                            <span className="text-[10px] font-bold text-gray-400">{item.count}</span>
                        </div>
                    ))}
                    <button className="text-[10px] font-black text-blue-500 uppercase text-left mt-2">+ 4 more</button>
                </div>
            </div>

            {/* Departure Airports */}
            <div className="mb-8">
                <h3 className="text-xs font-black uppercase tracking-wider mb-4 border-t pt-6 border-gray-50">Departure Airports</h3>
                <div className="flex flex-col gap-3">
                    {[
                        { label: "Hindon Airport (32Km)", count: "₹ 5,891" },
                        { label: "Indira Gandhi International Airport", count: "₹ 5,641" }
                    ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between group cursor-pointer items-start">
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 border rounded border-gray-300 group-hover:border-blue-400 mt-0.5 flex-shrink-0"></div>
                                <span className="text-xs font-bold text-gray-700 leading-snug">{item.label}</span>
                            </div>
                            <span className="text-[10px] font-bold text-gray-400 whitespace-nowrap ml-2">{item.count}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Arrival Airports */}
            <div className="mb-8">
                <h3 className="text-xs font-black uppercase tracking-wider mb-4 border-t pt-6 border-gray-50">Arrival Airports</h3>
                <div className="flex flex-col gap-3">
                    {[
                        { label: "Navi Mumbai International Airport (25Km)", count: "₹ 5,888" },
                        { label: "Chhatrapati Shivaji International Airport", count: "₹ 5,641" }
                    ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between group cursor-pointer items-start">
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 border rounded border-gray-300 group-hover:border-blue-400 mt-0.5 flex-shrink-0"></div>
                                <span className="text-xs font-bold text-gray-700 leading-snug">{item.label}</span>
                            </div>
                            <span className="text-[10px] font-bold text-gray-400 whitespace-nowrap ml-2">{item.count}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* One Way Price Slider */}
            <div className="mb-8">
                <h3 className="text-xs font-black uppercase tracking-wider mb-4 border-t pt-6 border-gray-50">One Way Price</h3>
                <div className="px-1">
                    <div className="h-1 bg-gray-100 rounded-full relative mb-6">
                        <div className="absolute left-0 right-1/4 h-1 bg-blue-500 rounded-full"></div>
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-blue-500 rounded-full shadow-md cursor-pointer"></div>
                        <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-blue-500 rounded-full shadow-md cursor-pointer"></div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
        </div>
    );
}

const InteractableFlightFilters = withInteractable(FlightFiltersBase, {
    componentName: "FlightFilters",
    description: "Search filters for flights, like non-stop, time of day, and refundability.",
    propsSchema: flightFiltersSchema,
});

export function FlightFilters() {
    return <InteractableFlightFilters />;
}
