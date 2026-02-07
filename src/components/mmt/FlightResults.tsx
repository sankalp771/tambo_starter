"use client";
import { ChevronLeft, ChevronRight, Zap, Info, ChevronDown } from "lucide-react";
import { useState } from "react";
import { FlightDetailsModal } from "./FlightDetailsModal";
import { useSearchParams, useRouter } from "next/navigation";
import flightsData from "@/lib/data/flights_data.json";
import { withInteractable } from "@tambo-ai/react";
import { z } from "zod";

const flightResultsSchema = z.object({
    highlightedFlightId: z.string().optional(),
});

type FlightResultsProps = z.infer<typeof flightResultsSchema>;

function FlightResultsBase({ highlightedFlightId }: FlightResultsProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFlight, setSelectedFlight] = useState<any>(null);

    const from = searchParams.get("from") || "DEL";
    const to = searchParams.get("to") || "BOM";
    const dateParam = searchParams.get("date") || "2026-02-08";

    const matchesCity = (input: string, code: string, city: string) => {
        const normalizedInput = input.toLowerCase().trim();
        const normalizedCode = code.toLowerCase();
        const normalizedCity = city.toLowerCase();
        return normalizedCode === normalizedInput ||
            normalizedCity.includes(normalizedInput) ||
            normalizedInput.includes(normalizedCity);
    };

    const filteredFlights = flightsData.filter(f =>
        matchesCity(from, f.from, f.fromCity) &&
        matchesCity(to, f.to, f.toCity) &&
        f.date === dateParam
    );

    const flights = filteredFlights;

    const handleViewPrices = (flight: any) => {
        setSelectedFlight(flight);
        setIsModalOpen(true);
    };

    const handleDateChange = (newDate: string) => {
        const url = new URL(window.location.href);
        url.searchParams.set("date", newDate);
        router.push(url.pathname + url.search);
    };

    // Generate dates around the selected date
    const generateDates = () => {
        const baseDate = new Date(dateParam);
        const dates = [];
        for (let i = -3; i <= 4; i++) {
            const d = new Date(baseDate);
            d.setDate(baseDate.getDate() + i);
            const dateStr = d.toISOString().split('T')[0];
            const isToday = dateStr === dateParam;

            // Format: "Sat, Feb 7"
            const label = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

            // Find a price for this date if it exists
            const dateFlights = flightsData.filter(f =>
                matchesCity(from, f.from, f.fromCity) &&
                matchesCity(to, f.to, f.toCity) &&
                f.date === dateStr
            );
            const minPrice = dateFlights.length > 0
                ? `₹ ${Math.min(...dateFlights.map(f => parseInt(f.price))).toLocaleString()}`
                : "N/A";

            dates.push({ day: label, price: minPrice, active: isToday, fullDate: dateStr });
        }
        return dates;
    };

    const carouselDates = generateDates();

    return (
        <>
            <div className="flex-1">
                {/* Search Result Summary */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-black text-gray-800">Flights from {from} to {to}</h2>
                </div>

                {/* Promo Cards ... (same as before) */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    {[
                        { icon: "PNB", title: "Flat 12% off (up to Rs. 180...", desc: "with PNB Credit Cards. Code: ...", color: "bg-red-50 text-red-600" },
                        { icon: "VISA", title: "VISA Exclusive Offer", desc: "Free Seat with VISA Signature ...", color: "bg-blue-50 text-blue-600" }
                    ].map((promo, i) => (
                        <div key={i} className="bg-white border rounded-xl p-3 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer group">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-black text-xs ${promo.color} group-hover:scale-110 transition-transform`}>{promo.icon}</div>
                            <div>
                                <p className="text-xs font-black text-gray-800 tracking-tight">{promo.title}</p>
                                <p className="text-[10px] text-gray-500 font-bold">{promo.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Date Carousel */}
                <div className="bg-white border rounded-xl overflow-hidden mb-8 shadow-sm">
                    <div className="flex items-stretch divide-x">
                        <button className="px-3 hover:bg-gray-50 bg-white z-10 border-r transition-colors">
                            <ChevronLeft className="w-5 h-5 text-blue-500" />
                        </button>
                        <div className="flex-1 flex divide-x overflow-x-auto scrollbar-hide">
                            {carouselDates.map((date, i) => (
                                <div
                                    key={i}
                                    onClick={() => handleDateChange(date.fullDate)}
                                    className={`flex-1 min-w-[120px] p-3 text-center cursor-pointer transition-all ${date.active ? "bg-white border-b-4 border-blue-500" : "hover:bg-gray-50"}`}
                                >
                                    <p className={`text-[10px] font-black uppercase tracking-tight ${date.active ? "text-blue-500" : "text-gray-500"}`}>{date.day}</p>
                                    <p className={`text-xs font-bold mt-0.5 ${date.active ? "text-blue-600 font-black" : "text-gray-800"}`}>{date.price}</p>
                                </div>
                            ))}
                        </div>
                        <button className="px-3 hover:bg-gray-50 bg-white z-10 border-l transition-colors">
                            <ChevronRight className="w-5 h-5 text-blue-500" />
                        </button>
                    </div>
                </div>

                {/* Quick Filter Box */}
                <div className="grid grid-cols-4 gap-3 mb-8">
                    {[
                        { label: "CHEAPEST", price: flights.length > 0 ? `₹ ${flights[0]?.price}` : "N/A", duration: flights[0]?.duration || "", active: true },
                        { label: "NON STOP FIRST", price: flights.length > 0 ? `₹ ${flights[0]?.price}` : "N/A", duration: flights[0]?.duration || "" },
                        { label: "YOU MAY PREFER", price: flights.length > 0 ? `₹ ${flights[0]?.price}` : "N/A", duration: flights[0]?.duration || "" },
                        { label: "Other Sort", price: "v", duration: "" }
                    ].map((item, i) => (
                        <div
                            key={i}
                            className={`rounded-xl p-4 cursor-pointer transition-all flex items-center gap-3 border ${item.active ? "bg-blue-50 border-blue-200 ring-2 ring-blue-100" : "bg-white border-gray-100 hover:border-blue-200"}`}
                        >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.active ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-400"}`}>
                                {i === 0 ? <span className="font-bold text-[10px]">₹</span> : i === 1 ? <Zap className="w-4 h-4 fill-current" /> : i === 2 ? <span className="text-sm">⭐</span> : <span className="text-sm">📊</span>}
                            </div>
                            <div>
                                <p className="text-[9px] font-black uppercase tracking-widest text-gray-500">{item.label}</p>
                                {item.price !== "v" ? (
                                    <p className="text-xs font-black text-gray-800">{item.price} {item.duration && <>| <span className="text-gray-400 font-bold">{item.duration}</span></>}</p>
                                ) : (
                                    <p className="text-xs font-black text-gray-800">Other <ChevronDown className="inline w-3 h-3" /></p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Flight Cards */}
                <div className="flex flex-col gap-4">
                    {flights.length > 0 ? flights.map((flight: any, i: number) => (
                        <div
                            key={flight.id || i}
                            onClick={() => handleViewPrices(flight)}
                            className={`bg-white rounded-2xl shadow-sm border overflow-hidden cursor-pointer hover:shadow-xl hover:border-blue-200 transition-all duration-300 ${highlightedFlightId === flight.id ? "border-blue-600 ring-4 ring-blue-100 scale-[1.02] shadow-xl z-10" : "border-gray-100"}`}
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between gap-12">
                                    <div className="flex items-center gap-4 w-[180px]">
                                        <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-xl shadow-inner border border-gray-100">{flight.logo}</div>
                                        <div>
                                            <p className="text-sm font-black text-gray-800">{flight.airline}</p>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{flight.flightNumber}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-1 items-center justify-center gap-16">
                                        <div className="text-center">
                                            <p className="text-xl font-black text-gray-800 italic">{flight.departure}</p>
                                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">{flight.fromCity}</p>
                                        </div>
                                        <div className="flex flex-col items-center gap-1 flex-1 max-w-[120px]">
                                            <span className="text-[10px] font-bold text-gray-400">{flight.duration}</span>
                                            <div className="w-full h-[1px] bg-gray-100 relative">
                                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-blue-400 border border-white"></div>
                                            </div>
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{flight.stops === "0" ? "Non stop" : `${flight.stops} Stop(s)`}</span>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-xl font-black text-gray-800 italic">{flight.arrival}</p>
                                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">{flight.toCity}</p>
                                        </div>
                                    </div>
                                    <div className="text-right min-w-[150px]">
                                        <div className="flex flex-col items-end mb-3">
                                            <p className="text-2xl font-black text-gray-800 tracking-tighter">₹ {flight.price}</p>
                                            <p className="text-[10px] text-gray-400 font-black uppercase mt-1">/adult</p>
                                        </div>
                                        <button
                                            onClick={() => handleViewPrices(flight)}
                                            className="w-full bg-blue-50 text-blue-600 border border-blue-200 rounded-lg py-2.5 px-6 font-black uppercase text-[11px] tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                                        >
                                            View Prices
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="bg-white rounded-2xl p-12 text-center border-2 border-dashed border-gray-100 flex flex-col items-center gap-6 mt-4">
                            <span className="text-6xl text-gray-200">✈️</span>
                            <div>
                                <h3 className="text-xl font-black text-gray-800 italic uppercase">No flights found for this date</h3>
                                <p className="text-[11px] font-black text-gray-400 mt-2 uppercase tracking-[0.2em] italic">Try selecting a different date from the calendar slider above</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <FlightDetailsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                flight={selectedFlight}
            />
        </>
    );
}

const InteractableFlightResults = withInteractable(FlightResultsBase, {
    componentName: "FlightResults",
    description: "The list of flight search results. Allows highlighting specific flights.",
    propsSchema: flightResultsSchema,
});

export function FlightResults() {
    return <InteractableFlightResults />;
}
