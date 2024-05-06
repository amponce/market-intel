import type { NextApiRequest, NextApiResponse } from 'next';

export const runtime = 'edge';

export async function GET() {
  const apiKey = process.env.EIA_API_KEY;
  const baseUrl = 'https://api.eia.gov/v2/natural-gas/pri/fut/data/';

  // Define the xParams object
  const xParams = {
    frequency: 'daily',
    data: ['value'],
    facets: {
      series: ['RNGC1', 'RNGWHHD'],
    },
    start: null,
    end: null,
    sort: [
      {
        column: 'period',
        direction: 'desc',
      },
    ],
    offset: 0,
    length: 10,
  };

  try {
    const response = await fetch(`${baseUrl}?api_key=${apiKey}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Params': JSON.stringify(xParams),
      },
    });

    const data = await response.json();

    // Extract the relevant data
    const energyPrices = data.response.data.map((item) => ({
      period: item.period,
      areaName: item['area-name'],
      productName: item['product-name'],
      processName: item['process-name'],
      series: item.series,
      seriesDescription: item['series-description'],
      value: item.value,
      units: item.units,
    }));

    return new Response(JSON.stringify(energyPrices), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('EIA API request error:', error);
    return new Response(
      JSON.stringify({ error: 'Error fetching data from EIA API' }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
}
