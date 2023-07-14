import React, { useState } from "react";

interface Props {
  disabled?: boolean;
}

export const RateAnswer = ({ disabled }: Props) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleSetRating = (rate: number) => {
    setRating(rate);
  };

  const colorRating: ((i: number, dark: boolean) =>  string) = (i: number, dark: boolean) => {
    const colors: any = {
      1: dark ? "text-red-500": "text-red-400",
      2: dark ? "text-red-400": "text-red-300",
      3: dark ? "text-orange-400": "text-orange-300",
      4: dark ? "text-yellow-400": "text-yellow-300",
      5: dark ? "text-yellow-300": "text-yellow-200",
    };
  
    return colors[i] || "text-gray-300";
  };

  return (
    <div className="py-3 overflow-y-auto text-sm md:text-lg table-auto whitespace-pre-line flex items-end justify-between">
      <p className="text-sm">Rate your answer:</p>
      <div className="flex gap-0.5 p-1">
        {[...Array(5)].map((_, i) => (
          <div
            onClick={() => handleSetRating(i + 1)}
            onMouseEnter={() => setHover(i + 1)}
            onMouseLeave={() => setHover(0)}
            key={i}
            className={`"cursor-pointer" ${
              disabled ? "pointer-events-none" : ""
            }`}
          >
            <svg
              className={`w-5 h-5 ${hover > i ? colorRating(hover, false) + ' hover: scale-110': rating > i ? colorRating(rating, true) : 'text-gray-300'}`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};
