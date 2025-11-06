import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Badge } from "./ui/badge";
import type { ModelConfig } from "./ModelConfig";

interface ModelGalleryProps {
  models: ModelConfig[];
  selectedModelId: string | null;
  onModelSelect: (modelId: string) => void;
}

export function ModelGallery({
  models,
  selectedModelId,
  onModelSelect,
}: ModelGalleryProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scroll position
  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
  };

  useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll);
      return () => container.removeEventListener("scroll", checkScroll);
    }
  }, [models]);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 400;
    const targetScroll =
      direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative mb-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl magical-text-glow bg-gradient-to-r from-primary to-emerald-400/70 bg-clip-text text-transparent">
            Model Gallery
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Select a model to view in detail • {models.length} total models
          </p>
        </div>
        <Badge
          variant="secondary"
          className="bg-primary/10 border border-emerald-400/20"
        >
          <Sparkles className="w-3 h-3 mr-1" />
          {models.filter((m) => m.featured).length} Featured
        </Badge>
      </div>

      {/* Gallery Container */}
      <div className="relative group">
        {/* Left Scroll Button */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-primary/80 hover:bg-primary text-primary-foreground p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Right Scroll Button */}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-primary/80 hover:bg-primary text-primary-foreground p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        {/* Scrollable Gallery */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
          style={{ scrollbarWidth: "none" }}
        >
          {models.map((model, index) => (
            <motion.button
              key={model.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onClick={() => onModelSelect(model.id)}
              className={`flex-shrink-0 w-40 rounded-xl overflow-hidden transition-all ${
                selectedModelId === model.id
                  ? "ring-2 ring-primary shadow-lg shadow-primary/50 scale-105"
                  : "hover:ring-2 hover:ring-emerald-400/50 hover:scale-105"
              }`}
            >
              {/* Thumbnail */}
              <div className="relative aspect-square bg-gradient-to-br from-primary/20 to-emerald-400/20">
                {model.thumbnail ? (
                  <ImageWithFallback
                    src={model.thumbnail}
                    alt={model.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ backgroundColor: model.fallbackColor }}
                  >
                    <Sparkles className="w-12 h-12 text-white/50" />
                  </div>
                )}

                {/* Featured Badge */}
                {model.featured && (
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-primary text-primary-foreground text-xs px-1.5 py-0.5">
                      <Sparkles className="w-2.5 h-2.5 mr-0.5" />
                      Featured
                    </Badge>
                  </div>
                )}

                {/* Selected Indicator */}
                {selectedModelId === model.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 bg-primary/20 flex items-center justify-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-primary-foreground" />
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Model Info */}
              <div className="bg-card/80 backdrop-blur-sm p-3 border-t border-primary/20">
                <h3 className="text-sm truncate mb-1">{model.name}</h3>
                <div className="flex gap-1 flex-wrap">
                  {model.tags.slice(0, 2).map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs px-1 py-0"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {model.tags.length > 2 && (
                    <Badge variant="secondary" className="text-xs px-1 py-0">
                      +{model.tags.length - 2}
                    </Badge>
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Gradient Fade Edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none" />
    </div>
  );
}
