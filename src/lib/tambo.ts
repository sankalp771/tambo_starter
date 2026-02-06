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
import flightsData from "@/lib/data/flights.json";
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
    description: "Search for available flights based on origin, destination and date.",
    tool: async (input: { from: string; to: string; date: string }) => {
      const query = input.from.toLowerCase();
      const dest = input.to.toLowerCase();

      // Filter from our new JSON file
      const results = flightsData.flights.filter(f =>
        f.fromCity.toLowerCase().includes(query) ||
        f.from.toLowerCase().includes(query) ||
        f.toCity.toLowerCase().includes(dest) ||
        f.to.toLowerCase().includes(dest)
      );

      return results.map(f => ({
        id: f.id,
        airline: f.airline,
        price: `${f.currency} ${f.price.toLocaleString()}`,
        time: `${f.departure} - ${f.arrival}`,
        duration: f.duration,
        flightNumber: f.flightNumber
      }));
    },
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
      duration: z.string(),
      flightNumber: z.string()
    })),
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
  // Add more components here
];
