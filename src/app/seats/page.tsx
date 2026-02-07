"use client";

import { MessageSquare, X, ChevronDown, ChevronRight, Info, Plus, Tag, Check, Minus, Users, ArrowRight, Car, MapPin, Calendar, Clock, Star, Zap, Fuel, ShieldCheck, ShieldPlus, Heart, Trees, Pencil } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function SeatsPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
    const [activeCabTab, setActiveCabTab] = useState<'to_airport' | 'from_airport'>('to_airport');
    const [selectedCabsCount, setSelectedCabsCount] = useState(0);

    // Get flight data from URL
    const fromCity = searchParams.get("from") || "DEL";
    const toCity = searchParams.get("to") || "BOM";
    const airline = searchParams.get("airline") || "Akasa Air";
    const price = searchParams.get("price") || "5,641";
    const departure = searchParams.get("departure") || "16:00";
    const arrival = searchParams.get("arrival") || "18:20";
    const logo = searchParams.get("logo") || "🧡";
    const flightId = searchParams.get("id") || "QP 1128";

    // Calculate total fare
    const baseAmount = parseInt(price.replace(/,/g, ''));
    const seatPrice = selectedSeats.length * 350; // Mock seat price
    const totalAmount = (baseAmount + seatPrice).toLocaleString();

    const toggleSeat = (id: string) => {
        if (selectedSeats.includes(id)) {
            setSelectedSeats(selectedSeats.filter(s => s !== id));
        } else {
            setSelectedSeats([...selectedSeats, id]);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 overflow-x-hidden pb-12">
            <style jsx global>{`
                    .custom-scrollbar::-webkit-scrollbar {
                        width: 6px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-track {
                        background: transparent;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                        background: #d1d5db;
                        border-radius: 10px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                        background: #9ca3af;
                    }
                `}</style>

            {/* Nav Header */}
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

            {/* Global Banner / Header */}
            <div className="bg-[#051322] py-4 px-8">
                <div className="max-w-[1240px] mx-auto flex items-center justify-between">
                    <h1 className="text-white text-xl font-black italic uppercase tracking-wider">Complete your booking</h1>
                    <div className="flex gap-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        <span className="text-white border-b-2 border-white pb-1">Trip Summary</span>
                        <span>Travel Insurance</span>
                        <span>Traveller Details</span>
                        <span className="text-white border-b-2 border-white pb-1">Seats & Meals</span>
                        <span>Add-ons</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-[1240px] mx-auto px-4 py-8 flex gap-6 items-start">
                {/* Left Section */}
                <div className="flex-1 flex flex-col gap-4">
                    {/* Collapsed Summaries */}
                    <Link href={`/checkout?id=${flightId}&airline=${airline}&price=${price}&departure=${departure}&arrival=${arrival}&from=${fromCity}&to=${toCity}&logo=${logo}`} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex justify-between items-center group cursor-pointer hover:bg-gray-50 transition-colors">
                        <div>
                            <h3 className="text-sm font-black italic uppercase tracking-wider">Trip Summary</h3>
                            <p className="text-[10px] font-bold text-gray-400 mt-1"><span className="text-gray-900">{fromCity} → {toCity}</span> Sunday, Feb 8 • Non Stop • 2h 20m</p>
                        </div>
                        <ChevronDown className="w-5 h-5 text-gray-300 group-hover:text-blue-500" />
                    </Link>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex justify-between items-center group">
                        <div>
                            <h3 className="text-sm font-black italic uppercase tracking-wider">Traveller Details</h3>
                            <p className="text-[10px] font-bold text-gray-400 mt-1">Sankalp Pandey</p>
                        </div>
                        <div className="text-blue-500 cursor-pointer hover:scale-110 transition-transform">✏️</div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex justify-between items-center group">
                        <div>
                            <h3 className="text-sm font-black italic uppercase tracking-wider">Your State</h3>
                            <p className="text-[10px] font-bold text-gray-400 mt-1 italic uppercase">Maharashtra</p>
                        </div>
                        <div className="text-blue-500 cursor-pointer hover:scale-110 transition-transform">✏️</div>
                    </div>

                    {/* Seats Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                        <div className="p-6 border-b flex items-center gap-3">
                            <span className="text-xl">💺</span>
                            <h3 className="text-xl font-black italic uppercase tracking-tighter">Seats</h3>
                        </div>

                        <div className="p-6">
                            <div className="bg-green-50 border border-green-100 rounded-xl p-4 flex items-center gap-3 mb-8 shadow-sm">
                                <Tag className="w-4 h-4 text-green-600" />
                                <p className="text-[10px] font-black text-green-800 italic uppercase">Use code <span className="font-black">FREESEAT</span> to get a free seat (up to 350/passenger)</p>
                            </div>

                            <div className="flex flex-col flex-1">
                                <div className="flex items-center justify-between mb-8 border-b pb-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-black italic uppercase text-gray-800">{fromCity}</span>
                                        <ArrowRight className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm font-black italic uppercase text-gray-800">{toCity}</span>
                                    </div>
                                    <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest italic">{selectedSeats.length} of 1 Seat(s) Selected</span>
                                </div>

                                {/* Plane Layout Scrollable Rectangle Container */}
                                <div className="relative bg-[#d7e9f7] rounded-3xl p-8 border border-blue-100 shadow-inner">
                                    <div className="w-full h-[600px] overflow-y-auto custom-scrollbar bg-[#d7e9f7] rounded-2xl relative flex flex-col items-center">

                                        {/* Plane Nose */}
                                        <div className="w-80 h-40 bg-white rounded-t-[100%] shadow-lg mt-10 flex flex-col items-center justify-center pt-10 flex-shrink-0">
                                            <div className="w-24 h-4 bg-gray-100 rounded-full mb-4"></div>
                                            <div className="flex gap-4 opacity-10">
                                                <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
                                                <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
                                            </div>
                                        </div>

                                        {/* Main Cabin */}
                                        <div className="w-80 bg-white shadow-2xl flex flex-col items-center py-10 relative flex-shrink-0">
                                            {/* Wing Background (Decorative) */}
                                            <div className="absolute top-[300px] -left-[300px] w-[300px] h-[400px] bg-white rounded-l-[100px] -z-10 shadow-lg transform -skew-y-12 border-r-2 border-gray-100"></div>
                                            <div className="absolute top-[300px] -right-[300px] w-[300px] h-[400px] bg-white rounded-r-[100px] -z-10 shadow-lg transform skew-y-12 border-l-2 border-gray-100"></div>

                                            {/* Toilet Icons */}
                                            <div className="flex justify-between w-full px-12 mb-10 opacity-40">
                                                <div className="flex gap-4">🚽 🍽️</div>
                                                <div className="flex gap-4">🚽 🍽️</div>
                                            </div>

                                            {/* Exit Row Marker */}
                                            <div className="w-full flex justify-between items-center px-4 mb-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-1 h-8 bg-red-500"></div>
                                                    <p className="text-[10px] font-black text-red-500 uppercase italic">Exit</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <p className="text-[10px] font-black text-red-500 uppercase italic">Exit</p>
                                                    <div className="w-1 h-8 bg-red-500"></div>
                                                </div>
                                            </div>

                                            {/* Seat Grid */}
                                            <div className="grid grid-cols-7 gap-x-2 gap-y-3 px-8">
                                                {['A', 'B', 'C', '', 'D', 'E', 'F'].map((col, i) => (
                                                    <div key={i} className="text-[10px] font-black text-gray-400 text-center mb-4">{col}</div>
                                                ))}

                                                {Array.from({ length: 40 }).map((_, row) => (
                                                    <React.Fragment key={row}>
                                                        {[0, 1, 2].map(seat => {
                                                            const id = `${row + 1}${['A', 'B', 'C'][seat]}`;
                                                            const isSelected = selectedSeats.includes(id);
                                                            const isFree = row < 5;
                                                            const isExit = row === 11 || row === 12;

                                                            return (
                                                                <div
                                                                    key={id}
                                                                    onClick={() => toggleSeat(id)}
                                                                    className={`w-8 h-8 rounded border-2 cursor-pointer transition-all flex items-center justify-center text-[8px] font-black
                                                                            ${isSelected ? "bg-blue-500 border-blue-600 text-white" : "border-gray-200 hover:border-blue-300"}
                                                                            ${isFree && !isSelected ? "bg-emerald-50 border-emerald-200" : ""}
                                                                            ${isExit ? "border-red-200" : ""}
                                                                        `}
                                                                >
                                                                    {isFree && !isSelected ? "₹0" : isSelected ? <Check className="w-4 h-4" /> : ""}
                                                                </div>
                                                            );
                                                        })}

                                                        <div className="text-[10px] font-black text-gray-300 flex items-center justify-center">{row + 1}</div>

                                                        {[0, 1, 2].map(seat => {
                                                            const id = `${row + 1}${['D', 'E', 'F'][seat]}`;
                                                            const isSelected = selectedSeats.includes(id);
                                                            const isPremium = row >= 5 && row < 15;
                                                            return (
                                                                <div
                                                                    key={id}
                                                                    onClick={() => toggleSeat(id)}
                                                                    className={`w-8 h-8 rounded border-2 cursor-pointer transition-all flex items-center justify-center text-[8px] font-black
                                                                            ${isSelected ? "bg-blue-500 border-blue-600 text-white" : "border-gray-200 hover:border-blue-300"}
                                                                            ${isPremium && !isSelected ? "bg-indigo-50 border-indigo-200" : ""}
                                                                        `}
                                                                >
                                                                    {isPremium && !isSelected ? "₹450" : isSelected ? <Check className="w-4 h-4" /> : ""}
                                                                </div>
                                                            );
                                                        })}
                                                    </React.Fragment>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Legend (Stays fixed relative to scroll container) */}
                                    <div className="absolute bottom-6 left-6 p-5 bg-white shadow-2xl rounded-2xl flex flex-col gap-3 border border-white/50 z-30">
                                        {[
                                            { label: "Free", color: "bg-emerald-400" },
                                            { label: "₹ 300-436", color: "bg-blue-100" },
                                            { label: "₹ 462-1500", color: "bg-indigo-100" },
                                            { label: "Exit Row Seats", color: "bg-white border-2 border-red-500" },
                                            { label: "Non Reclining", color: "bg-white border-2 border-gray-400" },
                                            { label: "Extra Legroom", color: "bg-gray-100 flex items-center justify-center font-black", text: "XL" },
                                        ].map((leg, i) => (
                                            <div key={i} className="flex items-center gap-3">
                                                <div className={`w-5 h-5 rounded ${leg.color} text-[7px] flex items-center justify-center`}>{leg.text}</div>
                                                <span className="text-[9px] font-black text-gray-600 uppercase italic tracking-widest">{leg.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Cabs Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-6 mb-8">
                        <div className="p-6 border-b flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Car className="w-6 h-6 text-gray-800" />
                                <h3 className="text-xl font-black italic uppercase tracking-tighter">Cabs</h3>
                                <span className="bg-purple-100 text-purple-600 text-[8px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider">new</span>
                            </div>
                            <Pencil className="w-5 h-5 text-blue-500 cursor-pointer hover:scale-110 transition-transform" />
                        </div>

                        <div className="p-8">
                            <div className="flex items-center justify-between mb-8 border-b pb-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-black italic uppercase text-gray-800">{fromCity}</span>
                                    <ArrowRight className="w-4 h-4 text-gray-400" />
                                    <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest italic">{selectedCabsCount} of 2 cab selected</span>
                                </div>
                                <span className="text-sm font-black italic uppercase text-gray-800">{toCity}</span>
                            </div>

                            <div className="flex gap-8 items-start">
                                {/* Left Column: Booking Form */}
                                <div className="w-[300px] flex-shrink-0">
                                    <div className="bg-[#f2f8ff] rounded-2xl p-6 border border-blue-100 shadow-sm relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-400/5 rounded-full blur-2xl -mr-8 -mt-8"></div>

                                        <div className="flex items-center justify-between mb-6">
                                            <div className="flex flex-col">
                                                <h4 className="text-[12px] font-black italic uppercase tracking-wider text-gray-800">
                                                    {activeCabTab === 'to_airport' ? 'Ride Guarantee' : 'Flexi Airport Pickup'}
                                                </h4>
                                                <p className="text-[9px] font-bold text-gray-500 leading-tight mt-1">Get a refund for a flight missed due to a cab delay or no-show <span className="text-blue-500 cursor-pointer">View Policy</span></p>
                                            </div>
                                            <ShieldCheck className="w-6 h-6 text-indigo-500 opacity-40 group-hover:scale-110 transition-transform" />
                                        </div>

                                        <div className="flex p-1 bg-white rounded-xl border border-blue-50 mb-6 shadow-inner">
                                            <button
                                                onClick={() => setActiveCabTab('to_airport')}
                                                className={`flex-1 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeCabTab === 'to_airport' ? 'bg-blue-500 text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
                                            >
                                                To DEL airport
                                            </button>
                                            <button
                                                onClick={() => setActiveCabTab('from_airport')}
                                                className={`flex-1 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeCabTab === 'from_airport' ? 'bg-blue-500 text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
                                            >
                                                From BOM airport
                                            </button>
                                        </div>

                                        <div className="flex flex-col gap-4 mb-6">
                                            <div className="bg-white border border-gray-100 rounded-xl p-3.5 flex items-center gap-3 group/input hover:border-blue-200 transition-all cursor-pointer shadow-sm">
                                                <MapPin className="w-4 h-4 text-gray-300 group-hover/input:text-blue-500 transition-colors" />
                                                <div className="flex flex-col">
                                                    <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Pick up from</span>
                                                    <span className="text-[11px] font-black text-gray-800 uppercase italic leading-none">{activeCabTab === 'to_airport' ? 'Delhi' : 'Mumbai'}</span>
                                                </div>
                                            </div>

                                            <div className="bg-white border border-gray-100 rounded-xl p-3.5 flex items-center gap-3 shadow-sm opacity-60">
                                                <Users className="w-4 h-4 text-gray-300" />
                                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest italic">{activeCabTab === 'to_airport' ? 'Terminal 1 Delhi Airport, IGI' : 'Terminal 2, Chhatrapati Shiva...'}</span>
                                            </div>

                                            <div className="flex gap-2">
                                                <div className="flex-1 bg-white border border-gray-100 rounded-xl p-3.5 flex items-center gap-3 shadow-sm">
                                                    <Calendar className="w-4 h-4 text-gray-300" />
                                                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest italic pt-0.5">Sat, 07 Feb</span>
                                                </div>
                                                <div className="flex-1 bg-white border border-gray-100 rounded-xl p-3.5 flex items-center gap-3 shadow-sm">
                                                    <Clock className="w-4 h-4 text-gray-300" />
                                                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest italic pt-0.5">05:00 PM</span>
                                                </div>
                                            </div>

                                            <p className="text-[9px] font-black text-gray-400 leading-tight italic px-1">Your flight departs from T1, DEL airport, 08:00 PM</p>
                                        </div>

                                        <button className="w-full border-2 border-gray-100 bg-white rounded-xl py-4 font-black uppercase text-[11px] tracking-[0.2em] text-gray-400 hover:border-blue-400 hover:text-blue-500 hover:shadow-lg transition-all active:scale-95 shadow-sm">
                                            Search
                                        </button>

                                        <div className="mt-6 flex items-start gap-2 px-1">
                                            <span className="text-xl">☀️</span>
                                            <p className="text-[9px] font-bold text-gray-500 leading-relaxed italic">Rush hour in {activeCabTab === 'to_airport' ? 'New Delhi' : 'Mumbai'}? Book your cab now to avoid delays</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column: Cab List */}
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-4 px-2">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">Cab rates for approx 15 km distance and 15 minutes travel time</p>
                                    </div>

                                    <div className="h-[600px] overflow-y-auto pr-3 custom-scrollbar flex flex-col gap-4">
                                        {[
                                            { id: 1, name: "Swift Dzire", type: "CNG", rating: 4.3, seats: 4, price: activeCabTab === 'to_airport' ? "404" : "750", rec: true, fuel: "CNG", desc: "Comfortable Sedan", perKm: 23 },
                                            { id: 2, name: "Mg Zs", type: "Electric", rating: "4.8", seats: 4, price: activeCabTab === 'to_airport' ? "499" : "737", fuel: "Electric", desc: "Electric & Sustainable", perKm: 25 },
                                            { id: 3, name: "Wagonr, Swift or similar", type: "CNG", rating: 4.2, seats: 4, price: activeCabTab === 'to_airport' ? "637" : "783", fuel: "CNG", desc: "Pocket Friendly", perKm: 20 },
                                            { id: 4, name: "Maruti Suzuki Ertiga", type: "CNG", rating: 4.5, seats: 6, price: activeCabTab === 'to_airport' ? "1225" : "1107", fuel: "CNG", desc: "Comfortable SUV", perKm: 35 },
                                            { id: 5, name: "Byd E6", type: activeCabTab === 'to_airport' ? "Electric" : "Diesel", rating: 4.9, seats: 4, price: activeCabTab === 'to_airport' ? "1460" : "1103", fuel: activeCabTab === 'to_airport' ? "Electric" : "Diesel", desc: "Electric & Sustainable", perKm: 30 },
                                            { id: 6, name: "Tigor or similar", type: "Electric", rating: 4.0, seats: 4, price: activeCabTab === 'to_airport' ? "1752" : "1151", fuel: "Electric", desc: "Electric & Sustainable", perKm: 27 },
                                        ].map((cab) => (
                                            <div key={cab.id} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:border-blue-200 hover:shadow-md transition-all group/cab relative">
                                                {cab.rec && (
                                                    <span className="absolute top-3 left-3 bg-cyan-400 text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm z-10">Recommended</span>
                                                )}

                                                <div className="flex items-start gap-6">
                                                    <div className="flex flex-col items-center gap-2">
                                                        <div className="w-24 h-16 bg-gray-50 rounded-xl flex items-center justify-center group-hover/cab:scale-110 transition-transform">
                                                            <div className="text-4xl text-gray-300">🚗</div>
                                                        </div>
                                                        <div className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded w-full text-center text-white ${cab.fuel === 'Electric' ? 'bg-blue-500' : cab.fuel === 'CNG' ? 'bg-emerald-500' : cab.fuel === 'Diesel' ? 'bg-orange-500' : 'bg-gray-500'}`}>
                                                            {cab.fuel}
                                                        </div>
                                                    </div>

                                                    <div className="flex-1 flex flex-col pt-1">
                                                        <div className="flex items-center justify-between mb-3">
                                                            <div className="flex flex-col gap-1">
                                                                <div className="flex items-center gap-2">
                                                                    <div className="bg-emerald-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded flex items-center gap-0.5">
                                                                        <Star className="w-2 h-2 fill-current" />
                                                                        {cab.rating}
                                                                    </div>
                                                                    <h4 className="text-[13px] font-black tracking-tight text-gray-800">{cab.name}</h4>
                                                                </div>
                                                                <div className="bg-cyan-50 text-cyan-700 text-[10px] font-black px-2 py-0.5 rounded-full w-fit uppercase italic tracking-tighter">
                                                                    {cab.desc}
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-col items-end">
                                                                <span className="text-[14px] font-black tabular-nums text-gray-900">₹{cab.price}</span>
                                                                <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">All Inclusive</span>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center justify-between mt-auto">
                                                            <div className="flex items-center gap-4 text-[9px] font-bold text-gray-400 italic">
                                                                <span>{cab.seats} Seats</span>
                                                                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                                                <span>₹{cab.perKm}/km after 15 km(s)</span>
                                                            </div>
                                                            <button
                                                                onClick={() => setSelectedCabsCount(prev => Math.min(2, prev + 1))}
                                                                className="border border-gray-100 px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest text-gray-400 hover:border-blue-500 hover:text-blue-500 hover:bg-blue-50 transition-all active:scale-95 shadow-sm"
                                                            >
                                                                Add
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <div className="h-10"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Flight Delay Protection */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-6 flex flex-col relative group">
                        <div className="p-6 border-b flex items-center justify-between bg-white">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                                    <Zap className="w-5 h-5 fill-current" />
                                </div>
                                <h3 className="text-xl font-black italic uppercase tracking-tighter">Flight Delay Protection</h3>
                            </div>
                            <div className="flex items-center gap-2 opacity-40">
                                <ShieldPlus className="w-6 h-6 text-indigo-900" />
                                <Heart className="w-4 h-4 text-pink-500 fill-current" />
                            </div>
                        </div>

                        <div className="p-8">
                            <div className="flex items-center justify-between items-start mb-8">
                                <div className="flex flex-col gap-1.5">
                                    <h4 className="text-[15px] font-black text-gray-800">Flight delay compensation of <span className="text-blue-600">₹2,000</span></h4>
                                    <p className="text-[11px] font-bold text-gray-400">Get flat ₹2,000 compensation if your flight is delayed by <span className="text-gray-900">1 hour</span> or more for any reason</p>
                                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest cursor-pointer hover:underline mt-1">View T&C</span>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="text-right">
                                        <span className="text-xl font-black text-gray-900">₹ 279</span>
                                        <span className="text-[10px] font-bold text-gray-400 block uppercase">/traveller</span>
                                    </div>
                                    <button className="border-2 border-blue-500 text-blue-600 px-8 py-2.5 rounded-xl font-black uppercase text-[11px] tracking-widest hover:bg-blue-50 transition-all shadow-sm">
                                        ADD
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-4 gap-6 mb-8 border-t border-b border-gray-50 py-6">
                                {[
                                    { label: "Covers Any Delay", icon: <Check className="w-3.5 h-3.5" /> },
                                    { label: "Value For Money", icon: <Check className="w-3.5 h-3.5" /> },
                                    { label: "Quick Claims Settlements", icon: <Check className="w-3.5 h-3.5" /> },
                                    { label: "100% Digital Claims Process", icon: <Check className="w-3.5 h-3.5" /> }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-2.5">
                                        <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                                            {item.icon}
                                        </div>
                                        <span className="text-[9px] font-black text-gray-600 uppercase italic tracking-wider">{item.label}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-50 flex items-center gap-2 justify-center">
                                <div className="flex -space-x-1.5 overflow-hidden">
                                    {[1, 2, 3].map(i => <div key={i} className="inline-block h-4 w-4 rounded-full ring-2 ring-white bg-gray-200"></div>)}
                                </div>
                                <p className="text-[10px] font-black text-gray-500 italic uppercase">1 Lakh+ travellers protected in last 3 months</p>
                            </div>
                        </div>
                    </div>

                    {/* Foundation Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-6 p-8 flex items-center justify-between group">
                        <div className="flex items-center gap-8">
                            <div className="relative">
                                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-600 border-2 border-dashed border-green-200 group-hover:rotate-12 transition-transform">
                                    <Trees className="w-10 h-10" />
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center text-[10px]">🌱</div>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <h3 className="text-xl font-black italic uppercase tracking-tighter">Help us plant 4 million trees by 2027!</h3>
                                <p className="text-[11px] font-bold text-gray-400">Support the MakeMyTrip Foundation & donate for a greener future <span className="text-blue-500 cursor-pointer">Know More</span></p>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            {[5, 10, 20, 50].map(amt => (
                                <button key={amt} className="border border-gray-100 px-6 py-3 rounded-xl font-black text-xs hover:border-blue-400 hover:text-blue-500 hover:shadow-md transition-all active:scale-95 bg-white">
                                    ₹ {amt}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Legal & Proceed */}
                    <div className="mt-8 flex flex-col gap-6 mb-20 px-4">
                        <label className="flex items-start gap-3 cursor-pointer group">
                            <div className="relative flex items-center pt-0.5">
                                <input type="checkbox" className="peer h-5 w-5 cursor-pointer appearance-none rounded border-2 border-blue-200 transition-all checked:bg-blue-600 checked:border-blue-600" defaultChecked />
                                <Check className="absolute h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity left-0.5" />
                            </div>
                            <p className="text-[11px] font-bold text-gray-500 leading-relaxed italic group-hover:text-gray-700">
                                I understand and agree with the <span className="text-blue-500 hover:underline">Fare Rules</span>, the <span className="text-blue-500 hover:underline">Privacy Policy</span>, the <span className="text-blue-500 hover:underline">User Agreement</span> and <span className="text-blue-500 hover:underline">Terms of Service</span> of MakeMyTrip
                            </p>
                        </label>

                        <div className="flex items-center justify-between">
                            <button
                                onClick={() => router.push(`/payment?id=${flightId}&airline=${airline}&price=${totalAmount}&departure=${departure}&arrival=${arrival}&from=${fromCity}&to=${toCity}&logo=${logo}`)}
                                className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white rounded-full py-4 px-16 font-black uppercase text-sm tracking-[0.2em] shadow-[0_15px_30px_-8px_rgba(37,99,235,0.4)] hover:scale-110 active:scale-95 transition-all"
                            >
                                PROCEED TO PAY
                            </button>
                            <div className="flex items-center gap-6">
                                <span className="text-[11px] font-black text-blue-500 uppercase tracking-widest italic cursor-pointer hover:underline">Secure Checkout</span>
                                <img src="/api/placeholder/120/40" alt="Norton Secured" className="h-8 grayscale opacity-50" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Unified Sidebar */}
                <div className="w-[340px] sticky top-24 max-h-[calc(100vh-100px)] overflow-y-auto pr-3 custom-scrollbar h-fit">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                        {/* Fare Summary Part */}
                        <div className="p-6">
                            <h3 className="text-xl font-black italic tracking-tighter mb-6">Fare Summary</h3>
                            <div className="flex flex-col gap-4">
                                {[
                                    { label: "Base Fare", val: "5,216" },
                                    { label: "Taxes and Surcharges", val: "843" },
                                    { label: "Other Services", val: "228" }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Plus className="w-3.5 h-3.5 text-gray-300" />
                                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-none pt-0.5">{item.label}</span>
                                        </div>
                                        <span className="text-xs font-black tabular-nums">₹ {item.val}</span>
                                    </div>
                                ))}

                                <div className="flex items-center justify-between pt-4 border-t border-gray-50 mb-2">
                                    <div className="flex items-center gap-2">
                                        <Plus className="w-3.5 h-3.5 text-gray-300" />
                                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-none pt-0.5">Discounts</span>
                                    </div>
                                    <span className="text-xs font-black tabular-nums text-green-600">- ₹ 227</span>
                                </div>

                                <div className="flex items-center justify-between py-5 border-t-2 border-dashed border-gray-100 mt-2">
                                    <span className="text-lg font-black italic uppercase tracking-wider">Total Amount</span>
                                    <span className="text-xl font-black italic tabular-nums">₹ {totalAmount}</span>
                                </div>
                            </div>
                        </div>

                        {/* Coupons Part */}
                        <div className="p-6 bg-gray-50/50 border-t">
                            <h4 className="text-[11px] font-black italic uppercase tracking-widest mb-4">Coupons and Offers</h4>
                            <div className="relative mb-6">
                                <input
                                    type="text"
                                    placeholder="Enter coupon code"
                                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3.5 text-xs font-black uppercase tracking-widest focus:outline-none focus:border-blue-400 shadow-sm"
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-blue-500 uppercase cursor-pointer">Apply</span>
                            </div>

                            <div className="grid grid-cols-3 gap-2 mb-6 text-center">
                                {['All', 'Bank', 'Add ons'].map(cat => (
                                    <button key={cat} className={`border rounded-md py-2 text-[10px] font-black uppercase italic transition-all ${cat === 'All' ? 'bg-white border-blue-200 text-blue-600 shadow-sm' : 'bg-transparent text-gray-400 border-gray-100'}`}>{cat}</button>
                                ))}
                            </div>

                            <div className="flex flex-col gap-4">
                                <div className="bg-white border border-blue-100 rounded-xl p-4 flex flex-col gap-3 shadow-md relative group">
                                    <div className="absolute -left-0.5 top-0 bottom-0 w-1 bg-blue-500 rounded-l-xl"></div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Tag className="w-4 h-4 text-green-500" />
                                            <span className="text-[11px] font-black uppercase tracking-tighter text-[#051322]">MMTEXTRA</span>
                                        </div>
                                        <span className="text-[10px] font-black text-green-600">Applied</span>
                                    </div>
                                    <p className="text-[9px] font-bold text-blue-600 italic">Congratulations! Promo Discount of ₹ 227 applied successfully.</p>
                                </div>

                                <div className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col gap-3 shadow-sm opacity-50">
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="flex items-center gap-2">
                                            <Tag className="w-4 h-4 text-gray-400" />
                                            <span className="text-[11px] font-black uppercase tracking-tighter text-gray-400">MMTTRAVEL</span>
                                            <div className="w-3 h-3 text-gray-400">🔒</div>
                                        </div>
                                    </div>
                                    <p className="text-[9px] font-bold text-gray-400 leading-relaxed italic">Log in up to 15% OFF for new users only</p>
                                    <button className="mt-1 w-full bg-blue-500 text-white rounded-lg py-2.5 font-black uppercase text-[9px] tracking-wider shadow-md opacity-80 backdrop-blur-sm">Unlock Coupon</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
