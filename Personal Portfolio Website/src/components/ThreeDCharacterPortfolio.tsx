import { useState, useCallback, useMemo } from "react";
import React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Users,
  ChevronDown,
  Loader2,
  X,
  ExternalLink,
  Grid3x3,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ThreeDViewer } from "./ThreeDViewer";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  CHARACTERS,
  type ModelConfig,
  getModelConfig,
} from "./ModelConfig";

const GRID_THUMBNAILS_PER_PAGE = 16;
const MODELS_PER_PAGE = 3;

export function ThreeDCharacterPortfolio() {
  // Quick navigation grid state
  const [gridLoadedCount, setGridLoadedCount] = useState(
    GRID_THUMBNAILS_PER_PAGE,
  );
  const [isLoadingMoreGrid, setIsLoadingMoreGrid] =
    useState(false);

  // Main 3D viewer state
  const [mainLoadedCount, setMainLoadedCount] =
    useState(MODELS_PER_PAGE);
  const [isLoadingMoreMain, setIsLoadingMoreMain] =
    useState(false);

  // Overlay state (when clicking grid thumbnail)
  const [overlayModel, setOverlayModel] =
    useState<ModelConfig | null>(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  // Variation overlay state
  const [selectedVariation, setSelectedVariation] = useState<{
    model: ModelConfig;
    variation: ModelConfig["variations"][0];
  } | null>(null);
  const [isVariationOverlayOpen, setIsVariationOverlayOpen] =
    useState(false);

  const characters = CHARACTERS;

  const gridCharacters = useMemo(() => {
    return characters.slice(0, gridLoadedCount);
  }, [characters, gridLoadedCount]);

  const mainCharacters = useMemo(() => {
    return characters.slice(0, mainLoadedCount);
  }, [characters, mainLoadedCount]);

  const hasMoreGrid = gridLoadedCount < characters.length;
  const hasMoreMain = mainLoadedCount < characters.length;

  // Handle load more grid
  const handleLoadMoreGrid = () => {
    setIsLoadingMoreGrid(true);
    setTimeout(() => {
      setGridLoadedCount((prev) =>
        Math.min(
          prev + GRID_THUMBNAILS_PER_PAGE,
          characters.length,
        ),
      );
      setIsLoadingMoreGrid(false);
    }, 300);
  };

  // Handle load more main
  const handleLoadMoreMain = () => {
    setIsLoadingMoreMain(true);
    setTimeout(() => {
      setMainLoadedCount((prev) =>
        Math.min(prev + MODELS_PER_PAGE, characters.length),
      );
      setIsLoadingMoreMain(false);
    }, 300);
  };

  // Handle grid thumbnail click
  const handleGridThumbnailClick = useCallback(
    (character: ModelConfig) => {
      setOverlayModel(character);
      setIsOverlayOpen(true);
    },
    [],
  );

  // Handle variation click
  const handleVariationClick = useCallback(
    (
      model: ModelConfig,
      variation: ModelConfig["variations"][0],
    ) => {
      setSelectedVariation({ model, variation });
      setIsVariationOverlayOpen(true);
    },
    [],
  );

  // Initialize camera settings from model config
  const initializeCameraSettings = (modelUrl: string) => {
    const config = getModelConfig(modelUrl);
    const opts = config?.cameraOptions || {};
    return {
      autoFit: opts.autoFit ?? true,
      position: opts.position,
      rotation: opts.rotation,
      target: opts.target,
      fov: opts.fov,
      distanceMultiplier: opts.distanceMultiplier,
      heightOffset: opts.heightOffset,
      enableMouseFollow: opts.enableMouseFollow ?? true,
      mouseFollowStrength: opts.mouseFollowStrength,
      enableFloating: opts.enableFloating ?? true,
      floatingSpeed: opts.floatingSpeed,
      floatingAmplitude: opts.floatingAmplitude,
      enableZoom: opts.enableZoom ?? true,
      enablePan: opts.enablePan ?? true,
      minDistance: opts.minDistance,
      maxDistance: opts.maxDistance,
    };
  };

  // Model details component
  const ModelDetails = ({
    character,
    onVariationClick,
  }: {
    character: ModelConfig;
    onVariationClick?: (
      variation: ModelConfig["variations"][0],
    ) => void;
  }) => (
    <div className="flex flex-col h-full overflow-hidden relative">
      {/* Header - Fixed */}
      <div className="flex-shrink-0 p-6 border-b border-purple-500/20 bg-gradient-to-r from-purple-950/20 to-transparent relative z-10">
        <div className="flex items-center gap-3 mb-3">
          <h2 className="text-2xl bg-gradient-to-r from-purple-200 via-white to-cyan-200 bg-clip-text text-transparent">
            {character.name}
          </h2>
          {character.featured && (
            <Badge
              variant="secondary"
              className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white border-none shadow-lg shadow-orange-500/50 animate-pulse"
            >
              <Sparkles className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          )}
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {character.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-xs bg-purple-500/20 border border-purple-500/30 hover:bg-purple-500/30 transition-colors"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <p className="text-sm text-purple-100/80">
          {character.description}
        </p>
      </div>

      {/* Scrollable Content - Lore and other sections */}
      <div className="flex-1 overflow-y-auto relative">
        {/* Floating Magical Runes Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          {/* Ancient rune symbols */}
          <div
            className="absolute top-[10%] right-[8%] text-purple-400/40 particle-1"
            style={{ fontSize: "2rem" }}
          >
            ✦
          </div>
          <div
            className="absolute top-[25%] left-[5%] text-cyan-400/40 particle-2"
            style={{ fontSize: "1.5rem" }}
          >
            ✧
          </div>
          <div
            className="absolute top-[40%] right-[12%] text-emerald-400/40 particle-1"
            style={{ fontSize: "1.8rem", animationDelay: "3s" }}
          >
            ❋
          </div>
          <div
            className="absolute top-[60%] left-[10%] text-purple-400/40 particle-2"
            style={{ fontSize: "1.3rem", animationDelay: "2s" }}
          >
            ✺
          </div>
          <div
            className="absolute top-[75%] right-[15%] text-cyan-400/40 particle-1"
            style={{ fontSize: "2.2rem", animationDelay: "4s" }}
          >
            ✹
          </div>
          <div
            className="absolute top-[90%] left-[8%] text-emerald-400/40 particle-2"
            style={{ fontSize: "1.6rem", animationDelay: "1s" }}
          >
            ✸
          </div>
        </div>

        {/* Lore Section */}
        {character.lore && (
          <div className="px-6 pt-8 pb-4 relative z-10">
            {/* Ornamental corner decorations */}
            <div className="absolute top-6 left-4 w-8 h-8 border-l-2 border-t-2 border-purple-500/40 rounded-tl-lg" />
            <div className="absolute top-6 right-4 w-8 h-8 border-r-2 border-t-2 border-cyan-500/40 rounded-tr-lg" />

            <h3
              className="text-sm mb-4 flex items-center gap-2 text-purple-300"
              style={{
                textShadow: "0 0 10px rgba(168, 85, 247, 0.6)",
              }}
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              Lore
            </h3>
            <p
              className="text-xs italic text-purple-100/80 leading-relaxed pl-6 border-l-2 border-purple-500/40"
              style={{
                textShadow: "0 1px 4px rgba(0,0,0,0.5)",
              }}
            >
              {character.lore}
            </p>
          </div>
        )}

        {/* Magical Divider */}
        <div className="px-6 py-4 relative z-10">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-purple-500/20" />
            </div>
            <div className="relative px-4 bg-gradient-to-r from-transparent via-background/80 to-transparent">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400/60 animate-pulse" />
                <div
                  className="w-2 h-2 rounded-full bg-cyan-400/80 animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                />
                <div
                  className="w-1.5 h-1.5 rounded-full bg-emerald-400/60 animate-pulse"
                  style={{ animationDelay: "1s" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Character Metadata Section */}
        <div className="px-6 pb-6 relative z-10">
          {/* Ornamental frame */}
          <div className="relative">
            {/* Corner ornaments */}
            <div className="absolute -top-2 -left-2 w-6 h-6">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500/60 to-transparent rounded-full" />
              <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-purple-500/60 to-transparent rounded-full" />
              <div className="absolute top-1 left-1 w-1 h-1 rounded-full bg-purple-400/80 animate-pulse" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6">
              <div className="absolute top-0 right-0 w-full h-0.5 bg-gradient-to-l from-cyan-500/60 to-transparent rounded-full" />
              <div className="absolute top-0 right-0 w-0.5 h-full bg-gradient-to-b from-cyan-500/60 to-transparent rounded-full" />
              <div
                className="absolute top-1 right-1 w-1 h-1 rounded-full bg-cyan-400/80 animate-pulse"
                style={{ animationDelay: "0.5s" }}
              />
            </div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6">
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-500/60 to-transparent rounded-full" />
              <div className="absolute bottom-0 left-0 w-0.5 h-full bg-gradient-to-t from-emerald-500/60 to-transparent rounded-full" />
              <div
                className="absolute bottom-1 left-1 w-1 h-1 rounded-full bg-emerald-400/80 animate-pulse"
                style={{ animationDelay: "1s" }}
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6">
              <div className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-l from-purple-500/60 to-transparent rounded-full" />
              <div className="absolute bottom-0 right-0 w-0.5 h-full bg-gradient-to-t from-purple-500/60 to-transparent rounded-full" />
              <div
                className="absolute bottom-1 right-1 w-1 h-1 rounded-full bg-purple-400/80 animate-pulse"
                style={{ animationDelay: "1.5s" }}
              />
            </div>

            {/* Metadata content */}
            <div className="space-y-3 px-4 py-4">
              {character.dateAdded && (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-purple-300/70">
                    Created
                  </span>
                  <span
                    className="text-purple-100/90"
                    style={{
                      textShadow: "0 1px 3px rgba(0,0,0,0.5)",
                    }}
                  >
                    {new Date(
                      character.dateAdded,
                    ).getFullYear()}
                  </span>
                </div>
              )}

              {character.category && (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-cyan-300/70">
                    Project Type
                  </span>
                  <span
                    className="text-cyan-100/90"
                    style={{
                      textShadow: "0 1px 3px rgba(0,0,0,0.5)",
                    }}
                  >
                    {character.category}
                  </span>
                </div>
              )}

              {character.tools &&
                character.tools.length > 0 && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-emerald-300/70">
                      Tools Used
                    </span>
                    <span
                      className="text-emerald-100/90"
                      style={{
                        textShadow: "0 1px 3px rgba(0,0,0,0.5)",
                      }}
                    >
                      {character.tools.join(" • ")}
                    </span>
                  </div>
                )}

              {character.variations.length > 0 && (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-purple-300/70">
                    Variations
                  </span>
                  <span
                    className="text-purple-100/90"
                    style={{
                      textShadow: "0 1px 3px rgba(0,0,0,0.5)",
                    }}
                  >
                    {character.variations.length} Community
                    Builds
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Additional floating elements at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none overflow-hidden">
          <div className="absolute bottom-4 left-[20%] w-2 h-2 rounded-full bg-purple-400/40 ember-1" />
          <div className="absolute bottom-6 right-[30%] w-1.5 h-1.5 rounded-full bg-cyan-400/40 ember-2" />
          <div className="absolute bottom-5 left-[60%] w-2.5 h-2.5 rounded-full bg-emerald-400/40 ember-3" />
        </div>
      </div>

      {/* Community Variations - Pinned to Bottom */}
      {character.variations.length > 0 && (
        <div className="flex-shrink-0 border-t border-purple-500/20 bg-gradient-to-b from-purple-950/30 to-background/80 backdrop-blur-sm relative z-10">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm flex items-center gap-2 text-purple-200">
                <Users className="w-4 h-4 text-cyan-400" />
                Community Variations
              </h3>
              <Badge
                variant="secondary"
                className="text-xs bg-cyan-500/20 border border-cyan-500/30 text-cyan-100"
              >
                {character.variations.length}
              </Badge>
            </div>

            {/* Horizontal Scrolling Container with Navigation */}
            <div className="relative group/nav">
              {/* Left Navigation Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-r from-purple-900/90 to-purple-900/70 hover:from-purple-800 hover:to-purple-800 border border-purple-500/50 shadow-lg opacity-0 group-hover/nav:opacity-100 transition-opacity duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  const container =
                    e.currentTarget.parentElement?.querySelector(
                      ".variations-scroll",
                    );
                  if (container) {
                    container.scrollBy({
                      left: -280,
                      behavior: "smooth",
                    });
                  }
                }}
              >
                <ChevronLeft className="w-5 h-5 text-cyan-300" />
              </Button>

              {/* Right Navigation Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-l from-purple-900/90 to-purple-900/70 hover:from-purple-800 hover:to-purple-800 border border-purple-500/50 shadow-lg opacity-0 group-hover/nav:opacity-100 transition-opacity duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  const container =
                    e.currentTarget.parentElement?.querySelector(
                      ".variations-scroll",
                    );
                  if (container) {
                    container.scrollBy({
                      left: 280,
                      behavior: "smooth",
                    });
                  }
                }}
              >
                <ChevronRight className="w-5 h-5 text-cyan-300" />
              </Button>

              {/* Scrollable Container */}
              <div className="variations-scroll flex items-end gap-3 overflow-x-auto pb-2 px-1 scrollbar-hide">
                {character.variations.map(
                  (variation, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.2,
                        delay: index * 0.05,
                      }}
                      className="flex-shrink-0 w-[180px] bg-gradient-to-br from-purple-900/20 via-card/40 to-cyan-900/20 backdrop-blur-sm rounded-xl overflow-hidden border border-purple-500/30 hover:border-cyan-400/60 hover:shadow-lg hover:shadow-cyan-500/20 transition-all cursor-pointer group relative"
                      onClick={() =>
                        onVariationClick?.(variation)
                      }
                    >
                      {/* Magical glow on hover */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/0 via-cyan-500/0 to-purple-500/0 group-hover:from-purple-500/10 group-hover:via-cyan-500/10 group-hover:to-purple-500/10 transition-all duration-500 pointer-events-none" />

                      {/* Variation Image - Reduced height */}
                      <div className="relative aspect-[4/3] bg-gradient-to-br from-purple-950/50 to-cyan-950/50 overflow-hidden">
                        <ImageWithFallback
                          src={variation.image}
                          alt={variation.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      {/* Variation Info - Compact */}
                      <div className="p-3 relative z-10">
                        <h4 className="text-xs mb-0.5 truncate text-purple-100 group-hover:text-cyan-100 transition-colors">
                          {variation.name}
                        </h4>
                        <div className="flex items-center gap-1 text-xs">
                          <span className="text-purple-300/70 truncate group-hover:text-cyan-300/70 transition-colors text-[10px]">
                            {variation.creator}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-16 relative overflow-hidden">
      {/* Magical background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-2 h-2 bg-purple-500 rounded-full sparkle" />
        <div className="absolute top-40 right-20 w-3 h-3 bg-cyan-400 rounded-full sparkle animation-delay-1000" />
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-purple-400 rounded-full sparkle animation-delay-2000" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl mb-4 magical-text-glow flex flex-col items-center gap-3">
            <span>3D Character Gallery by</span>
            <a
              href="https://marketplace.secondlife.com/en-US/stores/227046"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 hover:scale-105 transition-transform duration-300 group"
            >
              <ImageWithFallback
                src="https://pub-66698334b4114bd7a63eac5daad9a106.r2.dev/BeSpoke/BeSpoke.png"
                alt="BeSpoke Logo"
                className="h-12 w-auto object-contain"
                style={{
                  filter: 'sepia(0.6) hue-rotate(230deg) saturate(3) brightness(1.1) contrast(1.2) drop-shadow(0 0 10px rgba(139, 92, 246, 0.8)) drop-shadow(0 0 20px rgba(139, 92, 246, 0.5))',
                }}
              />
            </a>
            <span className="text-3xl">in Second Life</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore our collection of stunning 3D characters
            designed for Second Life. Each character tells a
            unique story.
          </p>
        </motion.div>

        {/* Quick Navigation Grid */}
        <div className="mb-12">
          <div className="bg-card/30 backdrop-blur-sm border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Grid3x3 className="w-5 h-5 text-primary" />
                <h2 className="text-xl">Quick Navigation</h2>
              </div>
              <Badge variant="secondary">
                {gridLoadedCount} / {characters.length}
              </Badge>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 mb-6">
              {gridCharacters.map((character, index) => (
                <motion.div
                  key={character.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.2,
                    delay: index * 0.02,
                  }}
                  className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg border-2 border-transparent hover:border-primary transition-all"
                  onClick={() =>
                    handleGridThumbnailClick(character)
                  }
                >
                  <ImageWithFallback
                    src={character.thumbnail || ""}
                    alt={character.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-x-0 bottom-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-xs truncate">
                      {character.name}
                    </p>
                  </div>
                  {character.featured && (
                    <div className="absolute top-1 right-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                      ★
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Load More Grid Button */}
            {hasMoreGrid && (
              <div className="flex justify-center">
                <Button
                  onClick={handleLoadMoreGrid}
                  disabled={isLoadingMoreGrid}
                  variant="secondary"
                  size="sm"
                  className="gap-2"
                >
                  {isLoadingMoreGrid ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4" />
                      Load More
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Main 3D Character Display Area */}
        <div className="space-y-12 mb-12">
          {mainCharacters.map((character, index) => (
            <motion.div
              key={character.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group h-[1050px]"
            >
              {/* Magical glow border effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-cyan-500/20 to-emerald-500/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Main card */}
              <div className="relative h-full bg-gradient-to-br from-card/40 via-card/60 to-card/40 backdrop-blur-md border border-purple-500/30 rounded-3xl overflow-hidden shadow-2xl">
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div className="grid lg:grid-cols-[60%_40%] w-full h-full gap-0 relative z-10">
                  {/* Left: 3D Viewer - 60% width */}
                  <div className="relative w-full h-full bg-gradient-to-br from-purple-950/20 via-background/40 to-cyan-950/20 threed-viewer-container">
                    {/* Accent corner decorations */}
                    <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-transparent rounded-br-full opacity-60" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-cyan-500/20 to-transparent rounded-tr-full opacity-60" />

                    {/* Fantasy ember particles behind 3D model */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      {/* Floating embers */}
                      <div className="absolute bottom-[20%] left-[15%] w-3 h-3 rounded-full bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 ember-1 opacity-70" />
                      <div className="absolute bottom-[30%] right-[20%] w-2.5 h-2.5 rounded-full bg-gradient-to-br from-orange-600 via-amber-500 to-yellow-400 ember-2 opacity-60" />
                      <div className="absolute bottom-[15%] left-[40%] w-2 h-2 rounded-full bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 ember-3 opacity-75" />
                      <div
                        className="absolute bottom-[25%] right-[35%] w-3 h-3 rounded-full bg-gradient-to-br from-orange-500 via-amber-400 to-yellow-500 ember-1"
                        style={{ animationDelay: "2s" }}
                      />
                      <div
                        className="absolute bottom-[10%] left-[60%] w-2 h-2 rounded-full bg-gradient-to-br from-red-600 via-orange-500 to-amber-500 ember-2"
                        style={{ animationDelay: "3s" }}
                      />
                      <div
                        className="absolute bottom-[35%] left-[25%] w-2.5 h-2.5 rounded-full bg-gradient-to-br from-orange-400 via-yellow-500 to-amber-500 ember-3"
                        style={{ animationDelay: "1.5s" }}
                      />

                      {/* Magical particles */}
                      <div className="absolute bottom-[40%] right-[15%] w-1.5 h-1.5 rounded-full bg-purple-400 particle-1 opacity-60" />
                      <div className="absolute bottom-[45%] left-[30%] w-1 h-1 rounded-full bg-cyan-400 particle-2 opacity-50" />
                      <div
                        className="absolute bottom-[20%] right-[45%] w-1.5 h-1.5 rounded-full bg-emerald-400 particle-1"
                        style={{ animationDelay: "4s" }}
                      />
                    </div>

                    <ThreeDViewer
                      modelUrl={character.url}
                      modelColor={character.fallbackColor}
                      realTimeConfig={initializeCameraSettings(
                        character.url,
                      )}
                    />

                    {/* 3D Controls Hint - No background */}
                    <div className="absolute bottom-6 left-6 right-6 p-4 text-xs pointer-events-none">
                      <div
                        className="flex items-center justify-between gap-4 text-purple-100"
                        style={{
                          textShadow:
                            "0 2px 8px rgba(0,0,0,0.8), 0 0 4px rgba(0,0,0,0.6)",
                        }}
                      >
                        <span className="flex items-center gap-1.5">
                          <span className="text-purple-400">
                            🖱️
                          </span>{" "}
                          Scroll to zoom
                        </span>
                        <span className="flex items-center gap-1.5">
                          {/*<span className="text-cyan-400">🖱️</span> Middle-click + drag*/}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="text-emerald-400">
                            ✨
                          </span>{" "}
                          Hover to interact
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Details and Variations - 40% width */}
                  <div className="w-full h-full overflow-hidden bg-gradient-to-bl from-purple-950/30 via-background/50 to-cyan-950/30 border-l border-purple-500/30 relative">
                    {/* Accent corner decorations */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-500/20 to-transparent rounded-bl-full opacity-60" />

                    <ModelDetails
                      character={character}
                      onVariationClick={(variation) =>
                        handleVariationClick(
                          character,
                          variation,
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More Main Button */}
        {hasMoreMain && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center"
          >
            <Button
              size="lg"
              onClick={handleLoadMoreMain}
              disabled={isLoadingMoreMain}
              className="gap-2"
            >
              {isLoadingMoreMain ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <ChevronDown className="w-5 h-5" />
                  Load More Characters ({mainLoadedCount} /{" "}
                  {characters.length})
                </>
              )}
            </Button>
          </motion.div>
        )}
      </div>

      {/* Overlay: Single Model View (when clicking grid thumbnail) */}
      <AnimatePresence>
        {isOverlayOpen && overlayModel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
          >
            <div className="relative w-full h-screen">
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOverlayOpen(false)}
                className="absolute top-6 right-6 z-20 text-white hover:bg-white/10"
              >
                <X className="w-6 h-6" />
              </Button>

              <div className="grid lg:grid-cols-[60%_40%] w-full h-full gap-0">
                {/* Left: 3D Viewer - 60% */}
                <div className="relative w-full h-full bg-gradient-to-br from-purple-950/30 via-background/60 to-cyan-950/30 threed-viewer-container">
                  {/* Accent corner decorations */}
                  <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-purple-500/30 to-transparent rounded-br-full opacity-70" />
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-cyan-500/30 to-transparent rounded-tr-full opacity-70" />

                  {/* Fantasy ember particles behind 3D model */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Floating embers */}
                    <div className="absolute bottom-[20%] left-[15%] w-3 h-3 rounded-full bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 ember-1 opacity-70" />
                    <div className="absolute bottom-[30%] right-[20%] w-2.5 h-2.5 rounded-full bg-gradient-to-br from-orange-600 via-amber-500 to-yellow-400 ember-2 opacity-60" />
                    <div className="absolute bottom-[15%] left-[40%] w-2 h-2 rounded-full bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 ember-3 opacity-75" />
                    <div
                      className="absolute bottom-[25%] right-[35%] w-3 h-3 rounded-full bg-gradient-to-br from-orange-500 via-amber-400 to-yellow-500 ember-1"
                      style={{ animationDelay: "2s" }}
                    />
                    <div
                      className="absolute bottom-[10%] left-[60%] w-2 h-2 rounded-full bg-gradient-to-br from-red-600 via-orange-500 to-amber-500 ember-2"
                      style={{ animationDelay: "3s" }}
                    />
                    <div
                      className="absolute bottom-[35%] left-[25%] w-2.5 h-2.5 rounded-full bg-gradient-to-br from-orange-400 via-yellow-500 to-amber-500 ember-3"
                      style={{ animationDelay: "1.5s" }}
                    />

                    {/* Magical particles */}
                    <div className="absolute bottom-[40%] right-[15%] w-1.5 h-1.5 rounded-full bg-purple-400 particle-1 opacity-60" />
                    <div className="absolute bottom-[45%] left-[30%] w-1 h-1 rounded-full bg-cyan-400 particle-2 opacity-50" />
                    <div
                      className="absolute bottom-[20%] right-[45%] w-1.5 h-1.5 rounded-full bg-emerald-400 particle-1"
                      style={{ animationDelay: "4s" }}
                    />
                  </div>

                  <ThreeDViewer
                    modelUrl={overlayModel.url}
                    modelColor={overlayModel.fallbackColor}
                    realTimeConfig={initializeCameraSettings(
                      overlayModel.url,
                    )}
                  />

                  {/* 3D Controls Hint - No background */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 text-xs pointer-events-none">
                    <div
                      className="flex items-center justify-between gap-4 text-purple-100"
                      style={{
                        textShadow:
                          "0 2px 8px rgba(0,0,0,0.8), 0 0 4px rgba(0,0,0,0.6)",
                      }}
                    >
                      <span className="flex items-center gap-1.5">
                        <span className="text-purple-400">
                          🖱️
                        </span>{" "}
                        Scroll to zoom
                      </span>
                      <span className="flex items-center gap-1.5">
                        {/*<span className="text-cyan-400">🖱️</span> Middle-click + drag*/}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="text-emerald-400">
                          ✨
                        </span>{" "}
                        Hover to interact
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Details and Variations - 40% */}
                <div className="w-full h-full bg-gradient-to-bl from-purple-950/40 via-background/70 to-cyan-950/40 overflow-hidden border-l border-purple-500/40 relative">
                  {/* Accent corner decoration */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-emerald-500/30 to-transparent rounded-bl-full opacity-70" />

                  <ModelDetails
                    character={overlayModel}
                    onVariationClick={(variation) =>
                      handleVariationClick(
                        overlayModel,
                        variation,
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Variation Showcase Overlay (when clicking a variation) */}
      <AnimatePresence>
        {isVariationOverlayOpen && selectedVariation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-sm flex items-center justify-center p-8"
            onClick={() => setIsVariationOverlayOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full bg-card/90 backdrop-blur-sm rounded-2xl overflow-hidden border border-border shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsVariationOverlayOpen(false)}
                className="absolute top-4 right-4 z-10 text-white hover:bg-white/10"
              >
                <X className="w-6 h-6" />
              </Button>

              <div className="grid md:grid-cols-[60%_40%]">
                {/* Left: Variation Image - 60% */}
                <div className="relative bg-background flex items-center justify-center p-8 min-h-[500px]">
                  <ImageWithFallback
                    src={selectedVariation.variation.image}
                    alt={selectedVariation.variation.name}
                    className="max-w-full max-h-[600px] object-contain"
                  />
                </div>

                {/* Right: Variation Details - 40% */}
                <div className="p-8 flex flex-col justify-center bg-card/50">
                  <div className="mb-4">
                    <Badge
                      variant="secondary"
                      className="mb-3 text-xs"
                    >
                      Variation of{" "}
                      {selectedVariation.model.name}
                    </Badge>
                    <h2 className="text-3xl mb-3">
                      {selectedVariation.variation.name}
                    </h2>
                  </div>

                  {selectedVariation.variation.description && (
                    <p className="text-muted-foreground mb-6">
                      {selectedVariation.variation.description}
                    </p>
                  )}

                  <div className="bg-card/50 border border-border/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="text-sm text-muted-foreground">
                        Created by
                      </span>
                    </div>
                    {selectedVariation.variation.creatorLink ? (
                      <a
                        href={
                          selectedVariation.variation
                            .creatorLink
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg text-primary hover:underline flex items-center gap-2"
                      >
                        {selectedVariation.variation.creator}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    ) : (
                      <p className="text-lg">
                        {selectedVariation.variation.creator}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}