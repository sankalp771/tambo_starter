"use client";

import { SearchTabs } from "@/components/mmt/SearchTabs";
import { MessageSquare, Globe, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";

const StarsBackground = () => {
  const [stars, setStars] = useState<{ top: string; left: string; width: string; height: string }[]>([]);

  useEffect(() => {
    const newStars = [...Array(50)].map(() => ({
      top: `${Math.random() * 80}%`,
      left: `${Math.random() * 100}%`,
      width: `${Math.random() * 2 + 1}px`,
      height: `${Math.random() * 2 + 1}px`,
    }));
    setStars(newStars);
  }, []);

  return (
    <>
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute bg-white rounded-full opacity-30"
          style={star}
        />
      ))}
    </>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 overflow-x-hidden">
      {/* Header / Hero Section */}
      <div className="relative h-[620px] bg-[#051322] overflow-hidden">
        {/* Subtle Background Elements representing the image */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-blue-900/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-black to-transparent"></div>
          {/* Simulated Northern Lights / Aurora effect */}
          <div className="absolute top-0 right-0 w-[800px] h-[400px] bg-blue-400/10 blur-[120px] rounded-full transform -rotate-45 -translate-y-20 translate-x-20"></div>
          <div className="absolute top-20 right-40 w-[600px] h-[300px] bg-purple-500/10 blur-[100px] rounded-full"></div>

          <StarsBackground />
        </div>

        <Header variant="dark" className="absolute top-0 left-0 w-full bg-transparent border-none shadow-none z-50 px-2 lg:px-4 max-w-[1240px] mx-auto right-0" />

        {/* Hero Main Content */}
        <div className="relative z-20 mt-20 max-w-[1240px] mx-auto px-4">
          {/* Hero Tagline */}
          <div className="max-w-[1000px] mt-12 mb-20 animate-in fade-in slide-in-from-bottom-5 duration-1000">
            <h1 className="text-white text-5xl md:text-[76px] font-serif italic leading-tight mb-8 tracking-tighter">
              Your journey, <span className="text-blue-400">simply easier.</span>
            </h1>
            <p className="text-white/70 text-xl md:text-2xl font-medium max-w-3xl leading-relaxed">
              MakeMyTrip platform powered by Tambo's <span className="text-blue-400/90 italic">cutting-edge</span> AI agents.
              Discover destinations, book stays, and explore the world through a
              single, intelligent conversation.
            </p>
          </div>
        </div>
      </div>

      {/* Floating Search Container - Overlapping the hero */}
      <div className="relative z-40 max-w-[1240px] mx-auto px-4 -mt-36">
        <SearchTabs />
      </div>

      {/* Sub Navigation Bar - MMT ICICI, MICE, etc */}
      <div className="max-w-[1240px] mx-auto mt-20 px-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2 flex items-center justify-between">
          <div className="flex items-center divide-x border-r mr-auto">
            <div className="px-6 py-2 flex items-center gap-3 cursor-pointer hover:text-blue-600 group">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100"><Globe className="w-4 h-4 text-blue-500" /></div>
              <div>
                <p className="text-xs font-bold leading-tight uppercase">Where2Go</p>
              </div>
            </div>
            <div className="px-6 py-2 flex items-center gap-3 cursor-pointer hover:text-blue-600 group">
              <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center group-hover:bg-orange-100"><MapPin className="w-4 h-4 text-orange-500" /></div>
              <div>
                <p className="text-xs font-bold leading-tight uppercase">How2Go <span className="text-[8px] bg-red-100 text-red-600 px-1 rounded ml-1">NEW</span></p>
                <p className="text-[10px] text-gray-500 font-medium">Find routes to anywhere</p>
              </div>
            </div>
            <div className="px-6 py-2 flex items-center gap-3 cursor-pointer hover:text-blue-600 group">
              <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center group-hover:bg-purple-100"><div className="text-blue-800 font-bold">ICICI</div></div>
              <div>
                <p className="text-xs font-bold leading-tight uppercase">MakeMyTrip ICICI Card</p>
                <p className="text-[10px] text-gray-500 font-medium">Big rewards & benefits</p>
              </div>
            </div>
          </div>

          {/* Fake Search Input for Chat */}
          <div
            className="flex-1 max-w-[320px] bg-gray-50 border border-blue-100 rounded-lg px-4 py-2 flex items-center justify-between cursor-pointer hover:border-blue-400 group transition-all"
          >
            <span className="text-sm text-gray-400 font-medium group-hover:text-blue-400">How can I help you today?</span>
            <div className="relative">
              <MessageSquare className="w-5 h-5 text-blue-500" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
            </div>
          </div>
        </div>
      </div>

      {/* Mid-Section Tagline */}
      <div className="max-w-[1240px] mx-auto mt-28 mb-16 px-4 text-center animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-300">
        <h2 className="text-gray-900 text-4xl md:text-5xl font-serif italic mb-6 leading-tight tracking-tight">
          Don't just travel. <span className="text-blue-600">Discover yours.</span>
        </h2>
        <p className="text-gray-500 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed opacity-70">
          Our intelligent agents sift through thousands of possibilities to find exactly what resonates with you.
          Personalized matches, real-time availability, and effortless orchestration.
        </p>
      </div>

      {/* Offers Section */}
      <div className="max-w-[1240px] mx-auto mt-12 px-4 pb-20">
        <div className="flex items-center justify-between mb-8 border-b pb-4">
          <h2 className="text-3xl font-black text-gray-800 tracking-tight">Offers For You</h2>
          <div className="flex gap-8">
            {["All Offers", "Bank Offers", "Flights", "Hotels", "Holidays"].map(offer => (
              <span key={offer} className="text-sm font-bold text-gray-500 cursor-pointer hover:text-blue-600 relative py-1 group">
                {offer}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform ${offer === "All Offers" ? "scale-x-100" : ""}`}></span>
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Grab up to 25% OFF* on Domestic Flights.", tag: "DOM FLIGHTS", desc: "Valid till 28th Feb" },
            { title: "Get FLAT 15% OFF* on International Stays.", tag: "INTL HOTELS", desc: "Limited time offer" },
            { title: "Special discounts for Senior Citizens.", tag: "SPECIAL FARE", desc: "Available on domestic routes" }
          ].map((offer, i) => (
            <div key={i} className="group bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex gap-5 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden relative">
              <div className="w-28 h-28 bg-gradient-to-tr from-blue-50 to-blue-100 rounded-xl flex-shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform">
                <div className="text-blue-600 font-black text-2xl">{i === 0 ? "25%" : i === 1 ? "15%" : "NEW"}</div>
              </div>
              <div className="flex flex-col justify-between py-1">
                <div>
                  <p className="text-[10px] text-gray-400 font-black tracking-widest uppercase mb-1">{offer.tag}</p>
                  <p className="font-extrabold text-gray-800 leading-tight group-hover:text-blue-600 transition-colors uppercase italic">{offer.title}</p>
                </div>
                <p className="text-[10px] text-gray-500 font-bold border-t pt-2 border-gray-50">{offer.desc}</p>
              </div>
              {/* Decorative blob */}
              <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-blue-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
