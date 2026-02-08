"use client";

import { useBooking } from "@/context/BookingContext";
import React from "react";
import { X, Printer, Download, Share2, ShieldCheck, Check } from "lucide-react";

interface TicketModalProps {
    isOpen: boolean;
    onClose: () => void;
    flightDetails: {
        from: string;
        to: string;
        airline: string;
        departure: string;
        arrival: string;
        logo: string;
        id: string;
    };
}

export function TicketModal({ isOpen, onClose, flightDetails }: TicketModalProps) {
    const { booking } = useBooking();
    const [mounted, setMounted] = React.useState(false);
    const [pnr] = React.useState(() => `MYTRI-${Math.random().toString(36).substring(2, 7).toUpperCase()}`);
    const [bookingDate] = React.useState(() => new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    }));

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!isOpen || !mounted) return null;

    return (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose}></div>

            <div className="bg-white rounded-3xl w-full max-w-[850px] max-h-[90vh] overflow-hidden flex flex-col relative animate-in zoom-in-95 duration-300 shadow-2xl">
                {/* Header Actions */}
                <div className="bg-gray-900 px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-black italic">my</div>
                        <h2 className="text-white text-sm font-black uppercase tracking-widest italic">E-Ticket Receipt</h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-gray-400 hover:text-white transition-colors"><Printer className="w-5 h-5" /></button>
                        <button className="p-2 text-gray-400 hover:text-white transition-colors"><Download className="w-5 h-5" /></button>
                        <button onClick={onClose} className="p-2 text-gray-400 hover:text-white transition-colors"><X className="w-6 h-6" /></button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-10 bg-gray-50/50">
                    <div className="bg-white rounded-2xl shadow-xl shadow-blue-900/5 border border-gray-100 overflow-hidden">
                        {/* Ticket Top Ribbon */}
                        <div className="bg-blue-600 px-8 py-3 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-blue-200" />
                                <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Confirmed Booking</span>
                            </div>
                            <span className="text-[10px] font-black text-blue-100 uppercase tracking-widest">Date of Booking: {bookingDate}</span>
                        </div>

                        {/* Main Flight Info */}
                        <div className="p-10">
                            <div className="flex justify-between items-start mb-12">
                                <div>
                                    <div className="flex items-center gap-4 mb-2">
                                        <span className="text-4xl">{flightDetails.logo}</span>
                                        <div>
                                            <h3 className="text-2xl font-black italic tracking-tighter uppercase text-gray-900">{flightDetails.airline}</h3>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{flightDetails.id} • Economy</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">PNR/Booking Ref.</p>
                                    <div className="flex items-center justify-end gap-2">
                                        <span className="text-2xl font-black italic text-gray-900 uppercase">{pnr}</span>
                                        <div className="bg-emerald-500 text-white text-[8px] font-black px-2 py-1 rounded uppercase flex items-center gap-1">
                                            <Check className="w-2 h-2" /> Confirmed
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-11 items-center gap-4 mb-16 bg-blue-50/30 rounded-3xl p-8 border border-blue-50/50">
                                <div className="col-span-4">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Departing From</p>
                                    <h4 className="text-3xl font-black italic uppercase text-gray-900">{flightDetails.from}</h4>
                                    <p className="text-xs font-bold text-gray-500 mt-1 uppercase">Indira Gandhi Intl Airport</p>
                                    <p className="text-xl font-black italic text-blue-600 mt-4 tabular-nums">{flightDetails.departure}</p>
                                </div>
                                <div className="col-span-3 flex flex-col items-center gap-2">
                                    <div className="w-full h-[1px] bg-blue-200 relative">
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-50 px-3">
                                            <ShieldCheck className="w-4 h-4 text-blue-400" />
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-black text-blue-400 uppercase italic">02h 20m Non-stop</span>
                                </div>
                                <div className="col-span-4 text-right">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Arriving At</p>
                                    <h4 className="text-3xl font-black italic uppercase text-gray-900">{flightDetails.to}</h4>
                                    <p className="text-xs font-bold text-gray-500 mt-1 uppercase">Chhatrapati Shivaji Intl Airport</p>
                                    <p className="text-xl font-black italic text-blue-600 mt-4 tabular-nums">{flightDetails.arrival}</p>
                                </div>
                            </div>

                            {/* Passenger Table */}
                            <div>
                                <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-6 flex items-center gap-3">
                                    Passenger Information <div className="flex-1 h-[1px] bg-gray-100"></div>
                                </h5>
                                <div className="space-y-4">
                                    {booking.passengers.map((p, idx) => (
                                        <div key={idx} className="grid grid-cols-12 items-center bg-gray-50 rounded-2xl p-6 border border-gray-100">
                                            <div className="col-span-5 flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-black italic uppercase">
                                                    {p.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black italic uppercase text-gray-900">{p.name || 'Sankalp Pandey'}</p>
                                                    <p className="text-[9px] font-black text-gray-400 uppercase">{p.gender} • {p.age} YRS</p>
                                                </div>
                                            </div>
                                            <div className="col-span-2">
                                                <p className="text-[9px] font-black text-gray-400 uppercase mb-1">Sector</p>
                                                <p className="text-xs font-black uppercase text-gray-700">{flightDetails.from} - {flightDetails.to}</p>
                                            </div>
                                            <div className="col-span-2">
                                                <p className="text-[9px] font-black text-gray-400 uppercase mb-1">Seat</p>
                                                <p className="text-xs font-black uppercase text-blue-600">{booking.selectedSeats[idx] || '--'}</p>
                                            </div>
                                            <div className="col-span-3 text-right">
                                                <p className="text-[9px] font-black text-gray-400 uppercase mb-1">Add-ons</p>
                                                <p className="text-xs font-black uppercase text-gray-700">6E Prime</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Ticket Footer */}
                        <div className="bg-gray-900/5 p-10 border-t border-gray-100 flex justify-between items-end">
                            <div className="flex items-center gap-6">
                                <div className="bg-white p-4 rounded-2xl border border-gray-200">
                                    <div className="w-24 h-24 bg-gray-100 flex items-center justify-center text-[10px] font-mono text-gray-400">QR CODE</div>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black italic text-gray-400 uppercase tracking-widest leading-relaxed">
                                        This is a computer generated <br />e-ticket and does not require <br />a physical signature.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 grayscale brightness-200 opacity-30">
                                <div className="w-10 h-10 bg-gray-500 rounded-full"></div>
                                <div className="w-10 h-10 bg-gray-500 rounded-full"></div>
                                <div className="w-10 h-10 bg-gray-500 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-8 bg-white border-t flex justify-center">
                    <button className="bg-blue-600 text-white rounded-full px-16 py-4 font-black uppercase text-sm tracking-widest shadow-xl shadow-blue-200 hover:scale-110 active:scale-95 transition-all flex items-center gap-3">
                        <Printer className="w-5 h-5" /> Print Ticket
                    </button>
                </div>
            </div>
        </div>
    );
}
