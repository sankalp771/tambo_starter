"use client";

import { X, Check, Minus, Info } from "lucide-react";
import Link from "next/link";

interface FlightDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    flight: {
        id?: string;
        fromCity?: string;
        toCity?: string;
        airline: string;
        logo: string;
        code: string;
        departure: string;
        arrival: string;
        price: string;
    } | null;
}

export function FlightDetailsModal({ isOpen, onClose, flight }: FlightDetailsModalProps) {
    if (!isOpen || !flight) return null;

    const fareOptions = [
        {
            title: "SAVER",
            price: `₹ ${flight.price}`,
            benefits: [
                { type: "Baggage", items: ["7 Kgs Cabin Baggage", "15 Kgs Check-in Baggage"], icon: "check" },
                { type: "Flexibility", items: ["Cancellation fee starts at ₹ 4,999 (up to 2 hours before departure)", "Date Change fee starts at ₹ 2,999 up to 2 hrs before departure"], icon: "minus" },
                { type: "Seats, Meals & More", items: ["Chargeable Seats", "Chargeable Meals"], icon: "minus" }
            ]
        },
        {
            title: "FARE BY MAKEMYTRIP",
            price: "₹ 5,500",
            oldPrice: "₹ 5,890",
            tag: "MMTSPECIAL",
            highlight: "BENEFITS WORTH ₹ 1,500 INCLUDED",
            highlightSub: "Travel Insurance included",
            benefits: [
                { type: "Baggage", items: ["7 Kgs Cabin Baggage", "15 Kgs Check-in Baggage"], icon: "check" },
                { type: "Flexibility", items: ["Cancellation fee starts at ₹ 4,999 (up to 2 hours before departure)", "Date Change fee starts at ₹ 2,999 up to 2 hrs before departure"], icon: "minus" },
                { type: "Seats, Meals & More", items: ["Chargeable Seats", "Chargeable Meals"], icon: "minus" }
            ]
        },
        {
            title: "FLEXI",
            price: "₹ 6,039",
            benefits: [
                { type: "Baggage", items: ["7 Kgs Cabin Baggage", "15 Kgs Check-in Baggage"], icon: "check" },
                { type: "Flexibility", items: ["Lower Cancellation fee of ₹ 3,499 (up to 2 hours before departure)", "Lower Date Change fee ₹ 999 up to 2 hrs before departure"], icon: "minus" },
                { type: "Seats, Meals & More", items: ["Free Seats", "Complimentary Meals"], icon: "check" }
            ]
        }
    ];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

            <div className="bg-white rounded-2xl w-full max-w-[1100px] max-h-[90vh] overflow-hidden flex flex-col relative animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="p-6 border-b flex items-center justify-between">
                    <h2 className="text-2xl font-black text-gray-800 tracking-tight">Flight Details and Fare Options available for you!</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X className="w-6 h-6 text-gray-400" />
                    </button>
                </div>

                {/* Flight Summary Strip */}
                <div className="bg-gray-50 px-8 py-4 flex items-center gap-6">
                    <span className="text-lg font-black text-gray-900 italic">New Delhi → Mumbai</span>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-lg border border-gray-100">{flight.logo}</div>
                        <span className="text-sm font-bold text-gray-600">{flight.airline} • Sat, 7 Feb 26 • Departure at {flight.departure} - Arrival at {flight.arrival}</span>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8 pt-6">
                    <div className="grid grid-cols-3 gap-6">
                        {fareOptions.map((option, idx) => (
                            <div key={idx} className={`border rounded-2xl flex flex-col overflow-hidden transition-all hover:shadow-xl ${idx === 1 ? "border-orange-200 ring-2 ring-orange-50 bg-white" : "border-gray-100 shadow-sm"}`}>
                                <div className="p-5 flex-1">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-2">
                                                {option.oldPrice && <span className="text-xs text-gray-400 line-through font-bold">{option.oldPrice}</span>}
                                                <span className="text-2xl font-black text-gray-800 tabular-nums">{option.price}</span>
                                                <span className="text-[10px] text-gray-400 font-bold uppercase mt-1">per adult</span>
                                            </div>
                                            <span className="text-[10px] font-black text-blue-600 tracking-wider uppercase mt-1 flex items-center gap-1.5">
                                                {option.title}
                                                {option.tag && <span className="bg-gray-800 text-yellow-400 px-1.5 py-0.5 rounded text-[8px] italic flex items-center gap-1">⭐ {option.tag}</span>}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        {option.benefits.map((benefit, bIdx) => (
                                            <div key={bIdx}>
                                                <h4 className="text-[10px] font-black text-gray-900 uppercase tracking-widest mb-3">{benefit.type}</h4>
                                                <ul className="space-y-2.5">
                                                    {benefit.items.map((item, iIdx) => (
                                                        <li key={iIdx} className="flex items-start gap-2">
                                                            {benefit.icon === "check" ? (
                                                                <div className="w-3.5 h-3.5 rounded-full bg-green-50 flex items-center justify-center mt-0.5 flex-shrink-0">
                                                                    <Check className="w-2.5 h-2.5 text-green-600 stroke-[4px]" />
                                                                </div>
                                                            ) : (
                                                                <div className="w-3.5 h-3.5 rounded-full bg-orange-50 flex items-center justify-center mt-0.5 flex-shrink-0">
                                                                    <Minus className="w-2.5 h-2.5 text-orange-600 stroke-[4px]" />
                                                                </div>
                                                            )}
                                                            <span className="text-[11px] font-bold text-gray-700 leading-tight">{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>

                                    {option.highlight && (
                                        <div className="mt-8 p-4 bg-orange-50 rounded-xl border border-orange-100">
                                            <p className="text-[10px] font-black text-orange-800 tracking-wider flex items-center gap-2">
                                                {option.highlight}
                                            </p>
                                            <div className="text-[10px] font-bold text-gray-600 mt-1 flex items-center gap-1.5">
                                                <div className="w-4 h-4 rounded-full bg-yellow-500 flex items-center justify-center text-[8px] text-white">✓</div>
                                                {option.highlightSub} <Info className="w-3 h-3 text-gray-300" />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="p-5 border-t bg-gray-50/50 flex gap-3">
                                    {idx !== 1 && (
                                        <button className="flex-1 border-2 border-blue-500 text-blue-500 rounded-full py-2.5 font-black uppercase text-[10px] tracking-wider hover:bg-blue-50 transition-colors">
                                            Lock Price
                                        </button>
                                    )}
                                    <Link
                                        href={`/checkout?id=${flight.id || ''}&airline=${flight.airline}&price=${flight.price}&departure=${flight.departure}&arrival=${flight.arrival}&from=${flight.fromCity || ''}&to=${flight.toCity || ''}&logo=${flight.logo}&travellers=${new URLSearchParams(window.location.search).get('travellers') || '1'}`}
                                        className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full py-2.5 font-black uppercase text-[10px] tracking-wider text-center shadow-lg shadow-blue-100 hover:scale-105 active:scale-95 transition-all"
                                    >
                                        Book Now
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
