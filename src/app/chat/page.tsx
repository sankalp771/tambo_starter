"use client";

import { MessageThreadFull } from "@/components/tambo/message-thread-full";

export default function Home() {
  return (
    <div className="h-screen">
      <MessageThreadFull className="max-w-4xl mx-auto" />
    </div>
  );
}
