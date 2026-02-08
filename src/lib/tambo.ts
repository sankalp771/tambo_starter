/**
 * @file tambo.ts
 * @description Central configuration file for Tambo components and tools
 *
 * This file serves as the central place to register your Tambo components and tools.
 * It exports arrays that will be used by the TamboProvider.
 *
 * Read more about Tambo at https://tambo.co/docs
 */

import { Graph, graphSchema } from "@/components/tambo/graph";
import { DataCard, dataCardSchema } from "@/components/ui/card-data";
import { FlightSearch, flightSearchSchema } from "@/components/mmt/FlightSearch";
import { SearchHeader } from "@/components/mmt/SearchHeader";
import { FlightResults } from "@/components/mmt/FlightResults";
import { FlightFilters } from "@/components/mmt/FlightFilters";
import rawFlightsData from "@/lib/data/flights_data.json";
const flightsData = Array.isArray(rawFlightsData) ? rawFlightsData : (rawFlightsData as any).flights || [];
import {
  getCountryPopulations,
  getGlobalPopulationTrend,
} from "@/services/population-stats";
import type { TamboComponent } from "@tambo-ai/react";
import { TamboTool } from "@tambo-ai/react";
import { z } from "zod";

/**
 * tools
 *
 * This array contains all the Tambo tools that are registered for use within the application.
 * Each tool is defined with its name, description, and expected props. The tools
 * can be controlled by AI to dynamically fetch data based on user interactions.
 */

export const tools: TamboTool[] = [
  {
    name: "countryPopulation",
    description:
      "A tool to get population statistics by country with advanced filtering options",
    tool: getCountryPopulations,
    inputSchema: z.object({
      continent: z.string().optional(),
      sortBy: z.enum(["population", "growthRate"]).optional(),
      limit: z.number().optional(),
      order: z.enum(["asc", "desc"]).optional(),
    }),
    outputSchema: z.array(
      z.object({
        countryCode: z.string(),
        countryName: z.string(),
        continent: z.enum([
          "Asia",
          "Africa",
          "Europe",
          "North America",
          "South America",
          "Oceania",
        ]),
        population: z.number(),
        year: z.number(),
        growthRate: z.number(),
      }),
    ),
  },
  {
    name: "globalPopulation",
    description:
      "A tool to get global population trends with optional year range filtering",
    tool: getGlobalPopulationTrend,
    inputSchema: z.object({
      startYear: z.number().optional(),
      endYear: z.number().optional(),
    }),
    outputSchema: z.array(
      z.object({
        year: z.number(),
        population: z.number(),
        growthRate: z.number(),
      }),
    ),
  },
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

/**
 * components
 *
 * This array contains all the Tambo components that are registered for use within the application.
 * Each component is defined with its name, description, and expected props. The components
 * can be controlled by AI to dynamically render UI elements based on user interactions.
 */
export const components: TamboComponent[] = [
  {
    name: "Graph",
    description:
      "A component that renders various types of charts (bar, line, pie) using Recharts. Supports customizable data visualization with labels, datasets, and styling options.",
    component: Graph,
    propsSchema: graphSchema,
  },
  {
    name: "DataCard",
    description:
      "A component that displays options as clickable cards with links and summaries with the ability to select multiple items.",
    component: DataCard,
    propsSchema: dataCardSchema,
  },
  {
    name: "FlightSearch",
    description: "A travel search component that allows selecting cities, dates and travellers.",
    component: FlightSearch,
    propsSchema: flightSearchSchema,
  },
  {
    name: "SearchHeader",
    description: "The header on the flight results page that allows refining the search.",
    component: SearchHeader,
    propsSchema: z.object({
      fromCity: z.string(),
      toCity: z.string(),
      departureDate: z.string(),
      travellers: z.string(),
      tripType: z.string(),
    }),
  },
  {
    name: "FlightResults",
    description: "The list of flight search results. Allows highlighting specific flights.",
    component: FlightResults,
    propsSchema: z.object({
      highlightedFlightId: z.string().optional(),
    }),
  },
  {
    name: "FlightFilters",
    description: "Search filters for flights, like non-stop, time of day, and refundability.",
    component: FlightFilters,
    propsSchema: z.object({
      nonStop: z.boolean().optional(),
      morningDepartures: z.boolean().optional(),
      refundableFares: z.boolean().optional(),
    }),
  }
  // Add more components here
];
