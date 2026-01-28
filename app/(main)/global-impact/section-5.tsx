import React from 'react';
import Image from 'next/image';
import { Marquee } from '@/components/ui/marquee';

interface Section5Props {
  className?: string;
}

/**
 * Hardcoded List of Company Logos
 * This list is used to populate the marquee slider.
 */
const companies = [
  "/assets/images/global-impact/company-1.png",
  "/assets/images/global-impact/company-2.png",
  "/assets/images/global-impact/company-3.png",
  "/assets/images/global-impact/company-4.png",
  "/assets/images/global-impact/company-5.png",
  "/assets/images/global-impact/company-6.png",
];

export default function Section5({ className }: Section5Props) {
  return (
    <div className={`w-full flex flex-col items-center py-4 ${className || ''}`}>
      {/* Header Section */}
      <div className="w-full max-w-[1250px] p-2">
        <p className="text-white text-base font-['Helvetica']">
          What everyone is saying
        </p>
        <h1 className="text-white text-[28px] sm:text-[40px] font-bold pb-[25px]">
          communities and collaborations
        </h1>
      </div>

      {/* Marquee Slider */}
      <div className="w-full overflow-hidden">
        <Marquee pauseOnHover className="py-4">
          {companies.map((company, index) => (
            <div
              key={index}
              className="relative mx-4 h-24 w-48 flex items-center justify-center"
            >
              <Image
                src={company}
                alt={`Company ${index + 1}`}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
}