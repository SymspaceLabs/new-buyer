"use client";

import Link from "next/link";
import { JSX, useState } from "react";
import { FAQS } from "@/data/faqs";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// =============================================================
// Types
// =============================================================

interface FAQ {
  question: string;
  answer: string;
}

// =============================================================
// Main Component
// =============================================================

export default function Section14(): JSX.Element {
  const [expanded, setExpanded] = useState<string | null>(null);

  const handleChange = (value: string): void => {
    setExpanded(expanded === value ? null : value);
  };

  return (
    <section className="w-full py-4 sm:py-20 bg-[#1F1F1F]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true }}
        className="w-full overflow-hidden"
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-2 sm:py-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-elemental lowercase text-white">
              FAQs
            </h1>
            <Link href="/faq" target="_blank">
              <h1
                className="text-white/50 no-underline text-[10px] sm:text-base hover:text-white hover:underline transition-all"
              >
                More FAQS
              </h1>
            </Link>
          </div>

          <Accordion
            type="single"
            collapsible
            value={expanded || undefined}
            onValueChange={handleChange}
            className="space-y-4"
          >
            {FAQS.slice(0, 3).map((faq: FAQ, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="border-2 border-white rounded-[15px] mb-4 overflow-hidden px-2 sm:px-4 py-1 sm:py-2"
                >
                  <AccordionTrigger className="border-none hover:no-underline text-left">
                    <h2 className="text-[10px] sm:text-lg text-white font-bold">
                      {faq.question}
                    </h2>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-white text-sm sm:text-base leading-relaxed">
                      {faq.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </motion.div>
    </section>
  );
}