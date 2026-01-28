"use client";

// =============================================================================
// Section 3 - Partners Section - About Us 
// =============================================================================

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

// =============================================================================

// Companies data type
interface Company {
  src: string;
  url: string;
  alt: string;
}

const COMPANIES_DATA: Company[] = [
  { 
    src: "/assets/images/global-impact/company-2.png",
    url: "https://www.techstars.com/",
    alt: "Company 1"
  },
  { 
    src: "/assets/images/contact-us/company-1.png",
    url: "https://j2x.space/",
    alt: "Company 2"
  }
];

export default function Section3() {
  return (
    <div className="w-full flex flex-col items-center py-2 px-4">
      <div className="w-full max-w-[1400px]">
        <h1 className="py-5 text-[25px] sm:text-[35px] text-white [word-spacing:10px]">
          backed by industry leaders
        </h1>

        <div className="bg-white/35 backdrop-blur-[10px] rounded-[40px] p-6 
                        shadow-[inset_0px_3px_6px_rgba(255,255,255,0.4),inset_0px_-3px_9px_rgba(255,255,255,0.5),inset_0px_-1.5px_20px_rgba(255,255,255,0.24),inset_0px_20px_20px_rgba(255,255,255,0.24),inset_0px_1px_20.5px_rgba(255,255,255,0.8)]">
          <div className="flex flex-col sm:flex-row justify-between gap-3 items-center">
            {/* Mapping through company logos */}
            {COMPANIES_DATA.map((company, index) => (
              <div key={index} className="w-[60%] sm:w-[25%]">
                <a href={company.url} target="_blank" rel="noopener noreferrer">
                  <Image 
                    src={company.src} 
                    width={150} 
                    height={150} 
                    alt={company.alt}
                    className="w-full h-auto"
                  />
                </a>
              </div>
            ))}
            
            <div className="flex flex-col items-center justify-center">
              <Link href='/contact-us' passHref>
                <Button 
                  className="bg-white/35 backdrop-blur-[10px] rounded-full px-8 py-6 text-white
                             shadow-[inset_0px_3px_6px_rgba(255,255,255,0.4),inset_0px_-3px_9px_rgba(255,255,255,0.5)]
                             hover:bg-[rgba(122,169,243,0.7)] hover:shadow-[0px_4px_10px_rgba(0,0,0,0.25)]
                             transition-all duration-200 ease-in-out
                             text-[14px] font-medium uppercase"
                >
                  get in touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}