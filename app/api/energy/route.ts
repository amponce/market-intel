import type { NextApiRequest, NextApiResponse } from "next";

export const runtime = "edge";

interface EnergyPriceItem {
  period: string;
  "area-name": string;
  "product-name": string;
  "process-name": string;
  series: string;
  "series-description": string;
  value: number;
  units: string;
}

export async function GET() {
  const apiKey = process.env.EIA_API_KEY;
  const baseUrl = "https://api.eia.gov/v2/natural-gas/pri/fut/data/";

  const xParams = {
    frequency: "monthly",
    data: ["value"],
    facets: {
      product: ["EPG0"],
    },
    start: "2020-01",
    end: null,
    sort: [
      {
        column: "period",
        direction: "desc",
      },
    ],
    offset: 0,
    length: 1000,
  };

  try {
    const response = await fetch(`${baseUrl}?api_key=${apiKey}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Params": JSON.stringify(xParams),
      },
    });

    const data = await response.json();

    // Extract the relevant data using the defined type
    const energyPrices = data.response.data.map((item: EnergyPriceItem) => ({
      period: item.period,
      areaName: item["area-name"],
      productName: item["product-name"],
      processName: item["process-name"],
      series: item.series,
      seriesDescription: item["series-description"],
      value: item.value,
      units: item.units,
    }));

    return new Response(JSON.stringify(energyPrices), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("EIA API request error:", error);
    return new Response(
      JSON.stringify({ error: "Error fetching data from EIA API" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
}
