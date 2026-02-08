import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateLabel(dateStr: string): string {
  if (!dateStr) return dateStr;
  const isoMatch = /^\d{4}-\d{2}-\d{2}$/.test(dateStr);
  const parsed = isoMatch ? new Date(`${dateStr}T00:00:00`) : new Date(dateStr);
  if (Number.isNaN(parsed.getTime())) return dateStr;
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(parsed);
}

export function parseRoomsParam(roomsParam: string | null): {
  rooms: number;
  adults: number;
  children: number;
} {
  if (!roomsParam) {
    return { rooms: 1, adults: 2, children: 0 };
  }
  try {
    const parsed = JSON.parse(roomsParam);
    if (!Array.isArray(parsed)) return { rooms: 1, adults: 2, children: 0 };
    const totals = parsed.reduce(
      (acc, room) => {
        const adults = typeof room?.adults === "number" ? room.adults : 0;
        const children = typeof room?.children === "number" ? room.children : 0;
        return {
          rooms: acc.rooms + 1,
          adults: acc.adults + adults,
          children: acc.children + children,
        };
      },
      { rooms: 0, adults: 0, children: 0 },
    );
    if (totals.rooms === 0) return { rooms: 1, adults: 2, children: 0 };
    return totals;
  } catch {
    return { rooms: 1, adults: 2, children: 0 };
  }
}
