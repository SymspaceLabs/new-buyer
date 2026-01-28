"use client";

import { motion } from "framer-motion";
import { memo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Product categories for AR marketplace
 */
const CATEGORIES = [
  { id: 1, title: "T-shirts", thumbnail: "/assets/images/icons/shirt.svg", slug: "subcategoryItem=t-shirts" },
  { id: 2, title: "Hoodies", thumbnail: "/assets/images/icons/hoodie.svg", slug: "subcategoryItem=hoodie" },
  { id: 3, title: "Pants", thumbnail: "/assets/images/icons/pants.svg", slug: "subcategoryItem=pants" },
  { id: 4, title: "Furniture", thumbnail: "/assets/images/icons/furniture.svg", slug: "subcategory=furniture" },
  { id: 5, title: "Shoes", thumbnail: "/assets/images/icons/shoe.svg", slug: "subcategory=shoes" },
  { id: 6, title: "Dresses", thumbnail: "/assets/images/icons/dress-2.svg", slug: "subcategory=dress" },
  { id: 7, title: "Earrings", thumbnail: "/assets/images/icons/earring.svg", slug: "subcategoryItem=earring" },
  { id: 8, title: "Accessories", thumbnail: "/assets/images/icons/accessory.svg", slug: "subcategory=accessories" },
  { id: 9, title: "Bags", thumbnail: "/assets/images/icons/bag-2.svg", slug: "subcategoryItem=bags" },
  { id: 10, title: "Hats", thumbnail: "/assets/images/icons/hat.svg", slug: "subcategoryItem=hat" },
  { id: 11, title: "Watches", thumbnail: "/assets/images/icons/watch-2.svg", slug: "subcategoryItem=watch" },
  { id: 12, title: "Eyewear", thumbnail: "/assets/images/icons/eyewear.svg", slug: "eyewear" },
  { id: 13, title: "TVs", thumbnail: "/assets/images/icons/tv.svg", slug: "subcategoryItem=tv" }
] as const;

/**
 * Animation configuration
 */
const ANIMATION_CONFIG = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
  viewport: { once: true, margin: "-100px" }
} as const;

// ============================================================================
// STYLES
// ============================================================================

const styles = {
  container: "bg-white",
  contentWrapper: "container mx-auto py-6 md:py-20 px-4",
  header: "flex items-center justify-between py-4 sm:py-10 relative",
  title: "text-xl sm:text-[18px] text-center z-[5] font-elemental lowercase",
  
  // Navigation
  navButtons: "hidden sm:flex gap-2 z-[1]",
  navButton: "w-10 h-10 rounded-full hover:bg-gray-100 transition-colors",
  navButtonActive: "bg-white shadow-md",
  
  // Mobile scroll
  mobileScroll: `
    flex sm:hidden gap-4 overflow-x-auto pb-4
    scrollbar-none
    [scrollbar-width:none]
    [-ms-overflow-style:none]
    [&::-webkit-scrollbar]:hidden
    snap-x snap-mandatory
  `,
  
  // Desktop grid
  desktopGrid: "hidden sm:grid grid-cols-6 gap-4",
  
  // Category card
  categoryCard: `
    flex flex-col items-center justify-center gap-2 sm:gap-4
    py-4 sm:py-10 px-2
    bg-[#353535] rounded-2xl
    transition-all duration-300 hover:scale-105 hover:shadow-lg
    cursor-pointer
  `,
  categoryCardMobile: "min-w-[85px] snap-start flex-shrink-0",
  categoryIcon: "w-8 h-8 sm:w-10 sm:h-10",
  categoryTitle: "text-xs sm:text-lg text-white text-center font-bold"
} as const;

// ============================================================================
// COMPONENTS
// ============================================================================

/**
 * CategoryCard Component
 * Displays a single category with icon and title
 * Memoized to prevent unnecessary re-renders
 * 
 * @param {Object} category - Category data
 * @param {boolean} isMobile - Whether displaying on mobile
 */
const CategoryCard = memo(({ 
  category, 
  isMobile = false 
}: { 
  category: typeof CATEGORIES[number]; 
  isMobile?: boolean;
}) => (
  <a
    href={`/products?${category.slug}`}
    className={`${styles.categoryCard} ${isMobile ? styles.categoryCardMobile : ''}`}
    aria-label={`Browse ${category.title}`}
  >
    <img
      alt={category.title}
      src={category.thumbnail}
      className={styles.categoryIcon}
      loading="lazy"
    />
    <h3 className={styles.categoryTitle}>
      {category.title}
    </h3>
  </a>
));

CategoryCard.displayName = 'CategoryCard';

