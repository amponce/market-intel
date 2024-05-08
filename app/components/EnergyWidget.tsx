"use client";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

interface EnergyItem {
  period: string;
  areaName: string;
  productName: string;
  processName: string;
  seriesDescription: string;
  value: number;
  units: string;
}
interface ChartSeries {
  name: string;
  data: number[];
}

const EnergyWidget = () => {
  const [energyData, setEnergyData] = useState<EnergyItem[] | null>(null);
  const [chartOptions, setChartOptions] = useState({}); // You might also want to type this eventually
  const [chartSeries, setChartSeries] = useState<ChartSeries[]>([]); // Explicitly defining the type of chartSeries

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/energy");
      const data: EnergyItem[] = await res.json();
      setEnergyData(data);
      processChartData(data);
    };

    fetchData();
  }, []);

  const processChartData = (data: EnergyItem[]) => {
    const categories = Array.from(
      new Set(data.map((item) => item.period))
    ).sort();
    const series = data.reduce((acc: ChartSeries[], item) => {
      let series = acc.find((s) => s.name === item.processName);
      if (!series) {
        series = { name: item.processName, data: [] };
        acc.push(series);
      }
      series.data.push(item.value);
      return acc;
    }, []);

    setChartOptions({
      chart: {
        type: "line",
        zoom: { enabled: false },
      },
      title: {
        text: "Natural Gas Price Trends",
        align: "center",
      },
      xaxis: {
        categories,
        title: { text: "Period" },
      },
      yaxis: {
        title: { text: "Price ($/MMBTU)" },
        min: Math.min(...data.map((item) => item.value)) * 0.95,
        max: Math.max(...data.map((item) => item.value)) * 1.05,
      },
      tooltip: {
        y: {
          formatter: (val: number) => `${val.toFixed(2)} $/MMBTU`,
        },
      },
    });
    setChartSeries(series);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div id="chart">
        <ReactApexChart
          options={chartOptions}
          series={chartSeries}
          type="line"
          height={350}
        />
      </div>
      {energyData &&
        energyData.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out p-6 mb-4"
          >
            <p className="text-sm text-gray-600">
              <strong>Period:</strong> {item.period}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Area:</strong> {item.areaName}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Product:</strong> {item.productName}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Process:</strong> {item.processName}
            </p>
            <p className="text-sm text-gray-600 mt-4">
              <strong>Description:</strong> {item.seriesDescription}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Price:</strong> {item.value} {item.units}
            </p>
          </div>
        ))}
    </div>
  );
};

export default EnergyWidget;
