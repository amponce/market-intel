'use client';
import { useEffect, useState } from 'react';

const EnergyWidget = () => {
  const [energyData, setEnergyData] = useState(null);
  const [expandedDate, setExpandedDate] = useState(null);
  const itemLimit = 10; // Limit the number of displayed items

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/energy');
      const data = await res.json();
      setEnergyData(data);
    };

    fetchData();
  }, []);

  // Group energy data by date
  const groupedData = energyData ? groupByDate(energyData) : {};

  // Handle accordion toggle
  const handleAccordionToggle = (date) => {
    setExpandedDate(date === expandedDate ? null : date);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Energy Prices</h1>
      {Object.entries(groupedData)
        .slice(0, itemLimit)
        .map(([date, items]) => (
          <div key={date} className="border rounded-lg shadow-md mb-4">
            <button
              className="w-full px-4 py-2 text-left bg-gray-100 hover:bg-gray-200 focus:outline-none"
              onClick={() => handleAccordionToggle(date)}
            >
              <span className="font-semibold">{date}</span>
            </button>
            {expandedDate === date && (
              <div className="px-4 py-2">
                {items.map((item, index) => (
                  <div key={index} className="mb-2">
                    {item.areaName && (
                      <p>
                        <strong>Area:</strong> {item.areaName}
                      </p>
                    )}
                    <p>
                      <strong>Product:</strong> {item.productName}
                    </p>
                    <p>
                      <strong>Process:</strong> {item.processName}
                    </p>
                    <p>
                      <strong>Description:</strong> {item.seriesDescription}
                    </p>
                    <p>
                      <strong>Price:</strong> {item.value} {item.units}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

// Helper function to group energy data by date
const groupByDate = (data) => {
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