/**
 * MobileScroll Component
 * Horizontally scrollable category list for mobile devices
 * Memoized to prevent unnecessary re-renders
 */
const MobileScroll = memo(() => (
  <div className={styles.mobileScroll}>
    {CATEGORIES.map((category) => (
      <CategoryCard key={category.id} category={category} isMobile />
    ))}
  </div>
));

MobileScroll.displayName = 'MobileScroll';

/**
 * DesktopGrid Component
 * Grid layout of categories for desktop with carousel navigation
 * Memoized to prevent unnecessary re-renders
 * 
 * @param {number} startIndex - Current starting index for visible items
 */
const DesktopGrid = memo(({ startIndex }: { startIndex: number }) => {
  const visibleCategories = CATEGORIES.slice(startIndex, startIndex + 6);
  
  return (
    <div className={styles.desktopGrid}>
      {visibleCategories.map((category) => (
        <motion.div
          key={category.id}
          initial={ANIMATION_CONFIG.initial}
          whileInView={ANIMATION_CONFIG.animate}
          transition={ANIMATION_CONFIG.transition}
          viewport={ANIMATION_CONFIG.viewport}
        >
          <CategoryCard category={category} />
        </motion.div>
      ))}
    </div>
  );
});

DesktopGrid.displayName = 'DesktopGrid';

/**
 * NavigationButtons Component
 * Previous/Next buttons for desktop carousel
 * Memoized to prevent unnecessary re-renders
 * 
 * @param {function} onPrev - Handler for previous button
 * @param {function} onNext - Handler for next button
 * @param {boolean} canGoPrev - Whether previous navigation is available
 * @param {boolean} canGoNext - Whether next navigation is available
 */
const NavigationButtons = memo(({ 
  onPrev, 
  onNext, 
  canGoPrev, 
  canGoNext 
}: { 
  onPrev: () => void;
  onNext: () => void;
  canGoPrev: boolean;
  canGoNext: boolean;
}) => (
  <div className={styles.navButtons}>
    <Button
      variant="ghost"
      size="icon"
      onClick={onPrev}
      disabled={!canGoPrev}
      className={styles.navButton}
      aria-label="Previous categories"
    >
      <ChevronLeft className="w-5 h-5" />
    </Button>
    <Button
      variant="ghost"
      size="icon"
      onClick={onNext}
      disabled={!canGoNext}
      className={`${styles.navButton} ${styles.navButtonActive}`}
      aria-label="Next categories"
    >
      <ChevronRight className="w-5 h-5" />
    </Button>
  </div>
));

NavigationButtons.displayName = 'NavigationButtons';

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Section4 Component
 * Augmented Reality Marketplaces category carousel section
 * 
 * Features:
 * - Mobile: Horizontal scroll with snap points
 * - Desktop: Paginated grid with navigation buttons
 * - Smooth animations on scroll
 * - Lazy-loaded images
 * - Responsive design
 * 
 * Performance Optimizations:
 * - Components memoized to prevent unnecessary re-renders
 * - Static content extracted to constants
 * - Lazy image loading
 * - Efficient carousel pagination (6 items at a time)
 * 
 * @returns {JSX.Element} Category carousel section component
 */
export default function Section4() {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 6;
  const maxIndex = Math.max(0, CATEGORIES.length - itemsPerPage);

  //Navigate to previous set of categories
  const handlePrev = () => {
    setStartIndex((prev) => Math.max(0, prev - itemsPerPage));
  };

  // Navigate to next set of categories
  const handleNext = () => {
    setStartIndex((prev) => Math.min(maxIndex, prev + itemsPerPage));
  };

  const canGoPrev = startIndex > 0;
  const canGoNext = startIndex < maxIndex;

  return (
    <section className={styles.container} aria-label="Product Categories">
      <div className={styles.contentWrapper}>
        <motion.div
          initial={ANIMATION_CONFIG.initial}
          whileInView={ANIMATION_CONFIG.animate}
          transition={ANIMATION_CONFIG.transition}
          viewport={ANIMATION_CONFIG.viewport}
        >
          {/* Header with title and navigation */}
          <div className={styles.header}>
            <h2 className={styles.title}>
              Augmented Reality Marketplaces
            </h2>
            
            <NavigationButtons
              onPrev={handlePrev}
              onNext={handleNext}
              canGoPrev={canGoPrev}
              canGoNext={canGoNext}
            />
          </div>

          {/* Mobile horizontal scroll */}
          <MobileScroll />

          {/* Desktop paginated grid */}
          <DesktopGrid startIndex={startIndex} />
        </motion.div>
      </div>
    </section>
  );
}