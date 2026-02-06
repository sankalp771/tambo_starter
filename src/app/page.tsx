"use client";

import { FlightSearch } from "@/components/mmt/FlightSearch";
import {
  MessageInput,
  MessageInputSubmitButton,
  MessageInputTextarea,
  MessageInputToolbar
} from "@/components/tambo/message-input";
import { ScrollableMessageContainer } from "@/components/tambo/scrollable-message-container";
import {
  ThreadContent,
  ThreadContentMessages
} from "@/components/tambo/thread-content";
import { components, tools } from "@/lib/tambo";
import { TamboProvider } from "@tambo-ai/react";
import { MessageSquare, X, ChevronDown, Globe, MapPin } from "lucide-react";
import { useState, useEffect } from "react";

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
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <TamboProvider
      apiKey={process.env.NEXT_PUBLIC_TAMBO_API_KEY!}
      components={components}
      tools={tools}
      tamboUrl={process.env.NEXT_PUBLIC_TAMBO_URL}
    >
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

          {/* Navigation */}
          <nav className="relative z-30 mx-auto max-w-[1240px] flex items-center justify-between px-4 py-3">
            <div className="flex items-center">
              <div className="flex items-center gap-1.5 cursor-pointer">
                <div className="bg-white p-1.5 rounded-sm">
                  <div className="w-5 h-5 bg-[#e01e26] rounded-sm flex items-center justify-center text-[10px] font-black text-white italic">my</div>
                </div>
                <div className="text-white text-2xl font-black italic tracking-tighter">make <span className="text-blue-400">my</span> trip</div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="hidden lg:flex items-center gap-5 text-[11px] font-bold text-white uppercase tracking-tight">
                <div className="flex items-center gap-2 cursor-pointer opacity-80 hover:opacity-100">
                  <span className="text-orange-400">🏡</span> List Your Property
                </div>
                <div className="flex items-center gap-2 cursor-pointer opacity-80 hover:opacity-100">
                  <span className="text-blue-400">💼</span> myBiz <span className="text-[7px] bg-white/20 px-1 rounded ml-1">NEW</span>
                </div>
                <div className="flex items-center gap-2 cursor-pointer opacity-80 hover:opacity-100 border-l border-white/20 pl-5">
                  <span className="text-red-400">❤️</span> Wishlist
                </div>
                <div className="flex items-center gap-2 cursor-pointer opacity-80 hover:opacity-100">
                  <span className="text-yellow-400">🎒</span> My Trips
                </div>
              </div>

              <div className="flex items-center bg-blue-500/10 border border-blue-400/20 rounded-md px-3 py-2 cursor-pointer hover:bg-blue-500/20 transition-all ml-4">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-300 to-blue-600 flex items-center justify-center text-[10px] text-white font-bold mr-2 shadow-inner">👤</div>
                <div className="text-white text-[11px] font-black uppercase">Login or Create Account <ChevronDown className="inline w-3 h-3 ml-1" /></div>
              </div>

              <div className="flex items-center gap-3 border-l border-white/20 pl-6 ml-4">
                <div className="flex items-center gap-1.5 text-white text-[11px] font-bold uppercase cursor-pointer">
                  <Globe className="w-4 h-4 text-green-400" /> INR <ChevronDown className="w-3 h-3" />
                </div>
              </div>
            </div>
          </nav>

          {/* Hero Main Content */}
          <div className="relative z-20 mt-20 max-w-[1240px] mx-auto px-4">
            {/* The FlightSearch component is positioned here, overlapping the bottom */}
            <div className="flex items-end justify-between mb-2">
              <div className="text-white/40 text-xs font-medium uppercase tracking-[3px]">Travel Bliss Awaits</div>
              <div className="text-white/60 text-xs font-bold flex items-center gap-2">
                Book International and Domestic Flights <MapPin className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>

        {/* Floating Search Container - Overlapping the hero */}
        <div className="relative z-40 max-w-[1240px] mx-auto px-4 -mt-36">
          <FlightSearch />
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
                  <p className="text-xs font-bold leading-tight uppercase">MakeMyTrip ICICI Credit Card</p>
                  <p className="text-[10px] text-gray-500 font-medium">Never-expring rewards & big benefits</p>
                </div>
              </div>
            </div>

            {/* Fake Search Input for Chat */}
            <div
              onClick={() => setIsChatOpen(true)}
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

        {/* Floating Chat Widget */}
        <div className="fixed bottom-8 right-8 z-[100]">
          {!isChatOpen ? (
            <button
              onClick={() => setIsChatOpen(true)}
              className="group bg-white border border-blue-100 text-blue-600 p-1.5 rounded-full shadow-2xl hover:bg-blue-600 hover:text-white transition-all flex items-center relative overflow-hidden"
            >
              <div className="bg-blue-600 text-white p-3 rounded-full group-hover:bg-white group-hover:text-blue-600 transition-colors">
                <MessageSquare className="w-6 h-6" />
              </div>
              <span className="font-black italic uppercase text-sm mx-4 mr-6">Chat with MMT AI</span>
              {/* Notification Badge */}
              <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 border-2 border-white rounded-full"></span>
            </button>
          ) : (
            <div className="bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] w-[420px] h-[640px] flex flex-col overflow-hidden border border-blue-100 transform animate-in fade-in slide-in-from-bottom-5 duration-300">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-[#051322] to-[#1a3a5a] p-5 text-white flex justify-between items-center relative overflow-hidden shadow-lg">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                <div className="flex items-center gap-4 relative z-10">
                  <div className="relative">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg border border-white/20">
                      <div className="text-[#008cff] font-black italic text-xl">my</div>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-[#051322] rounded-full shadow-sm"></div>
                  </div>
                  <div>
                    <h3 className="font-extrabold italic uppercase tracking-wider text-xs">MMT Travel AI</h3>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_green]"></div>
                      <p className="text-[9px] uppercase font-black text-blue-300 tracking-widest">Always Online</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="hover:bg-white/10 p-2 rounded-xl transition-all hover:scale-110 active:scale-90 relative z-10"
                >
                  <X className="w-5 h-5 text-white/80" />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 bg-white flex flex-col min-h-0 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 to-white pointer-events-none"></div>
                <ScrollableMessageContainer className="flex-1 p-6 relative z-10">
                  <ThreadContent variant="default">
                    <div className="mb-6 p-5 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl text-xs text-white leading-relaxed font-bold shadow-md shadow-blue-100 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-1 opacity-20 group-hover:scale-150 transition-transform">✨</div>
                      👋 Welcome to MakeMyTrip AI! I can find flights, book hotels, and even update the form on the left for you.
                      <div className="mt-2 text-[10px] text-blue-100 font-medium">Try asking: "Show me flights from Delhi to Mumbai"</div>
                    </div>
                    <ThreadContentMessages />
                  </ThreadContent>
                </ScrollableMessageContainer>
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t bg-white relative z-10">
                <MessageInput variant="bordered">
                  <MessageInputTextarea
                    placeholder="Type your travel plan..."
                    className="text-sm min-h-[44px] !bg-gray-50 border-gray-100 focus:border-blue-400 transition-all py-3 px-4 rounded-xl"
                  />
                  <MessageInputToolbar>
                    <div className="flex-1"></div>
                    <MessageInputSubmitButton className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-xl p-2.5 transition-all shadow-md shadow-blue-200" />
                  </MessageInputToolbar>
                </MessageInput>
                <p className="mt-2 text-[8px] text-center text-gray-400 font-black uppercase tracking-[0.2em]">
                  Powered by Tambo AI SDK
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </TamboProvider>
  );
}
