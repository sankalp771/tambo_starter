"use client";

import { MessageSquare, X } from "lucide-react";
import { useState } from "react";
import {
  MessageInput,
  MessageInputSubmitButton,
  MessageInputTextarea,
  MessageInputToolbar,
} from "@/components/tambo/message-input";
import { ScrollableMessageContainer } from "@/components/tambo/scrollable-message-container";
import { ThreadContent, ThreadContentMessages } from "@/components/tambo/thread-content";

export function TravelAssistant() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      {!isChatOpen ? (
        <button
          onClick={() => setIsChatOpen(true)}
          className="group bg-white border border-blue-100 text-blue-600 p-1.5 rounded-full shadow-2xl hover:bg-blue-600 hover:text-white transition-all flex items-center relative overflow-hidden"
        >
          <div className="bg-blue-600 text-white p-3 rounded-full group-hover:bg-white group-hover:text-blue-600 transition-colors">
            <MessageSquare className="w-6 h-6" />
          </div>
          <span className="font-black italic uppercase text-sm mx-4 mr-6">Ask MMT AI</span>
          <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 border-2 border-white rounded-full"></span>
        </button>
      ) : (
        <div className="bg-white rounded-3xl shadow-[0_30px_80px_-30px_rgba(15,23,42,0.45)] w-[420px] h-[640px] max-h-[calc(100dvh-120px)] flex flex-col overflow-hidden border border-blue-100/60 transform animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="bg-gradient-to-r from-[#0b1024] via-[#0f1f3a] to-[#173b66] p-5 text-white flex justify-between items-center relative overflow-hidden shadow-xl">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute -top-6 -right-10 w-40 h-40 bg-cyan-400/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-52 h-52 bg-blue-500/20 rounded-full blur-3xl"></div>
            </div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="relative">
                <div className="w-12 h-12 bg-white/90 rounded-2xl flex items-center justify-center shadow-lg border border-white/30">
                  <div className="text-[#008cff] font-black italic text-xl">my</div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-[#0b1024] rounded-full shadow-sm"></div>
              </div>
              <div>
                <h3 className="font-extrabold italic uppercase tracking-wider text-xs">MMT Travel AI</h3>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_6px_rgba(16,185,129,0.8)]"></div>
                  <p className="text-[9px] uppercase font-black text-blue-200 tracking-widest">Live Concierge</p>
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

          <div className="flex-1 bg-white flex flex-col min-h-0 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50/40 via-white to-white pointer-events-none"></div>
            <ScrollableMessageContainer className="flex-1 p-6 relative z-10">
              <ThreadContent variant="default">
                <div className="mb-6 p-5 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl text-xs text-white leading-relaxed font-bold shadow-md shadow-blue-200/60 relative overflow-hidden group">
                 <b>Welcome to MakeMyTrip!</b> I'm your AI travel assistant. I can help you find flights, pick seats, or answer questions about your booking.
                </div>
                <ThreadContentMessages />
              </ThreadContent>
            </ScrollableMessageContainer>
          </div>

          <div className="p-4 border-t bg-white/85 backdrop-blur relative z-10">
            <MessageInput variant="bordered">
              <MessageInputTextarea
                placeholder="Where would you like to go?"
                className="text-sm min-h-[52px] !bg-white border-gray-200 focus:border-blue-500 py-3.5 px-4 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]"
              />
              <MessageInputToolbar>
                <div className="flex-1"></div>
                <MessageInputSubmitButton className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-2xl p-2.5 transition-all shadow-lg shadow-blue-200/70" />
              </MessageInputToolbar>
            </MessageInput>
          </div>
        </div>
      )}
    </div>
  );
}
