"use client";

import {
    MessageSquare, X, ChevronDown, ChevronRight, Info, Plus, Tag, Check,
    Minus, Users, ArrowRight, Car, MapPin, Calendar, Clock, Star, Zap,
    Fuel, ShieldCheck, ShieldPlus, Heart, Trees, Pencil, Wallet, CreditCard,
    Smartphone, Landmark, History, Gift, Shield, Download
} from "lucide-react";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useBooking } from "@/context/BookingContext";
import { TicketModal } from "@/components/mmt/TicketModal";

export default function PaymentPage() {
    const searchParams = useSearchParams();
    const { booking } = useBooking();
    const [isQRModalOpen, setIsQRModalOpen] = useState(false);
    const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
    const [isTicketOpen, setIsTicketOpen] = useState(false);

    // Get flight data from URL
    const fromCity = searchParams.get("from") || "DEL";
    const toCity = searchParams.get("to") || "BOM";
    const airline = searchParams.get("airline") || "Akasa Air";
    const priceStr = searchParams.get("price") || "5,641";
    const departure = searchParams.get("departure") || "16:00";
    const arrival = searchParams.get("arrival") || "18:20";
    const logo = searchParams.get("logo") || "🧡";
    const flightId = searchParams.get("id") || "QP 1128";

    const totalVal = parseInt(priceStr.replace(/,/g, ''));
    const passengerCount = Math.max(1, booking.passengers.length);
    const totalTaxes = 843 * passengerCount;
    const totalBase = totalVal - totalTaxes;

    useEffect(() => {
        if (isQRModalOpen && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [isQRModalOpen, timeLeft]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
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
            <nav className="bg-[#051322] px-8 py-3 flex items-center justify-between sticky top-0 z-[70]">
                <div className="flex items-center gap-1.5 cursor-pointer">
                    <div className="bg-white p-1 rounded-sm shadow-sm border border-gray-100">
                        <div className="w-5 h-5 bg-[#e01e26] rounded-sm flex items-center justify-center text-[10px] font-black text-white italic">my</div>
                    </div>
                    <div className="text-white text-xl font-black italic tracking-tighter">make <span className="text-blue-400">my</span> trip</div>
                </div>

                <div className="flex items-center gap-10">
                    <div className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-black">1</div>
                        <span className="text-[10px] font-black uppercase text-white mt-1">Review</span>
                    </div>
                    <div className="w-20 h-[2px] bg-blue-500/30"></div>
                    <div className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-black">2</div>
                        <span className="text-[10px] font-black uppercase text-white mt-1">Details</span>
                    </div>
                    <div className="w-20 h-[2px] bg-blue-500/30"></div>
                    <div className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-black ring-4 ring-blue-500/20">3</div>
                        <span className="text-[10px] font-black uppercase text-white mt-1">Payment</span>
                    </div>
                </div>

                <div className="text-white flex flex-col items-end">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Amount</span>
                    <span className="text-xl font-black italic tabular-nums">₹ {totalVal.toLocaleString()}</span>
                </div>
            </nav>

            <div className="max-w-[1100px] mx-auto px-4 py-8 flex gap-8">
                {/* Left Side - Payment Options */}
                <div className="flex-1">
                    <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">Choose Payment Method</h2>

                    <div className="flex gap-1 overflow-hidden rounded-2xl border shadow-xl bg-white">
                        {/* Sidebar tabs */}
                        <div className="w-64 bg-gray-50/50 border-r flex flex-col pt-4">
                            {[
                                { name: "UPI (Google Pay, PhonePe, etc)", icon: <Smartphone className="w-4 h-4" />, active: true, badge: "SAFE" },
                                { name: "Credit/Debit Card", icon: <CreditCard className="w-4 h-4" /> },
                                { name: "Book Now Pay Later", icon: <History className="w-4 h-4" />, badge: "LAZYPAY" },
                                { name: "Wallets", icon: <Wallet className="w-4 h-4" /> },
                                { name: "Net Banking", icon: <Landmark className="w-4 h-4" /> },
                                { name: "EMI / Pay Later", icon: <Clock className="w-4 h-4" /> },
                                { name: "Gift Cards", icon: <Gift className="w-4 h-4" /> },
                            ].map((opt, i) => (
                                <div key={i} className={`px-6 py-5 flex items-center justify-between cursor-pointer group transition-all ${opt.active ? "bg-white border-l-4 border-blue-500 shadow-inner" : "hover:bg-blue-50/30"}`}>
                                    <div className="flex items-center gap-4">
                                        <div className={`${opt.active ? "text-blue-500" : "text-gray-400 group-hover:text-blue-400 transition-colors"}`}>{opt.icon}</div>
                                        <span className={`text-[11px] font-black uppercase tracking-wider italic ${opt.active ? "text-gray-900" : "text-gray-500"}`}>{opt.name}</span>
                                    </div>
                                    {opt.badge && <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-sm ${opt.badge === 'SAFE' ? 'bg-emerald-100 text-emerald-600' : 'bg-purple-100 text-purple-600'}`}>{opt.badge}</span>}
                                </div>
                            ))}
                        </div>

                        {/* Payment content */}
                        <div className="flex-1 p-10">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xl font-black uppercase italic tracking-wider">Pay using UPI</h3>
                                <div className="flex gap-2">
                                    {['gpay', 'phonepe', 'bhim', 'paytm'].map(u => <div key={u} className="w-8 h-4 bg-gray-100 rounded opacity-40"></div>)}
                                </div>
                            </div>

                            <div className="bg-blue-50/30 border-2 border-dashed border-blue-100 rounded-3xl p-10 flex flex-col items-center gap-6">
                                <div className="w-48 h-48 bg-white rounded-3xl shadow-2xl flex flex-center items-center justify-center p-6 relative group cursor-pointer hover:scale-105 transition-all active:scale-95" onClick={() => setIsQRModalOpen(true)}>
                                    <div className="w-full h-full bg-gray-900 rounded-xl relative overflow-hidden">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="grid grid-cols-4 gap-2 opacity-5">
                                                {Array.from({ length: 16 }).map((_, i) => <div key={i} className="w-6 h-6 bg-white"></div>)}
                                            </div>
                                        </div>
                                        <div className="absolute inset-4 border-8 border-white/10 rounded-lg"></div>
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-lg shadow-xl">
                                            <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center text-[8px] text-white font-black italic">my</div>
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl flex items-center justify-center">
                                        <span className="bg-white text-blue-600 px-4 py-2 rounded-full text-[10px] font-black shadow-xl">SCAN TO PAY</span>
                                    </div>
                                </div>

                                <div className="text-center">
                                    <p className="text-sm font-black italic uppercase tracking-wider text-gray-800">Scan QR to pay ₹ {totalVal.toLocaleString()}</p>
                                    <p className="text-[10px] font-bold text-gray-400 mt-1">Use Google Pay, PhonePe, Paytm or any UPI app</p>
                                </div>
                            </div>

                            <div className="mt-10 flex flex-col gap-6">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-100"></div>
                                    </div>
                                    <div className="relative flex justify-center text-[10px] font-black uppercase text-gray-300 bg-white px-4 tracking-widest italic">OR ENTER VPA / UPI ID</div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex-1 relative">
                                        <input
                                            type="text"
                                            defaultValue="sankalp@upi"
                                            className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl pl-6 pr-28 py-4.5 text-sm font-black focus:outline-none focus:border-blue-400 focus:bg-white transition-all shadow-sm"
                                        />
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-white/80 backdrop-blur-sm pl-2 py-1 rounded-lg">
                                            <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-white scale-75"><Check className="w-3 h-3" /></div>
                                            <span className="text-[10px] font-black text-emerald-500 uppercase">Verified</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setIsPaymentSuccess(true)}
                                        className="bg-[#008cff] text-white rounded-2xl px-12 font-black uppercase text-sm tracking-widest hover:bg-blue-600 active:scale-95 transition-all shadow-xl shadow-blue-200"
                                    >
                                        Verify & Pay
                                    </button>
                                </div>
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input type="checkbox" className="w-5 h-5 rounded border-2 border-gray-200 checked:bg-blue-500 transition-all cursor-pointer" />
                                    <span className="text-[10px] font-bold text-gray-500 italic uppercase">Securely save this VPA for a faster checkout next time</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Price Summary */}
                <div className="w-[360px] flex flex-col gap-6">
                    <div className="bg-white rounded-2xl border shadow-xl overflow-hidden">
                        <div className="bg-gray-50 px-8 py-4 border-b">
                            <h3 className="text-xs font-black uppercase italic tracking-widest text-gray-400">Booking Summary</h3>
                        </div>
                        <div className="p-8">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-2xl shadow-sm border border-gray-100">{logo}</div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-black italic uppercase text-gray-800">{fromCity} → {toCity}</span>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sun, 08 Feb</span>
                                    </div>
                                </div>
                                <Shield className="w-5 h-5 text-emerald-500 opacity-20" />
                            </div>

                            <div className="flex flex-col gap-5 border-b border-dashed pb-8 border-gray-100">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest italic">Base Fare ({passengerCount} Adult)</span>
                                    <span className="text-xs font-black tabular-nums text-gray-800">₹ {totalBase.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest italic">Taxes & Fees</span>
                                    <span className="text-xs font-black tabular-nums text-gray-800">₹ {totalTaxes.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="pt-6 flex items-center justify-between">
                                <span className="text-lg font-black italic uppercase tracking-wider text-gray-900">Total Price</span>
                                <span className="text-2xl font-black italic tabular-nums text-blue-600">₹ {totalVal.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 flex items-start gap-4 shadow-sm group">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-emerald-500 shadow-md group-hover:scale-110 transition-transform">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[11px] font-black text-emerald-800 uppercase italic tracking-tight mb-1">Safe and Secure Payments</span>
                            <p className="text-[9px] font-bold text-emerald-600/80 leading-relaxed italic">Your transaction is encrypted with 256-bit SSL technology. No data is stored without permission.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Components */}
            {isQRModalOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-[#051322]/80 backdrop-blur-xl" onClick={() => setIsQRModalOpen(false)}></div>
                    <div className="bg-white w-[500px] rounded-[40px] shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="bg-blue-600 h-32 relative overflow-hidden flex items-center justify-center text-white">
                            <div className="absolute inset-0 opacity-10">
                                <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
                            </div>
                            <h2 className="text-2xl font-black italic uppercase active:tracking-widest transition-all">Scan to Pay</h2>
                            <button onClick={() => setIsQRModalOpen(false)} className="absolute top-6 right-6 hover:rotate-90 transition-transform"><X className="w-6 h-6 text-white/50 hover:text-white" /></button>
                        </div>

                        <div className="p-10 flex flex-col items-center gap-8 -mt-10">
                            <div className="bg-white p-6 rounded-[30px] shadow-[0_15px_40px_-5px_rgba(37,99,235,0.2)]">
                                <div className="w-56 h-56 bg-gray-900 rounded-2xl flex items-center justify-center relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-transparent transition-colors"></div>
                                    <div className="w-48 h-48 border-2 border-white/5 rounded-xl flex items-center justify-center">
                                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-blue-600 font-black italic shadow-2xl">my</div>
                                    </div>
                                    {/* Animated scan bar */}
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-bounce"></div>
                                </div>
                            </div>

                            <div className="text-center">
                                <p className="text-3xl font-black tabular-nums text-gray-900">₹ {totalVal.toLocaleString()}</p>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-2 italic">Ref ID: MMT839HH83</p>
                            </div>

                            <div className="flex gap-4 items-center bg-gray-50 px-8 py-3 rounded-full border border-gray-100">
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                <span className="text-[11px] font-black text-gray-500 uppercase tracking-widest italic pt-0.5">Expires in <span className="text-gray-900">{formatTime(timeLeft)}</span></span>
                            </div>

                            <button
                                onClick={() => setIsPaymentSuccess(true)}
                                className="w-full bg-[#008cff] text-white rounded-2xl py-5 font-black uppercase text-sm tracking-[0.2em] hover:bg-blue-600 shadow-2xl shadow-blue-200 transition-all active:scale-95"
                            >
                                CONTINUE AFTER PAYMENT
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isPaymentSuccess && (
                <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-[#051322] flex items-center justify-center">
                        <div className="flex flex-col items-center gap-10 animate-in zoom-in-95 duration-500">
                            <div className="w-32 h-32 bg-emerald-500 rounded-full flex items-center justify-center text-white text-6xl shadow-[0_0_80px_rgba(16,185,129,0.4)] relative">
                                <Check className="w-16 h-16 stroke-[4]" />
                                <div className="absolute inset-0 border-8 border-white/20 rounded-full animate-ping"></div>
                            </div>
                            <div className="text-center flex flex-col gap-4">
                                <h2 className="text-5xl font-black italic uppercase tracking-tighter text-white">Payment Successful!</h2>
                                <p className="text-emerald-400 text-sm font-black uppercase tracking-[0.3em] font-mono">PNR: MYTRI-992BH-S7</p>
                                <p className="text-gray-400 text-sm font-bold mt-4">Your tickets have been sent to {booking.contactEmail || 'sankalp@example.com'}</p>
                            </div>
                            <div className="flex flex-col items-center gap-4">
                                <Link href="/" className="bg-white text-gray-900 rounded-full px-16 py-5 font-black uppercase text-sm tracking-widest hover:scale-110 transition-all active:scale-95 shadow-2xl">BACK TO HOME</Link>
                                <button
                                    onClick={() => setIsTicketOpen(true)}
                                    className="text-emerald-400 font-black uppercase text-[10px] tracking-[0.3em] hover:underline flex items-center gap-2"
                                >
                                    <Download className="w-4 h-4" /> Download/Print Ticket
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <TicketModal
                isOpen={isTicketOpen}
                onClose={() => setIsTicketOpen(false)}
                flightDetails={{
                    from: fromCity,
                    to: toCity,
                    airline: airline,
                    departure: departure,
                    arrival: arrival,
                    logo: logo,
                    id: flightId
                }}
            />
        </div>
    );
}
