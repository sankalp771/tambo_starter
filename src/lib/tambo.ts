/**
 * @file tambo.ts
 * @description Central configuration file for Tambo components and tools
 */

import { Graph, graphSchema } from "@/components/tambo/graph";
import { DataCard, dataCardSchema } from "@/components/ui/card-data";
import { FlightSearch, flightSearchSchema } from "@/components/mmt/FlightSearch";
import { SearchHeader } from "@/components/mmt/SearchHeader";
import { FlightResults } from "@/components/mmt/FlightResults";
import { FlightFilters } from "@/components/mmt/FlightFilters";
import { HotelSearchCard } from "@/components/mmt/hotels/HotelSearchCard";
import { HotelOptions, hotelOptionsSchema } from "@/components/tambo/hotel-options";
import rawFlightsData from "@/lib/data/flights_data.json";
const flightsData = Array.isArray(rawFlightsData) ? rawFlightsData : (rawFlightsData as any).flights || [];
import hotelsData from "@/lib/data/hotels.json";
import {
  getCountryPopulations,
  getGlobalPopulationTrend,
} from "@/services/population-stats";
import type { TamboComponent } from "@tambo-ai/react";
import { TamboTool, withInteractable, defineTool } from "@tambo-ai/react";
import { z } from "zod";
import { HotelSearchSchema } from "@/lib/schemas/hotel";

// ============================================
// TOOLS
// ============================================

const searchFlights = defineTool({
  name: "searchFlights",
  description: "Search for available flights. ALSO UPDATES THE URL to show results on the page.",
  inputSchema: z.object({
    from: z.string(),
    to: z.string(),
    date: z.string(),
  }),
  outputSchema: z.array(z.object({
    id: z.string(),
    airline: z.string(),
    price: z.string(),
    time: z.string(),
    departure: z.string(),
    arrival: z.string(),
    from: z.string(),
    to: z.string(),
    duration: z.string(),
    flightNumber: z.string(),
    logo: z.string().optional()
  })),
  tool: async (input) => {
    const matchesCity = (inputVal: string, code: string, city: string) => {
      const normalizedInput = inputVal.toLowerCase().trim();
      const normalizedCode = code.toLowerCase();
      const normalizedCity = city.toLowerCase();
      return normalizedCode === normalizedInput ||
        normalizedCity.includes(normalizedInput) ||
        normalizedInput.includes(normalizedCity);
    };

    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set("from", input.from);
      url.searchParams.set("to", input.to);
      url.searchParams.set("date", input.date);
      window.history.pushState({}, '', url.toString());
    }
    const results = flightsData.filter(f =>
      matchesCity(input.from, f.from, f.fromCity) &&
      matchesCity(input.to, f.to, f.toCity) &&
      f.date === input.date
    );
    return results.map(f => ({
      id: f.id,
      airline: f.airline,
      price: `₹ ${parseInt(f.price).toLocaleString()}`,
      time: `${f.departure} - ${f.arrival}`,
      departure: f.departure,
      arrival: f.arrival,
      from: f.from,
      to: f.to,
      duration: f.duration,
      flightNumber: f.flightNumber,
      logo: f.logo
    }));
  }
});

const navigateTo = defineTool({
  name: "navigate_to",
  description: "Navigate to a specific path in the application. Use this to move users to different pages like /hotels, /flights, /hotels/results, etc.",
  inputSchema: z.object({
    path: z.string().describe("The URL path to navigate to (e.g., '/hotels', '/flights', '/hotels/results')"),
  }),
  outputSchema: z.object({ success: z.boolean(), message: z.string() }),
  tool: async ({ path }) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent("tambo:navigate", { detail: { path } }));
      return { success: true, message: `Navigating to ${path}` };
    }
    return { success: false, message: "Window not defined" };
  }
});

const navigateToHotelCatalog = defineTool({
  name: "navigate_to_hotel_catalog",
  description: "Navigate to the hotel search results page with optional filters like city, priceRange, starRating, etc.",
  inputSchema: z.object({
    city: z.string().optional(),
    checkIn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    checkOut: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    starRating: z.number().min(1).max(5).optional(),
    priceRange: z.enum(["₹0 - ₹2000", "₹2000 - ₹5000", "₹5000 - ₹10000", "₹10000+"]).optional(),
    minUserRating: z.number().optional(),
  }),
  outputSchema: z.object({ success: z.boolean(), message: z.string() }),
  tool: async (input) => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams();
      if (input.city) params.set("city", input.city);
      if (input.checkIn) params.set("checkIn", input.checkIn);
      if (input.checkOut) params.set("checkOut", input.checkOut);
      if (input.starRating) params.set("starRating", String(input.starRating));
      if (input.priceRange) params.set("priceRange", input.priceRange);
      if (input.minUserRating) params.set("minUserRating", String(input.minUserRating));
      
      const path = `/hotels/results?${params.toString()}`;
      window.dispatchEvent(new CustomEvent("tambo:navigate", { detail: { path } }));
      return { success: true, message: `Navigating to ${path}` };
    }
    return { success: false, message: "Window not defined" };
  }
});

