import React from "react";
import Weather from "@/components/Weather/Weather";

const WeatherPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center">
      <Weather />
    </div>
  );
};

export default WeatherPage;
