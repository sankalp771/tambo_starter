"use client";

import { useRouter, useSearchParams, useParams } from "next/navigation";
import { useEffect, useState, useLayoutEffect, Suspense } from "react";
import { Star, MapPin, CheckCircle2, ChevronRight, Share2, Heart, Loader2 } from "lucide-react";
import { getHotelById, type Hotel } from "@/services/hotels";
import { Header } from "@/components/layout/Header";
import { formatDateLabel } from "@/lib/utils";

function HotelDetailsContent() {
  const params = useParams();
  const id = params.id as string;
  const searchParams = useSearchParams();
  const router = useRouter();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);

  const checkIn = searchParams.get("checkIn") || "2026-02-20";
  const checkOut = searchParams.get("checkOut") || "2026-02-23";

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const fetchHotel = async () => {
      if (!id) return;
      setLoading(true);
      const result = await getHotelById(id);
      setHotel(result || null);
      setLoading(false);
    };
    fetchHotel();
  }, [id]);

  const handleBookNow = (roomType: string, planId: string) => {
    router.push(`/hotels/review?hotelId=${id}&roomId=${roomType}&planId=${planId}&checkIn=${checkIn}&checkOut=${checkOut}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
        <p className="font-black text-gray-400 uppercase tracking-widest">Loading property details...</p>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-4xl">🕵️</p>
        <h2 className="text-2xl font-black text-gray-800">Property Not Found</h2>
        <button onClick={() => router.back()} className="text-blue-600 font-black uppercase underline">Go Back</button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      <Header showCategoryNav />
      {/* Header / Gallery Section */}
      <div className="max-w-7xl mx-auto px-20 py-10">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-[10px] font-black uppercase">MMT Assured</span>
              <div className="flex">
                {[...Array(hotel.rating)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
            <h1 className="text-4xl font-black text-gray-800">{hotel.name}</h1>
            <p className="text-sm font-bold text-gray-500 flex items-center gap-1 mt-2">
              <MapPin className="w-4 h-4 text-blue-600" /> {hotel.address || hotel.area + ", " + hotel.city}
            </p>
          </div>
          <div className="flex gap-4">
            <button className="p-3 border rounded-full hover:bg-gray-50 transition-all shadow-sm"><Share2 className="w-5 h-5 text-gray-600" /></button>
            <button className="p-3 border rounded-full hover:bg-gray-50 transition-all shadow-sm"><Heart className="w-5 h-5 text-gray-600" /></button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 h-[500px] mb-10 overflow-hidden rounded-3xl shadow-lg bg-gray-100">
          <div className="col-span-2 relative group overflow-hidden">
            <img src={hotel.images[0]} alt="Hotel" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-500" />
          </div>
          <div className="relative group overflow-hidden">
            <img src={hotel.images[1]} alt="Hotel" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-500" />
          </div>
          <div className="grid grid-rows-2 gap-4">
            <div className="relative group overflow-hidden">
              <img src={hotel.images[2]} alt="Hotel" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-500" />
            </div>
            <div className="relative flex items-center justify-center group overflow-hidden">
              <img src={hotel.images[0]} alt="Hotel" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-500 opacity-50" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-white font-black text-xl">+ {hotel.images.length} Photos</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs / Info Section */}
        <div className="grid grid-cols-3 gap-10">
          <div className="col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-black text-gray-800 mb-4 uppercase tracking-tighter">About the Property</h2>
              <p className="text-gray-600 leading-relaxed font-medium">{hotel.description}</p>
              <div className="flex flex-wrap gap-4 mt-8">
                {hotel.amenities.slice(0, 8).map((amenity, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-500 font-bold text-[10px] bg-gray-50 px-4 py-2 rounded-xl uppercase tracking-widest border">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" /> {amenity}
                  </div>
                ))}
              </div>
            </section>

            <section id="rooms">
              <h2 className="text-2xl font-black text-gray-800 mb-6 uppercase tracking-tighter">Choose Your Room</h2>
              <div className="space-y-6">
                {hotel.roomTypes.map((roomType, idx) => (
                  <div key={idx} className="border rounded-2xl overflow-hidden bg-gray-50/30">
                    <div className="bg-gray-100/50 px-6 py-4 border-b flex justify-between items-center">
                      <h3 className="text-lg font-black text-gray-800 uppercase tracking-tight">{roomType}</h3>
                      <div className="flex gap-4">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Free Cancellation</span>
                      </div>
                    </div>
                    <div className="p-6 grid grid-cols-3 gap-6">
                      <div className="bg-gray-200 h-40 rounded-xl overflow-hidden relative">
                        <img src={hotel.images[1]} className="w-full h-full object-cover" alt="room" />
                      </div>
                      <div className="col-span-2 space-y-4">
                        <div className="bg-white p-4 rounded-xl border flex justify-between items-center hover:border-blue-600 transition-all shadow-sm group">
                          <div>
                            <p className="font-black text-gray-800">Room Only</p>
                            <p className="text-[10px] text-green-600 font-black mt-1 uppercase tracking-tighter">No Prepayment Required</p>
                          </div>
                          <div className="text-right flex items-center gap-6">
                            <div>
                              <p className="text-2xl font-black text-gray-800">₹ {hotel.price}</p>
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">+ Taxes & fees</p>
                            </div>
                            <button
                              onClick={() => handleBookNow(roomType, "plan-1")}
                              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-3 rounded-full font-black text-[10px] shadow-lg group-hover:shadow-xl group-hover:scale-105 active:scale-95 transition-all uppercase tracking-widest"
                            >
                              Select
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-6 sticky top-28 h-fit">
            <div className="bg-white p-6 rounded-2xl border shadow-xl">
              <h3 className="font-black text-gray-800 mb-4 uppercase tracking-tighter">Your Stay Details</h3>
              <div className="space-y-4 border-b pb-6 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Check-in</span>
                  <span className="font-black text-gray-800">{formatDateLabel(checkIn)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Check-out</span>
                  <span className="font-black text-gray-800">{formatDateLabel(checkOut)}</span>
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-3xl font-black text-gray-800">₹ {hotel.price}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Per Night (avg)</p>
                </div>
                <button
                  onClick={() => handleBookNow(hotel.roomTypes[0] || "Standard Room", "plan-1")}
                  className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:scale-110 active:scale-90 transition-all"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HotelDetailsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
        <p className="font-black text-gray-400 uppercase tracking-widest">Loading property details...</p>
      </div>
    }>
      <HotelDetailsContent />
    </Suspense>
  );
}