const navigateToHotelDetails = defineTool({
  name: "navigate_to_hotel_details",
  description: "Navigate to a specific hotel's details page.",
  inputSchema: z.object({
    hotelId: z.string(),
    checkIn: z.string().optional(),
    checkOut: z.string().optional(),
  }),
  outputSchema: z.object({ success: z.boolean(), message: z.string() }),
  tool: async (input) => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams();
      if (input.checkIn) params.set("checkIn", input.checkIn);
      if (input.checkOut) params.set("checkOut", input.checkOut);
      const path = `/hotels/details/${input.hotelId}?${params.toString()}`;
      window.dispatchEvent(new CustomEvent("tambo:navigate", { detail: { path } }));
      return { success: true, message: `Navigating to ${path}` };
    }
    return { success: false, message: "Window not defined" };
  }
});

const startHotelFlow = defineTool({
  name: "start_hotel_flow",
  description:
    "Start the hotel booking flow. If required info (city, check-in, check-out) is missing, navigate to /hotels to gather details. Otherwise go directly to results.",
  inputSchema: z.object({
    city: z.string().optional(),
    checkIn: z.string().optional(),
    checkOut: z.string().optional(),
    rooms: z
      .array(
        z.object({
          adults: z.number().min(1).max(4),
          children: z.number().min(0).max(3),
        }),
      )
      .optional(),
  }),
  outputSchema: z.object({ success: z.boolean(), message: z.string() }),
  tool: async (input) => {
    if (typeof window !== "undefined") {
      const hasRequired =
        Boolean(input.city) && Boolean(input.checkIn) && Boolean(input.checkOut);
      if (!hasRequired) {
        window.dispatchEvent(
          new CustomEvent("tambo:navigate", { detail: { path: "/hotels" } }),
        );
        return {
          success: true,
          message: "Missing required info. Redirecting to /hotels.",
        };
      }
      const params = new URLSearchParams();
      params.set("city", input.city ?? "");
      params.set("checkIn", input.checkIn ?? "");
      params.set("checkOut", input.checkOut ?? "");
      if (input.rooms) params.set("rooms", JSON.stringify(input.rooms));
      const path = `/hotels/results?${params.toString()}`;
      window.dispatchEvent(new CustomEvent("tambo:navigate", { detail: { path } }));
      return { success: true, message: `Navigating to ${path}` };
    }
    return { success: false, message: "Window not defined" };
  },
});

const bookHotelByName = defineTool({
  name: "book_hotel_by_name",
  description:
    "Navigate to a hotel's details page by matching a hotel name from the dataset. If multiple matches, return a message listing the options.",
  inputSchema: z.object({
    name: z.string().min(1),
    city: z.string().optional(),
    checkIn: z.string().optional(),
    checkOut: z.string().optional(),
  }),
  outputSchema: z.object({
    success: z.boolean(),
    message: z.string(),
    options: z
      .array(
        z.object({
          id: z.string(),
          name: z.string(),
          area: z.string(),
          city: z.string(),
          price: z.string(),
          reviewRating: z.number(),
          image: z.string().optional(),
        }),
      )
      .optional(),
    resultsPath: z.string().optional(),
  }),
  tool: async (input) => {
    if (typeof window === "undefined") {
      return { success: false, message: "Window not defined" };
    }

    const nameQuery = input.name.toLowerCase().trim();
    const params = new URLSearchParams(window.location.search);
    const city = (input.city || params.get("city") || "").toLowerCase().trim();
    const checkIn = input.checkIn || params.get("checkIn") || "";
    const checkOut = input.checkOut || params.get("checkOut") || "";

    const filtered = (hotelsData as any[])
      .filter((h) => {
        const name = String(h.name || "").toLowerCase();
        const cityMatch = city ? String(h.city || "").toLowerCase().includes(city) : true;
        return cityMatch && name.includes(nameQuery);
      })
      .slice(0, 5);

    if (filtered.length === 0) {
      return {
        success: false,
        message: `No hotel matched "${input.name}". Try another name from the list.`,
      };
    }

    if (filtered.length > 1) {
      const options = filtered.map((h) => ({
        id: String(h.id),
        name: String(h.name),
        area: String(h.area),
        city: String(h.city),
        price: String(h.price),
        reviewRating: Number(h.reviewRating ?? 0),
        image: Array.isArray(h.images) ? h.images[0] : undefined,
      }));
      const resultsPath = params.toString()
        ? `/hotels/results?${params.toString()}`
        : "/hotels/results";
      return {
        success: false,
        message: `Multiple matches found for "${input.name}". Please confirm which one you want.`,
        options,
        resultsPath,
      };
    }

    const hotel = filtered[0];
    const query = new URLSearchParams();
    if (checkIn) query.set("checkIn", checkIn);
    if (checkOut) query.set("checkOut", checkOut);
    const path = `/hotels/details/${hotel.id}?${query.toString()}`;
    window.dispatchEvent(new CustomEvent("tambo:navigate", { detail: { path } }));
    return { success: true, message: `Navigating to ${hotel.name}` };
  },
});

