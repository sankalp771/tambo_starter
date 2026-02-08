"use client";

import { HotelSearchCard } from "@/components/mmt/hotels/HotelSearchCard";
import { Navbar } from "@/components/layout/Navbar";
import { Header } from "@/components/layout/Header";
import { motion } from "framer-motion";

export default function Hotels() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header variant="dark" className="absolute top-0 left-0 w-full bg-transparent border-none shadow-none z-50 px-2 lg:px-4 max-w-[1240px] mx-auto right-0" />

      <section className="bg-[#051322] min-h-[450px] pt-10 px-20 relative overflow-hidden">
        {/* Northern Lights effect from Home page */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-blue-900/30 to-transparent"></div>
          <div className="absolute top-0 right-0 w-[800px] h-[400px] bg-blue-400/10 blur-[120px] rounded-full transform -rotate-45 -translate-y-20 translate-x-20"></div>
          <div className="absolute top-20 right-40 w-[600px] h-[300px] bg-purple-500/10 blur-[100px] rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <Navbar />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05 }}
          >
            <HotelSearchCard />
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-gray-800 mb-8 uppercase tracking-tighter">Handpicked Collections for You</h2>
          <div className="grid grid-cols-4 gap-6">
            {[
              { title: "Beachside Resorts", count: "140+ Properties", img: "🏖️" },
              { title: "Luxury Stays", count: "80+ Properties", img: "💎" },
              { title: "Heritage Hotels", count: "45+ Properties", img: "🏰" },
              { title: "Pet Friendly", count: "60+ Properties", img: "🐾" }
            ].map((item) => (
              <div key={item.title} className="group cursor-pointer">
                <div className="aspect-[4/5] bg-gray-100 rounded-2xl mb-4 overflow-hidden relative border border-gray-100 shadow-sm group-hover:shadow-lg transition-all">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center text-6xl grayscale opacity-20">{item.img}</div>
                  <div className="absolute bottom-6 left-6">
                    <h4 className="text-white font-black text-lg uppercase tracking-tight">{item.title}</h4>
                    <p className="text-blue-200 text-xs font-bold uppercase tracking-widest">{item.count}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-20 bg-gray-900 text-white px-20 border-t border-gray-800">
        <div className="max-w-7xl mx-auto flex justify-between items-start">
          <div className="flex flex-col gap-4">
            <div className="text-white font-black text-2xl tracking-tighter italic uppercase">
              MAKEMYTRIP
            </div>
            <p className="text-gray-400 text-sm max-w-sm">
              Cloning the world's most trusted travel booking platform UI for AI orchestration demonstration.
            </p>
          </div>
          <div className="flex gap-20">
            <div className="flex flex-col gap-2">
              <h4 className="font-bold mb-2 uppercase tracking-widest text-xs">Product</h4>
              <a href="#" className="text-gray-400 text-xs hover:text-white font-bold uppercase">Flights</a>
              <a href="#" className="text-gray-400 text-xs hover:text-white font-bold uppercase">Hotels</a>
              <a href="#" className="text-gray-400 text-xs hover:text-white font-bold uppercase">Trains</a>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="font-bold mb-2 uppercase tracking-widest text-xs">Company</h4>
              <h4 className="text-gray-400 text-xs hover:text-white font-bold uppercase cursor-pointer">About Us</h4>
              <h4 className="text-gray-400 text-xs hover:text-white font-bold uppercase cursor-pointer">Careers</h4>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-gray-800 text-center text-gray-500 text-[10px] font-bold uppercase tracking-widest">
          © 2026 MakeMyTrip Clone - Built for AI Co-Pilot Demo
        </div>
      </footer>
    </div>
  );
}
