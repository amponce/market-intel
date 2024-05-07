"use client";
import { useEffect, useState } from "react";

interface EnergyItem {
  areaName: string;
  productName: string;
  processName: string;
  seriesDescription: string;
  value: number | string;
  units: string;
}

const EnergyWidget = () => {
  // Set useState with specific type annotation for TypeScript
  const [energyData, setEnergyData] = useState<EnergyItem[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/energy");
      const data: EnergyItem[] = await res.json(); // Assume the fetched data is an array of EnergyItem
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

export default EnergyWidget;
