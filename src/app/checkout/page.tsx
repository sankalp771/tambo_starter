"use client";

import { MessageSquare, X, ChevronDown, ChevronRight, Info, Plus, Tag, Check, Minus, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ReviewDetailsModal } from "@/components/mmt/ReviewDetailsModal";
import { useBooking } from "@/context/BookingContext";
import { withInteractable } from "@tambo-ai/react";
import { z } from "zod";

const checkoutSchema = z.object({
    passengersArray: z.array(z.object({
        name: z.string(),
        age: z.string(),
        gender: z.enum(['Male', 'Female', 'Other'])
    })).optional(),
    passengerName: z.string().optional(),
    passengerAge: z.string().optional(),
    passengerGender: z.enum(['Male', 'Female', 'Other']).optional(),
    contactEmail: z.string().optional(),
    contactMobile: z.string().optional(),
});

type CheckoutProps = z.infer<typeof checkoutSchema>;

function CheckoutPageBase(props: CheckoutProps) {
    const { booking, updateBooking } = useBooking();
    const [isReviewOpen, setIsReviewOpen] = useState(false);

    const searchParams = useSearchParams();
    const travellersParam = searchParams.get("travellers");
    const passengerCountFromUrl = travellersParam ? parseInt(travellersParam) : 1;

    // Sync AI props to local booking context
    useEffect(() => {
        const updates: any = {};

        if (props.passengersArray && props.passengersArray.length > 0) {
            updates.passengers = props.passengersArray;
        } else if (props.passengerName) {
            updates.passengers = [{
                name: props.passengerName,
                age: props.passengerAge || '21',
                gender: props.passengerGender || 'Male'
            }];
        } else if (booking.passengers.length === 0) {
            // Initialize from URL if empty
            updates.passengers = Array.from({ length: passengerCountFromUrl }).map(() => ({
                name: '',
                age: '21',
                gender: 'Male'
            }));
        }

        if (props.contactEmail) updates.contactEmail = props.contactEmail;
        if (props.contactMobile) updates.contactMobile = props.contactMobile;

        if (Object.keys(updates).length > 0) {
            updateBooking(updates);
        }
    }, [props, passengerCountFromUrl]);

    const router = useRouter();

    // Get flight data from URL
    const fromCity = searchParams.get("from") || "DEL";
    const toCity = searchParams.get("to") || "BOM";
    const airline = searchParams.get("airline") || "Akasa Air";
    const priceStr = searchParams.get("price") || "5,641";
    const departure = searchParams.get("departure") || "16:00";
    const arrival = searchParams.get("arrival") || "18:20";
    const logo = searchParams.get("logo") || "🧡";
    const flightId = searchParams.get("id") || "QP 1128";

    const baseFare = parseInt(priceStr.replace(/,/g, '')) || 5641;
    const taxes = 859;

    // Calculate totals based on passenger count
    const passengerCount = Math.max(passengerCountFromUrl, booking.passengers.length);
    const totalBaseFare = baseFare * passengerCount;
    const totalTaxes = taxes * passengerCount;
    const totalAmount = `₹ ${(totalBaseFare + totalTaxes).toLocaleString()}`;

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 overflow-x-hidden">
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

            <div className="max-w-[1240px] mx-auto py-8 px-4 flex gap-8 items-start">
                {/* Left Content Area */}
                <div className="flex-1 flex flex-col gap-8">
                    {/* Header Strip */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex justify-between items-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500"></div>
                        <div className="flex flex-col gap-1">
                            <h2 className="text-2xl font-black italic tracking-tighter uppercase flex items-center gap-3">
                                Complete your booking <ChevronRight className="w-5 h-5 text-gray-300" />
                            </h2>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <Info className="w-4 h-4" /> Please verify your flight details before proceeding
                            </p>
                        </div>
                    </div>

                    {/* Flight Summary Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group">
                        <div className="bg-gray-50/80 px-8 py-4 border-b flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase tracking-widest text-blue-500 italic">Departure Flight</span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 italic">Saturday, 7 Feb 26</span>
                        </div>
                        <div className="p-8 flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-3xl shadow-sm group-hover:scale-110 transition-transform">{logo}</div>
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-xl font-black italic tracking-tighter uppercase">{airline}</h3>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">{fromCity} → {toCity}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-12">
                                <div className="text-center">
                                    <p className="text-2xl font-black italic tabular-nums">{departure}</p>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">{fromCity}</p>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-32 h-[2px] bg-gray-100 relative">
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                                            <MessageSquare className="w-3 h-3 text-gray-300" />
                                        </div>
                                    </div>
                                    <span className="text-[9px] font-black text-gray-400 uppercase italic">02h 20m • Non Stop</span>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-black italic tabular-nums">{arrival}</p>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">{toCity}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Traveller Details */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b flex justify-between items-center">
                            <h3 className="text-xl font-black italic tracking-tighter uppercase">Traveller Details</h3>
                            <button
                                onClick={() => updateBooking({ passengers: [...booking.passengers, { name: '', age: '21', gender: 'Male' }] })}
                                className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline"
                            >
                                <Plus className="w-4 h-4 inline mr-1" /> Add Traveller
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {booking.passengers.length > 0 ? (
                                <div className="space-y-4">
                                    {booking.passengers.map((p, idx) => (
                                        <div key={idx} className="bg-gray-50 rounded-xl p-5 border border-gray-100 flex items-center justify-between group">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-black italic">
                                                    {p.name ? p.name.charAt(0).toUpperCase() : '?'}
                                                </div>
                                                <div className="flex flex-col">
                                                    <input
                                                        type="text"
                                                        value={p.name}
                                                        placeholder="Enter Name"
                                                        onChange={(e) => {
                                                            const newPass = [...booking.passengers];
                                                            newPass[idx].name = e.target.value;
                                                            updateBooking({ passengers: newPass });
                                                        }}
                                                        className="bg-transparent text-sm font-black italic uppercase focus:outline-none border-b border-transparent focus:border-blue-400"
                                                    />
                                                    <p className="text-[10px] font-black text-gray-400 uppercase">{p.gender} • {p.age} YRS</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => updateBooking({ passengers: booking.passengers.filter((_, i) => i !== idx) })}
                                                className="opacity-0 group-hover:opacity-100 p-2 text-red-500 hover:scale-110 transition-all"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-12 flex flex-col items-center justify-center gap-6 border-2 border-dashed border-gray-100 rounded-2xl bg-gray-50/20">
                                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-4xl shadow-sm border border-gray-100">👤</div>
                                    <p className="text-sm font-black uppercase italic tracking-widest text-gray-400">You have not added any travellers</p>
                                    <button
                                        onClick={() => updateBooking({ passengers: [{ name: '', age: '21', gender: 'Male' }] })}
                                        className="flex items-center gap-2 text-[10px] font-black text-blue-500 uppercase tracking-widest hover:underline"
                                    >
                                        <Plus className="w-4 h-4" /> Add Adult
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Booking Details / Contacts */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b">
                            <h3 className="text-sm font-black uppercase tracking-wider italic font-black">Booking details will be sent to</h3>
                        </div>

                        <div className="p-6">
                            <div className="grid grid-cols-2 gap-6 mb-8">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Country Code</label>
                                    <div className="border rounded-xl p-3 flex justify-between items-center bg-gray-50/50">
                                        <span className="text-sm font-black italic uppercase font-black">India(91)</span>
                                        <ChevronDown className="w-4 h-4 text-gray-400" />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Mobile No</label>
                                    <input
                                        type="text"
                                        placeholder="Mobile No"
                                        value={booking.contactMobile}
                                        onChange={(e) => updateBooking({ contactMobile: e.target.value })}
                                        className="w-full border rounded-xl p-3 text-sm font-black italic uppercase focus:outline-none focus:border-blue-400 bg-gray-50/20"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 mb-8">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Email</label>
                                <input
                                    type="text"
                                    placeholder="Email"
                                    value={booking.contactEmail}
                                    onChange={(e) => updateBooking({ contactEmail: e.target.value })}
                                    className="w-full border rounded-xl p-3 text-sm font-black italic uppercase focus:outline-none focus:border-blue-400 bg-gray-50/20"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <button
                            onClick={() => setIsReviewOpen(true)}
                            className="w-44 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-full py-4 px-10 font-black uppercase text-sm tracking-widest shadow-[0_10px_20px_-5px_rgba(37,99,235,0.4)] hover:scale-110 active:scale-95 transition-all"
                        >
                            Continue
                        </button>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="w-[340px] sticky top-24 flex flex-col gap-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b">
                            <h3 className="text-xl font-black italic tracking-tighter uppercase">Fare Summary</h3>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <Plus className="w-3 h-3 text-gray-400 font-bold" />
                                    <span className="text-[10px] font-black uppercase text-gray-500">Total Base Fare ({passengerCount} Adult)</span>
                                </div>
                                <span className="text-xs font-black tabular-nums">₹ {totalBaseFare.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <Plus className="w-3 h-3 text-gray-400 font-bold" />
                                    <span className="text-[10px] font-black uppercase text-gray-500">Total Taxes & Surcharges</span>
                                </div>
                                <span className="text-xs font-black tabular-nums">₹ {totalTaxes.toLocaleString()}</span>
                            </div>
                            <div className="pt-4 border-t border-dashed flex justify-between items-center">
                                <span className="text-lg font-black italic uppercase">Total Amount</span>
                                <span className="text-xl font-black italic">{totalAmount}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ReviewDetailsModal
                isOpen={isReviewOpen}
                onClose={() => setIsReviewOpen(false)}
                onConfirm={() => router.push(`/seats?id=${flightId}&airline=${airline}&price=${baseFare}&departure=${departure}&arrival=${arrival}&from=${fromCity}&to=${toCity}&logo=${logo}&travellers=${passengerCount}`)}
            />
        </div>
    );
}

const InteractableCheckoutPage = withInteractable(CheckoutPageBase, {
    componentName: "CheckoutPage",
    description: "The flight checkout page where users enter passenger details and contact info.",
    propsSchema: checkoutSchema,
});

export default function CheckoutPage() {
    return <InteractableCheckoutPage />;
}
