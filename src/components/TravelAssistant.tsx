"use client";

import { MessageSquare, X } from "lucide-react";
import { useState } from "react";
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
                <div className="bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] w-[420px] h-[640px] flex flex-col overflow-hidden border border-blue-100 transform animate-in fade-in slide-in-from-bottom-5 duration-300">
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

                    <div className="flex-1 bg-white flex flex-col min-h-0 relative">
                        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 to-white pointer-events-none"></div>
                        <ScrollableMessageContainer className="flex-1 p-6 relative z-10">
                            <ThreadContent variant="default">
                                <div className="mb-6 p-5 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl text-xs text-white leading-relaxed font-bold shadow-md shadow-blue-100 relative overflow-hidden group">
                                    👋 <b>Welcome to MakeMyTrip!</b> I'm your AI travel assistant. I can help you find flights, pick seats, or answer questions about your booking.
                                </div>
                                <ThreadContentMessages />
                            </ThreadContent>
                        </ScrollableMessageContainer>
                    </div>

                    <div className="p-4 border-t bg-white relative z-10">
                        <MessageInput variant="bordered">
                            <MessageInputTextarea
                                placeholder="Where would you like to go?"
                                className="text-sm min-h-[44px] !bg-gray-50 border-gray-100 focus:border-blue-400 py-3 px-4 rounded-xl"
                            />
                            <MessageInputToolbar>
                                <div className="flex-1"></div>
                                <MessageInputSubmitButton className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-xl p-2.5 transition-all shadow-md shadow-blue-200" />
                            </MessageInputToolbar>
                        </MessageInput>
                    </div>
                </div>
            )}
        </div>
    );
}
