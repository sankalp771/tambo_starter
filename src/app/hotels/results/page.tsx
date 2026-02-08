"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { Star, Filter, Loader2, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { getHotelsByCity, type Hotel } from "@/services/hotels";
import { Header } from "@/components/layout/Header";
import { formatDateLabel, parseRoomsParam } from "@/lib/utils";

function HotelResultsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filter & Sort State
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedStarRatings, setSelectedStarRatings] = useState<number[]>([]);
  const [minUserRating, setMinUserRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<string>("Popularity");

  const city = searchParams.get("city") || "Goa";
  const checkIn = searchParams.get("checkIn") || "2026-02-20";
  const checkOut = searchParams.get("checkOut") || "2026-02-23";
  const roomsInfo = parseRoomsParam(searchParams.get("rooms"));

  // Fetch hotels when city changes
  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      const results = await getHotelsByCity(city);
      setHotels(results);
      setLoading(false);
    };
    fetchHotels();
  }, [city]);

  // Sync filter state with URL params
  useEffect(() => {
    const priceRange = searchParams.get("priceRange");
    setSelectedPriceRanges(priceRange ? [priceRange] : []);

    const starRating = searchParams.get("starRating");
    setSelectedStarRatings(starRating ? [parseInt(starRating)] : []);

    const rating = searchParams.get("minUserRating");
    setMinUserRating(rating ? parseFloat(rating) : null);

    const sort = searchParams.get("sort");
    setSortBy(sort || "Popularity");
  }, [searchParams]);

  const togglePriceRange = (range: string) => {
    setSelectedPriceRanges(prev => 
      prev.includes(range) ? prev.filter(r => r !== range) : [...prev, range]
    );
  };

  const toggleStarRating = (rating: number) => {
    setSelectedStarRatings(prev => 
      prev.includes(rating) ? prev.filter(r => r !== rating) : [...prev, rating]
    );
  };

  const filteredAndSortedHotels = hotels
    .filter(hotel => {
      if (selectedPriceRanges.length > 0) {
        const price = parseInt(hotel.price.replace(/,/g, ''));
        const matchesPrice = selectedPriceRanges.some(range => {
          if (range === "₹0 - ₹2000") return price <= 2000;
          if (range === "₹2000 - ₹5000") return price > 2000 && price <= 5000;
          if (range === "₹5000 - ₹10000") return price > 5000 && price <= 10000;
          if (range === "₹10000+") return price > 10000;
          return false;
        });
        if (!matchesPrice) return false;
      }
      if (selectedStarRatings.length > 0) {
        if (!selectedStarRatings.includes(hotel.rating)) return false;
      }
      if (minUserRating !== null) {
        if (hotel.reviewRating < minUserRating) return false;
      }
      return true;
    })
    .sort((a, b) => {
      const priceA = parseInt(a.price.replace(/,/g, ''));
      const priceB = parseInt(b.price.replace(/,/g, ''));
      if (sortBy === "Price (Low to High)") return priceA - priceB;
      if (sortBy === "Price (High to Low)") return priceB - priceA;
      if (sortBy === "User Rating") return b.reviewRating - a.reviewRating;
      if (sortBy === "Popularity") return b.reviewCount - a.reviewCount;
      return 0;
    });

  const topPicks = [...filteredAndSortedHotels]
    .sort((a, b) => {
      if (b.reviewRating !== a.reviewRating) return b.reviewRating - a.reviewRating;
      return b.reviewCount - a.reviewCount;
    })
    .slice(0, 3);

  const handleHotelClick = (id: string) => {
    router.push(`/hotels/details/${id}?checkIn=${checkIn}&checkOut=${checkOut}`);
  };

  const applySuggestedFilter = (suggestion: {
    priceRange?: string;
    starRating?: number;
    minUserRating?: number;
    sort?: string;
  }) => {
    const params = new URLSearchParams(searchParams.toString());
    if (suggestion.priceRange) params.set("priceRange", suggestion.priceRange);
    if (suggestion.starRating) params.set("starRating", String(suggestion.starRating));
    if (suggestion.minUserRating) params.set("minUserRating", String(suggestion.minUserRating));
    if (suggestion.sort) params.set("sort", suggestion.sort);
    router.push(`/hotels/results?${params.toString()}`);
  };

  const suggestedFilters = [
    {
      label: "Top Rated 4.0+",
      description: "Best reviewed stays",
      minUserRating: 4,
      sort: "User Rating",
    },
    {
      label: "Budget Under ₹5000",
      description: "Great value picks",
      priceRange: "â‚¹2000 - â‚¹5000",
      sort: "Price (Low to High)",
    },
    {
      label: "Premium 4★+",
      description: "Comfort & amenities",
      starRating: 4,
      sort: "Popularity",
    },
  ];

  return (
    <div className="bg-[#f2f2f2] min-h-screen pb-20">
      <Header />
      {/* Search Summary */}
      <div className="bg-white px-20 py-2 shadow-md border-b sticky top-16 z-40 flex items-center justify-between">
        <div className="flex items-center gap-12 text-gray-900">
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">CITY / AREA</span>
            <span className="font-black text-lg">{city}</span>
          </div>
          <div className="h-8 w-[1px] bg-gray-200"></div>
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">CHECK-IN</span>
            <span className="font-black text-lg">{formatDateLabel(checkIn)}</span>
          </div>
          <div className="h-8 w-[1px] bg-gray-200"></div>
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">CHECK-OUT</span>
            <span className="font-black text-lg">{formatDateLabel(checkOut)}</span>
          </div>
          <div className="h-8 w-[1px] bg-gray-200"></div>
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">ROOMS & GUESTS</span>
            <span className="font-black text-lg">
              {roomsInfo.rooms} Room{roomsInfo.rooms > 1 ? "s" : ""},{" "}
              {roomsInfo.adults} Adult{roomsInfo.adults !== 1 ? "s" : ""}
              {roomsInfo.children > 0
                ? `, ${roomsInfo.children} Child${roomsInfo.children !== 1 ? "ren" : ""}`
                : ""}
            </span>
          </div>
        </div>
        <button className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-8 py-2.5 rounded-full font-black text-xs shadow-lg hover:shadow-xl transition-all uppercase tracking-widest">
          Edit Search
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-20 py-10 flex gap-6">
        {/* Sidebar */}
        <aside className="w-1/4 space-y-4">
           <div className="bg-white rounded-xl shadow-lg border border-gray-200 sticky top-40 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h3 className="font-extrabold text-gray-800 flex items-center gap-2 uppercase tracking-wide text-sm">
                <Filter className="w-4 h-4 text-blue-600" />
                Select Filters
              </h3>
            </div>
            
            <div className="p-6 space-y-8">
                <div>
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Price Range</h4>
                  <div className="space-y-3">
                    {["₹0 - ₹2000", "₹2000 - ₹5000", "₹5000 - ₹10000", "₹10000+"].map(f => (
                      <label key={f} className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          checked={selectedPriceRanges.includes(f)}
                          onChange={() => togglePriceRange(f)}
                          className="w-4 h-4 accent-blue-600 rounded border-gray-300 cursor-pointer" 
                        />
                        <span className={`text-sm font-bold transition-colors group-hover:text-blue-600 ${selectedPriceRanges.includes(f) ? "text-blue-600" : "text-gray-700"}`}>
                          {f}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

               <div className="border-t border-gray-100 pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Star Rating</h4>
                    {(selectedPriceRanges.length > 0 || selectedStarRatings.length > 0 || minUserRating !== null) && (
                      <button 
                        onClick={() => { 
                          setSelectedPriceRanges([]); 
                          setSelectedStarRatings([]); 
                          setMinUserRating(null);
                        }}
                        className="text-[10px] font-black text-blue-600 uppercase"
                      >
                        Clear All
                      </button>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Star Rating (Class)</span>
                    <div className="flex flex-wrap gap-2">
                      {[1, 2, 3, 4, 5].map(s => (
                        <button 
                          key={s} 
                          onClick={() => toggleStarRating(s)}
                          className={`px-3 py-2 border-2 rounded-lg text-xs font-black flex items-center justify-center gap-1 transition-all ${
                            selectedStarRatings.includes(s) 
                            ? "border-blue-600 text-blue-600 bg-blue-50" 
                            : "border-gray-100 text-gray-500 bg-white shadow-sm hover:border-blue-300"
                          }`}
                        >
                          {s} <Star className={`w-3 h-3 ${selectedStarRatings.includes(s) ? "fill-blue-600" : "fill-current"}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 mt-4">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">User Rating (Reviews)</span>
                    <div className="flex flex-col gap-2">
                      {[4.5, 4, 3.5].map(rating => (
                        <button
                          key={rating}
                          onClick={() => setMinUserRating(minUserRating === rating ? null : rating)}
                          className={`w-full px-3 py-2 border-2 rounded-lg text-[11px] font-black flex items-center justify-between transition-all ${
                            minUserRating === rating
                            ? "border-blue-600 text-blue-600 bg-blue-50"
                            : "border-gray-100 text-gray-500 bg-white shadow-sm hover:border-blue-300"
                          }`}
                        >
                          <span>{rating}+ Rated</span>
                          <div className={`px-1.5 py-0.5 rounded text-[10px] ${minUserRating === rating ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}>
                            {rating}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
               </div>
            </div>
           </div>
        </aside>

        {/* List */}
        <main className="flex-1 space-y-6">
           <div className="bg-white rounded-xl border border-blue-100 shadow-sm p-4 flex items-center justify-between">
             <div>
               <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">AI Concierge</p>
               <p className="text-sm font-bold text-gray-700">Suggested filters for your trip</p>
             </div>
             <div className="flex gap-3 flex-wrap justify-end">
               {suggestedFilters.map((s) => (
                 <button
                   key={s.label}
                   onClick={() => applySuggestedFilter(s)}
                   className="px-4 py-2 rounded-full border border-blue-200 text-blue-700 text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 transition-all"
                 >
                   {s.label}
                 </button>
               ))}
             </div>
           </div>

           {topPicks.length > 0 && (
             <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
               <div className="flex items-center justify-between mb-4">
                 <div>
                   <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Top Picks</p>
                   <h3 className="text-lg font-black text-gray-800">Best 3 options for you</h3>
                 </div>
                 <a
                   href="#all-results"
                   className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline"
                 >
                   View all options
                 </a>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 {topPicks.map((hotel) => (
                   <div
                     key={hotel.id}
                     className="border rounded-xl overflow-hidden hover:border-blue-400 transition-all shadow-sm bg-white"
                   >
                     <div className="h-36 bg-gray-100 overflow-hidden">
                       <img
                         src={hotel.images[0]}
                         alt={hotel.name}
                         className="w-full h-full object-cover"
                       />
                     </div>
                     <div className="p-4">
                       <div className="flex items-center justify-between mb-1">
                         <p className="text-xs font-black text-gray-800">{hotel.name}</p>
                         <div className="bg-blue-600 text-white text-[10px] font-black px-2 py-0.5 rounded">
                           {hotel.reviewRating}
                         </div>
                       </div>
                       <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                         {hotel.area}, {hotel.city}
                       </p>
                       <div className="flex items-center justify-between mt-3">
                         <p className="text-lg font-black text-gray-900">₹ {hotel.price}</p>
                         <button
                           onClick={() => handleHotelClick(hotel.id)}
                           className="bg-[#008cff] hover:bg-[#005cff] text-white px-3 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest"
                         >
                           Select
                         </button>
                       </div>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
           )}

           <div className="flex justify-between items-end">
             <h2 className="text-2xl font-black text-gray-800 tracking-tight">
               {loading ? "Searching properties..." : `Showing ${filteredAndSortedHotels.length} Properties in ${city}`}
             </h2>
             <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
               <span className="text-xs font-bold text-gray-500 uppercase tracking-tighter">Sort By:</span>
               <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs font-black text-blue-600 bg-transparent outline-none cursor-pointer uppercase tracking-tighter hover:text-blue-800 transition-colors"
               >
                 <option>Popularity</option>
                 <option>Price (Low to High)</option>
                 <option>Price (High to Low)</option>
                 <option>User Rating</option>
               </select>
             </div>
           </div>

           {loading ? (
             <div className="flex flex-col items-center justify-center py-40 gap-4">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                <p className="font-black text-gray-400 uppercase tracking-widest text-gray-400">Fetching latest deals...</p>
             </div>
           ) : filteredAndSortedHotels.length > 0 ? (
             filteredAndSortedHotels.map((hotel, idx) => (
                <motion.div 
                 id={idx === 0 ? "all-results" : undefined}
                 key={hotel.id}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: idx * 0.05 }}
                 onClick={() => handleHotelClick(hotel.id)}
                 className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 hover:border-blue-400 transition-all overflow-hidden flex min-h-[260px] group cursor-pointer"
               >
                  <div className="w-[280px] shrink-0 bg-gray-200 relative overflow-hidden">
                     <img 
                       src={hotel.images[0]} 
                       alt={hotel.name} 
                       className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-700" 
                     />
                     <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest shadow-md">MMT Luxury</div>
                  </div>

                  <div className="flex-1 p-5 flex flex-col">
                     <div className="flex justify-between items-start">
                        <div>
                           <div className="flex flex-col mb-1.5">
                              <span className="text-[9px] font-black text-gray-400 uppercase tracking-tighter mb-0.5">Property Class</span>
                              <div className="flex gap-0.5">
                                 {Array.from({ length: hotel.rating }).map((_, i) => (
                                   <Star key={i} className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
                                 ))}
                              </div>
                           </div>
                           <h3 className="text-xl font-extrabold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight mb-1">{hotel.name}</h3>
                           <p className="text-xs font-bold text-blue-500 flex items-center gap-1 mb-3 uppercase">
                             {hotel.area} | {hotel.city}
                           </p>
                           
                           <div className="flex flex-wrap gap-2 mb-4">
                              {hotel.amenities.slice(0, 3).map((amenity, i) => (
                                <span key={i} className="text-[10px] font-bold text-gray-500 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100 uppercase">
                                  {amenity}
                                </span>
                              ))}
                           </div>

                           <div className="flex items-center gap-2 mt-auto">
                              <span className="text-[10px] font-black text-green-600 uppercase tracking-tighter bg-green-50 px-2 py-0.5 rounded border border-green-100">Free Cancellation</span>
                           </div>
                        </div>

                        <div className="text-right flex flex-col items-end">
                           <div className="flex items-center gap-2">
                              <div className="text-right">
                                 <p className="text-xs font-black text-gray-900 uppercase tracking-tight">Very Good</p>
                                 <p className="text-[9px] font-bold text-gray-400 uppercase">({hotel.reviewCount} Ratings)</p>
                              </div>
                              <div className="flex flex-col items-center">
                                 <span className="text-[9px] font-black text-blue-600 uppercase tracking-tight mb-0.5">User Rating</span>
                                 <div className="bg-[#0041ab] text-white px-2 py-1 rounded-md text-sm font-black flex items-center justify-center min-w-[32px]">
                                    {hotel.reviewRating}
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="w-[210px] bg-[#f8f9ff] border-l border-gray-100 p-5 flex flex-col justify-between text-right">
                     <div className="flex flex-col gap-1">
                        <span className="bg-green-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-sm w-fit ml-auto uppercase tracking-tighter shadow-sm mb-2">Exclusive Deal</span>
                        <p className="text-[11px] font-bold text-gray-400 line-through">₹ {(parseInt(hotel.price.replace(/,/g, '')) * 1.2).toLocaleString()}</p>
                        <p className="text-3xl font-black text-gray-900 leading-tight">₹ {hotel.price}</p>
                        <p className="text-[10px] font-bold text-gray-500 uppercase">+ ₹ 840 TAXES & FEES</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase mt-0.5">Per Night</p>
                     </div>
                     
                     <div className="space-y-2 mt-4">
                        <button 
                           onClick={(e) => {
                             e.stopPropagation();
                             handleHotelClick(hotel.id);
                           }}
                           className="w-full bg-[#008cff] hover:bg-[#005cff] text-white py-2.5 rounded-lg font-black text-[11px] shadow-lg transition-all uppercase tracking-widest border-b-4 border-blue-800 active:border-b-0 active:translate-y-1"
                        >
                           Book Now
                        </button>
                        <p className="text-[9px] font-bold text-blue-600 text-center uppercase tracking-tighter opacity-80 cursor-pointer hover:underline underline-offset-2">Free Cancellation</p>
                     </div>
                  </div>
               </motion.div>
             ))
           ) : (
             <div className="py-40 text-center space-y-4">
                <p className="text-4xl text-gray-900">🏜️</p>
                <h3 className="text-2xl font-black text-gray-800 uppercase tracking-tighter">No properties found in "{city}"</h3>
                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Try searching for Udaipur, Jaisalmer or Manali (from our dataset)</p>
             </div>
           )}
        </main>
      </div>
    </div>
  );
}

export default function HotelResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
        <p className="font-black text-gray-400 uppercase tracking-widest text-sm">Searching properties...</p>
      </div>
    }>
      <HotelResultsContent />
    </Suspense>
  );
}
