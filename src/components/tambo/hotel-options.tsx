"use client";

import { z } from "zod";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

export const hotelOptionsSchema = z.object({
  title: z.string().optional(),
  options: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      area: z.string(),
      city: z.string(),
      price: z.string(),
      reviewRating: z.number(),
      image: z.string().optional(),
      checkIn: z.string().optional(),
      checkOut: z.string().optional(),
    }),
  ),
  resultsPath: z.string().optional(),
});

export type HotelOptionsProps = z.infer<typeof hotelOptionsSchema>;

export function HotelOptions({ title, options, resultsPath }: HotelOptionsProps) {
  const handleNavigate = (path: string) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("tambo:navigate", { detail: { path } }));
    }
  };

  return (
    <div className="w-full">
      {title && (
        <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest mb-3">
          {title}
        </h3>
      )}
      <div className="grid grid-cols-1 gap-3">
        {options.map((hotel) => {
          const params = new URLSearchParams();
          if (hotel.checkIn) params.set("checkIn", hotel.checkIn);
          if (hotel.checkOut) params.set("checkOut", hotel.checkOut);
          const path = `/hotels/details/${hotel.id}?${params.toString()}`;
          return (
            <div
              key={hotel.id}
              className={cn(
                "border border-gray-200 rounded-xl p-3 bg-white shadow-sm",
                "hover:border-blue-400 transition-all",
              )}
            >
              <div className="flex gap-3">
                <div className="w-20 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  {hotel.image ? (
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-gray-100" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-black text-gray-900">{hotel.name}</p>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                        {hotel.area}, {hotel.city}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-blue-600 text-xs font-black">
                      <Star className="w-3 h-3 fill-blue-600" /> {hotel.reviewRating}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-sm font-black text-gray-900">₹ {hotel.price}</p>
                    <button
                      onClick={() => handleNavigate(path)}
                      className="text-[10px] font-black uppercase tracking-widest bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {resultsPath && (
        <button
          onClick={() => handleNavigate(resultsPath)}
          className="mt-3 text-[10px] font-black uppercase tracking-widest text-blue-600 hover:underline"
        >
          View all results
        </button>
      )}
    </div>
  );
}
