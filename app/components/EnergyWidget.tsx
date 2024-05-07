"use client";
import { useEffect, useState } from "react";

const EnergyWidget = () => {
  const [energyData, setEnergyData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/energy");
      const data = await res.json();
      setEnergyData(data);
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <p className="text-xl font-bold mb-6 text-gray-800">Energy Prices</p>
      <div className="grid grid-cols-3 gap-4">
        {energyData &&
          energyData.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
            >
              <div className="p-6">
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
            </div>
          ))}
      </div>
    </div>
  );
};

// Helper function to group energy data by date
const groupByDate = (data: any[]): Record<string, any[]> => {
  return data.reduce((acc, item) => {
    const date = item.period;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});
};

export default EnergyWidget;
