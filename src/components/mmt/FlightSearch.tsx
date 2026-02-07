"use client";

import { withInteractable } from "@tambo-ai/react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Search, PlaneTakeoff, PlaneLanding, Calendar, Users, ChevronDown } from "lucide-react";
import Link from "next/link";

export const flightSearchSchema = z.object({
  fromCity: z.string(),
  toCity: z.string(),
  departureDate: z.string(),
  travellers: z.number(),
  travelClass: z.enum(["Economy/Premium Economy", "Premium Economy", "Business", "First Class"]),
  tripType: z.enum(["One Way", "Round Trip", "Multi City"]),
});

type FlightSearchProps = z.infer<typeof flightSearchSchema>;

function FlightSearchBase(props: FlightSearchProps) {
  const [data, setData] = useState<FlightSearchProps>(props);
  const [isSyncing, setIsSyncing] = useState(false);

  // Sync state when AI updates props
  useEffect(() => {
    // Only show syncing animation if values actually changed
    if (JSON.stringify(props) !== JSON.stringify(data)) {
      setData(props);
      setIsSyncing(true);

      // Auto-trigger search when AI updates the interactable props
      const timer = setTimeout(() => {
        setIsSyncing(false);
        if (typeof window !== 'undefined') {
          const from = props.fromCity.split(',')[0].trim();
          const to = props.toCity.split(',')[0].trim();
          window.location.href = `/flights?from=${from}&to=${to}&date=${props.departureDate}&travellers=${props.travellers}&class=${props.travelClass}`;
        }
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [props]);

  const updateField = (field: keyof FlightSearchProps, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className={`bg-white rounded-xl shadow-2xl p-6 -mt-24 relative z-50 border transition-all duration-700 ${isSyncing ? "border-blue-500 ring-8 ring-blue-50/50 shadow-blue-200" : "border-gray-100"}`}>
      {isSyncing && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black animate-bounce flex items-center gap-2 shadow-lg uppercase tracking-widest z-[60]">
          ✨ Tambo AI is updating your search...
        </div>
      )}

      {/* Tabs */}
      <div className="flex justify-between items-center mb-6 pb-2 border-b">
        <div className="flex gap-8 overflow-x-auto pb-2 scrollbar-hide">
          {["Flights", "Hotels", "Homestays", "Holiday Packages", "Trains", "Buses", "Cabs", "Forex"].map((tab) => (
            <div key={tab} className={`cursor-pointer pb-2 font-black text-xs uppercase tracking-tighter ${tab === "Flights" ? "text-blue-600 border-b-4 border-blue-600" : "text-gray-400 hover:text-gray-600"}`}>
              {tab}
            </div>
          ))}
        </div>
      </div>

      {/* Trip Type */}
      <div className="flex gap-8 mb-6">
        {["One Way", "Round Trip", "Multi City"].map((type) => (
          <label key={type} className="flex items-center gap-2 cursor-pointer group">
            <input
              type="radio"
              name="tripType"
              checked={data.tripType === type}
              onChange={() => updateField("tripType", type)}
              className="w-4 h-4 border-2 border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            <span className={`text-xs font-black uppercase tracking-tight transition-colors ${data.tripType === type ? "text-gray-900" : "text-gray-400 group-hover:text-gray-600"}`}>{type}</span>
          </label>
        ))}
      </div>

      {/* Search Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-5 border-2 border-gray-100 rounded-xl overflow-hidden divide-y md:divide-y-0 md:divide-x-2 divide-gray-100">
        <div className="p-4 hover:bg-blue-50 cursor-pointer transition-colors group relative flex flex-col min-w-0">
          <p className="text-[10px] text-blue-500 font-black mb-1 uppercase flex items-center gap-1.5 tracking-widest">
            <PlaneTakeoff className="w-3 h-3" /> From
          </p>
          <input
            type="text"
            value={data.fromCity}
            onChange={(e) => updateField("fromCity", e.target.value)}
            className="text-3xl font-black bg-transparent w-full focus:outline-none focus:text-blue-600 transition-colors uppercase placeholder:text-gray-200"
            placeholder="City"
          />
          <p className="text-[10px] text-gray-400 mt-1 font-bold truncate uppercase">
            {data.fromCity || "Select City"}
          </p>
        </div>

        <div className="p-4 hover:bg-blue-50 cursor-pointer transition-colors group relative flex flex-col min-w-0">
          <p className="text-[10px] text-blue-500 font-black mb-1 uppercase flex items-center gap-1.5 tracking-widest">
            <PlaneLanding className="w-3 h-3" /> To
          </p>
          <input
            type="text"
            value={data.toCity}
            onChange={(e) => updateField("toCity", e.target.value)}
            className="text-3xl font-black bg-transparent w-full focus:outline-none focus:text-blue-600 transition-colors uppercase placeholder:text-gray-200"
            placeholder="City"
          />
          <p className="text-[10px] text-gray-400 mt-1 font-bold truncate uppercase">
            {data.toCity || "Select City"}
          </p>

          <div className="absolute -right-5 top-1/2 -translate-y-1/2 z-20 bg-white border-2 border-gray-100 rounded-full p-2.5 shadow-md hover:scale-110 transition-transform hidden md:flex items-center justify-center text-blue-600">
            <Search className="w-4 h-4" />
          </div>
        </div>

        <div className="p-4 hover:bg-blue-50 cursor-pointer transition-colors group flex flex-col min-w-0">
          <p className="text-[10px] text-blue-500 font-black mb-1 uppercase flex items-center gap-1.5 tracking-widest">
            <Calendar className="w-3 h-3" /> Departure
          </p>
          <input
            type="text"
            value={data.departureDate}
            onChange={(e) => updateField("departureDate", e.target.value)}
            className="text-3xl font-black bg-transparent w-full focus:outline-none focus:text-blue-600 transition-colors uppercase"
          />
          <p className="text-[10px] text-gray-400 mt-1 font-bold uppercase italic">Select Date</p>
        </div>

        <div className="p-4 hover:bg-blue-50 cursor-pointer transition-colors opacity-40 flex flex-col justify-center min-w-0">
          <p className="text-[10px] text-gray-400 font-black mb-1 uppercase flex items-center gap-1.5 tracking-widest">
            <Calendar className="w-3 h-3" /> Return
          </p>
          <p className="text-sm text-gray-300 mt-1 font-black leading-tight uppercase italic">Add Return</p>
        </div>

        <div className="p-4 hover:bg-blue-50 cursor-pointer transition-colors group flex flex-col min-w-0">
          <p className="text-[10px] text-blue-500 font-black mb-1 uppercase flex items-center gap-1.5 tracking-widest">
            <Users className="w-3 h-3" /> Travellers
          </p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black">{data.travellers}</span>
            <span className="text-sm text-gray-500 font-black uppercase">Traveller</span>
          </div>
          <div className="relative mt-1">
            <select
              value={data.travelClass}
              onChange={(e) => updateField("travelClass", e.target.value)}
              className="appearance-none block w-full text-[10px] text-gray-600 font-black uppercase tracking-widest bg-transparent border-none p-0 focus:outline-none cursor-pointer pr-4"
            >
              <option>Economy/Premium Economy</option>
              <option>Business</option>
              <option>First Class</option>
            </select>
            <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Special Fares */}
      <div className="flex flex-wrap items-center gap-4 mt-8">
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mr-2">Special Fares:</span>
        {["Regular", "Student", "Senior Citizen", "Armed Forces", "Doctors"].map((fare) => (
          <div key={fare} className={`px-5 py-2 rounded-lg text-[10px] font-black transition-all cursor-pointer border-2 ${fare === "Regular" ? "bg-blue-50 border-blue-100 text-blue-600 shadow-sm shadow-blue-100" : "bg-white border-gray-50 text-gray-400 hover:border-gray-200"}`}>
            {fare.toUpperCase()}
          </div>
        ))}
      </div>

      {/* Search Button */}
      <div className="absolute -bottom-9 left-1/2 -translate-x-1/2">
        <Link
          href={`/flights?from=${data.fromCity.split(',')[0].trim()}&to=${data.toCity.split(',')[0].trim()}&date=${data.departureDate}&travellers=${data.travellers}&class=${data.travelClass}`}
          className="relative block group overflow-hidden bg-gradient-to-r from-[#008cff] to-[#0057ff] text-white px-24 py-5 rounded-full font-black text-3xl shadow-[0_15px_30px_-5px_rgba(37,99,235,0.4)] hover:shadow-[0_20px_40px_-5px_rgba(37,99,235,0.6)] hover:scale-105 active:scale-95 transition-all uppercase tracking-tighter italic text-center"
        >
          <span className="relative z-10">Search</span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        </Link>
      </div>
    </div>
  );
}

const InteractableFlightSearch = withInteractable(FlightSearchBase, {
  componentName: "FlightSearch",
  description: "A flight search component that allows users to select origin, destination, dates, and number of travellers.",
  propsSchema: flightSearchSchema,
});

export function FlightSearch() {
  return (
    <InteractableFlightSearch
      fromCity="Delhi, DEL"
      toCity="Mumbai, BOM"
      departureDate="2026-02-08"
      travellers={1}
      travelClass="Economy/Premium Economy"
      tripType="One Way"
      onPropsUpdate={(newProps) => {
        console.log("Flight search updated from Tambo:", newProps);
      }}
    />
  );
}