export const tools: TamboTool[] = [
  {
    name: "countryPopulation",
    description: "A tool to get population statistics by country",
    tool: getCountryPopulations,
    inputSchema: z.object({ continent: z.string().optional(), sortBy: z.enum(["population", "growthRate"]).optional(), limit: z.number().optional() }),
    outputSchema: z.any()
  },
  {
    name: "globalPopulation",
    description: "A tool to get global population trends",
    tool: getGlobalPopulationTrend,
    inputSchema: z.object({ startYear: z.number().optional() }),
    outputSchema: z.any()
  },
  navigateTo,
  navigateToHotelCatalog,
  navigateToHotelDetails,
  startHotelFlow,
  bookHotelByName,
  {
    name: "searchFlights",
    description: "Search for available flights. ALSO UPDATES THE URL to show results on the page.",
    tool: async (input: { from: string; to: string; date: string; travellers?: number }) => {
      const matchesCity = (inputVal: string, code: string, city: string) => {
        const normalizedInput = inputVal.toLowerCase().trim();
        const normalizedCode = code.toLowerCase();
        const normalizedCity = city.toLowerCase();
        return normalizedCode === normalizedInput ||
          normalizedCity.includes(normalizedInput) ||
          normalizedInput.includes(normalizedCity);
      };

      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        url.searchParams.set("from", input.from);
        url.searchParams.set("to", input.to);
        url.searchParams.set("date", input.date);
        if (input.travellers) url.searchParams.set("travellers", input.travellers.toString());
        window.history.pushState({}, '', url.toString());
      }

      const results = flightsData.filter((f: any) =>
        matchesCity(input.from, f.from, f.fromCity) &&
        matchesCity(input.to, f.to, f.toCity) &&
        f.date === input.date
      );
      return results.map((f: any) => ({
        id: f.id,
        airline: f.airline,
        price: `₹ ${parseInt(f.price).toLocaleString()}`,
        time: `${f.departure} - ${f.arrival}`,
        departure: f.departure,
        arrival: f.arrival,
        from: f.from,
        to: f.to,
        duration: f.duration,
        flightNumber: f.flightNumber,
        logo: f.logo
      }));
    },
    inputSchema: z.object({
      from: z.string(),
      to: z.string(),
      date: z.string(),
      travellers: z.number().optional(),
    }),
    outputSchema: z.array(z.object({
      id: z.string(),
      airline: z.string(),
      price: z.string(),
      time: z.string(),
      departure: z.string(),
      arrival: z.string(),
      from: z.string(),
      to: z.string(),
      duration: z.string(),
      flightNumber: z.string(),
      logo: z.string().optional()
    })),
  },
  {
    name: "bookFlight",
    description: "NAVIGATE to the checkout page for a specific flight.",
    tool: async (input: {
      id: string; airline: string; price: string;
      departure: string; arrival: string; from: string;
      to: string; logo: string;
    }) => {
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams({
          id: input.id, airline: input.airline,
          price: input.price.replace('₹ ', '').replace(',', ''),
          departure: input.departure, arrival: input.arrival,
          from: input.from, to: input.to, logo: input.logo
        });

        // Dispatch custom event for client-side navigation
        const navigateEvent = new CustomEvent('tambo:navigate', {
          detail: { url: `/checkout?${params.toString()}` }
        });
        window.dispatchEvent(navigateEvent);
      }
      return { success: true };
    },
    inputSchema: z.object({
      id: z.string(), airline: z.string(), price: z.string(),
      departure: z.string(), arrival: z.string(), from: z.string(),
      to: z.string(), logo: z.string()
    }),
    outputSchema: z.object({ success: z.boolean() })
  },
  // Add more tools here
];

// ============================================
// COMPONENTS
// ============================================

const InteractableHotelSearchCard = withInteractable(HotelSearchCard, {
  componentName: "HotelSearchCard",
  description: "Interactive hotel search form for city and dates.",
  propsSchema: HotelSearchSchema.partial(),
});

export const components: TamboComponent[] = [
  {
    name: "Graph",
    description: "Renders various types of charts using Recharts.",
    component: Graph,
    propsSchema: graphSchema,
  },
  {
    name: "DataCard",
    description: "Displays options as clickable cards.",
    component: DataCard,
    propsSchema: dataCardSchema,
  },
  {
    name: "FlightSearch",
    description: "Flight search component.",
    component: FlightSearch,
    propsSchema: flightSearchSchema,
  },
  {
    name: "HotelSearchCard",
    description: "Interactive hotel search form.",
    component: InteractableHotelSearchCard,
    propsSchema: HotelSearchSchema.partial(),
  },
  {
    name: "HotelOptions",
    description:
      "Shows a short list of matching hotels so the user can pick one to view details.",
    component: HotelOptions,
    propsSchema: hotelOptionsSchema,
  }
];
