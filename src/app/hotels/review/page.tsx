"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HotelBookingReviewSchema, type HotelBookingReview } from "@/lib/schemas/hotel";
import { getHotelById, type Hotel } from "@/services/hotels";
import { Check, ShieldCheck, Info, Loader2 } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { formatDateLabel } from "@/lib/utils";

function HotelReviewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);

  const hotelId = searchParams.get("hotelId");
  const roomId = searchParams.get("roomId");
  const checkIn = searchParams.get("checkIn") || "2026-02-20";
  const checkOut = searchParams.get("checkOut") || "2026-02-23";

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<HotelBookingReview>({
    resolver: zodResolver(HotelBookingReviewSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    }
  });

  useEffect(() => {
    const fetchHotel = async () => {
      if (!hotelId) return;
      const result = await getHotelById(hotelId);
      setHotel(result || null);
      setLoading(false);
    };
    fetchHotel();
  }, [hotelId]);

  const onSubmit = async (data: HotelBookingReview) => {
    // Simulate booking API
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log("Booking Confirmed:", { hotelId, roomId, ...data });
    alert("Booking Confirmed Successfully!");
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
        <p className="font-black text-gray-400 uppercase tracking-widest">Preparing your booking review...</p>
      </div>
    );
  }

  const basePrice = hotel ? parseInt(hotel.price.replace(/,/g, '')) : 0;
  const taxes = Math.round(basePrice * 0.12);
  const total = basePrice + taxes;

  return (
    <div className="bg-[#f2f2f2] min-h-screen pb-20">
      <Header />
      
      <div className="max-w-7xl mx-auto px-20 py-10">
        <h1 className="text-3xl font-black text-gray-800 mb-8 uppercase tracking-tighter">Review Your Booking</h1>

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 space-y-6">
            {/* Hotel Summary Card */}
            <div className="bg-white rounded-2xl shadow-sm border p-6 flex gap-6">
              <div className="w-40 h-32 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                <img src={hotel?.images[0]} className="w-full h-full object-cover" alt="hotel" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                   <div className="flex">
                    {[...Array(hotel?.rating)].map((_, i) => (
                      <Star key={i} className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <h2 className="text-xl font-black text-gray-800 uppercase tracking-tight">{hotel?.name}</h2>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">{hotel?.area}, {hotel?.city}</p>
                <div className="flex gap-8 mt-4 pt-4 border-t">
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Check-in</p>
                    <p className="font-black text-gray-800">{formatDateLabel(checkIn)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Check-out</p>
                    <p className="font-black text-gray-800">{formatDateLabel(checkOut)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Room Type</p>
                    <p className="font-black text-blue-600">{roomId}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Guest Details Form */}
            <div className="bg-white rounded-2xl shadow-sm border p-8">
               <h3 className="text-xl font-black text-gray-800 mb-6 uppercase tracking-tighter flex items-center gap-2">
                 <ShieldCheck className="w-6 h-6 text-green-600" />
                 Guest Details
               </h3>
               
               <form id="booking-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">First Name</label>
                      <input 
                        {...register("firstName")}
                        className={`w-full bg-gray-50 border-2 rounded-xl px-4 py-3 outline-none transition-all font-bold ${errors.firstName ? 'border-red-200 focus:border-red-500' : 'border-gray-100 focus:border-blue-500'}`}
                        placeholder="e.g. John"
                      />
                      {errors.firstName && <p className="text-[10px] text-red-500 font-bold uppercase ml-1">{errors.firstName.message}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Last Name</label>
                      <input 
                        {...register("lastName")}
                        className={`w-full bg-gray-50 border-2 rounded-xl px-4 py-3 outline-none transition-all font-bold ${errors.lastName ? 'border-red-200 focus:border-red-500' : 'border-gray-100 focus:border-blue-500'}`}
                        placeholder="e.g. Doe"
                      />
                      {errors.lastName && <p className="text-[10px] text-red-500 font-bold uppercase ml-1">{errors.lastName.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                      <input 
                        {...register("email")}
                        className={`w-full bg-gray-50 border-2 rounded-xl px-4 py-3 outline-none transition-all font-bold ${errors.email ? 'border-red-200 focus:border-red-500' : 'border-gray-100 focus:border-blue-500'}`}
                        placeholder="john.doe@example.com"
                      />
                      {errors.email && <p className="text-[10px] text-red-500 font-bold uppercase ml-1">{errors.email.message}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Mobile Number</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-gray-400">+91</span>
                        <input 
                          {...register("phone")}
                          className={`w-full bg-gray-50 border-2 rounded-xl pl-14 pr-4 py-3 outline-none transition-all font-bold ${errors.phone ? 'border-red-200 focus:border-red-500' : 'border-gray-100 focus:border-blue-500'}`}
                          placeholder="9876543210"
                        />
                      </div>
                      {errors.phone && <p className="text-[10px] text-red-500 font-bold uppercase ml-1">{errors.phone.message}</p>}
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-4 flex gap-4 border border-blue-100 italic">
                    <Info className="w-5 h-5 text-blue-600 shrink-0" />
                    <p className="text-[11px] font-medium text-blue-800">Your booking details will be sent to this email and mobile number.</p>
                  </div>
               </form>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl border overflow-hidden">
               <div className="bg-gray-50 px-6 py-4 border-b">
                 <h3 className="font-black text-gray-800 uppercase tracking-widest text-xs">Fare Summary</h3>
               </div>
               <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center text-sm font-bold text-gray-600 uppercase tracking-tight">
                    <span>Base Price (1 Night)</span>
                    <span className="text-gray-900">₹ {basePrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-bold text-gray-600 uppercase tracking-tight">
                    <span>Taxes & Service Fees</span>
                    <span className="text-gray-900">₹ {taxes.toLocaleString()}</span>
                  </div>
                  <div className="pt-4 border-t flex justify-between items-end">
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Amount</p>
                      <p className="text-3xl font-black text-gray-900">₹ {total.toLocaleString()}</p>
                    </div>
                    <div className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-[10px] font-black uppercase mb-1">Savings: ₹ 1,200</div>
                  </div>
               </div>
               
               <div className="p-6 pt-0">
                  <button 
                    type="submit"
                    form="booking-form"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-orange-400 to-orange-600 text-white py-4 rounded-xl font-black text-lg shadow-xl shadow-orange-200 hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-widest disabled:opacity-50 disabled:scale-100"
                  >
                    {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : "Pay & Confirm Booking"}
                  </button>
                  <p className="text-[9px] font-bold text-gray-400 text-center mt-4 uppercase tracking-tighter italic">By clicking this, you agree to the terms and conditions</p>
               </div>
            </div>

            <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
               <div className="flex items-center gap-2 mb-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <h4 className="font-black text-green-800 uppercase tracking-widest text-[11px]">MMT Assurance</h4>
               </div>
               <p className="text-[10px] font-medium text-green-700 leading-relaxed uppercase tracking-tighter">
                 Guaranteed check-in or 2x refund. Priority support for all booked properties.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Star({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export default function HotelReviewPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
        <p className="font-black text-gray-400 uppercase tracking-widest">Preparing your booking review...</p>
      </div>
    }>
      <HotelReviewContent />
    </Suspense>
  );
}
