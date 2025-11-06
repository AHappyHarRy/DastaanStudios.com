import { motion } from "motion/react";
import {
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import {
  ArrowRight,
  Sparkles,
  Wand2,
  Palette,
  Box,
  Zap,
  Eye,
  Heart,
  Calendar,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  timelineMilestones,
  timelineColors,
} from "./TimelineConfig";

interface HomePageProps {
  onNavigate: (section: string) => void;
}

// Creative Timeline Component
function CreativeTimeline() {
  // Helper function to check if milestone has an image
  const hasImage = (
    milestone: (typeof timelineMilestones)[0],
  ) => {
    return (
      (milestone.imageUrl &&
        milestone.imageUrl.trim() !== "") ||
      (milestone.imageQuery &&
        milestone.imageQuery.trim() !== "")
    );
  };

  // Helper function to get the correct image URL
  const getImageUrl = (
    milestone: (typeof timelineMilestones)[0],
  ) => {
    // Use imageUrl if provided, otherwise fall back to Unsplash search
    if (
      milestone.imageUrl &&
      milestone.imageUrl.trim() !== ""
    ) {
      return milestone.imageUrl;
    }
    return `https://source.unsplash.com/600x400/?${encodeURIComponent(milestone.imageQuery || "creative design")}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative mb-20"
    >
      {/* Header */}
      <div className="text-center mb-16">
        <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-400 via-yellow-400 to-green-400 bg-clip-text text-transparent">
          Our Creative Journey
        </h3>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Follow our story of growth, innovation, and creative
          excellence
        </p>
      </div>

      {/* Timeline Container */}
      <div className="relative max-w-6xl mx-auto">
        {/* Vertical Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-orange-400 via-yellow-400 to-green-400 rounded-full hidden md:block" />

        {/* Timeline Milestones */}
        <div className="space-y-16 md:space-y-24">
          {timelineMilestones.map((milestone, index) => {
            const isLeft = index % 2 === 0;
            const imageUrl = getImageUrl(milestone);
            const showImage = hasImage(milestone);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                className="relative"
              >
                {/* Desktop Layout: Alternating Left-Right */}
                <div className="hidden md:grid md:grid-cols-2 gap-8 items-center">
                  {isLeft ? (
                    <>
                      {/* Content on Left */}
                      <div className="text-right pr-12">
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{
                            duration: 0.5,
                            delay: 0.2,
                          }}
                        >
                          <div className="flex items-center justify-end gap-2 mb-3">
                            <Calendar className="w-5 h-5 text-orange-400" />
                            <span className="text-2xl font-bold text-orange-400">
                              {milestone.year}
                            </span>
                          </div>
                          <h4 className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-3">
                            {milestone.title}
                          </h4>
                          <p className="text-gray-300 leading-relaxed">
                            {milestone.description}
                          </p>
                        </motion.div>
                      </div>

                      {/* Image on Right (or empty space if no image) */}
                      <div className="pl-12">
                        {showImage && (
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                            className="relative rounded-2xl overflow-hidden"
                          >
                            <ImageWithFallback
                              src={imageUrl}
                              alt={milestone.title}
                              className="w-full h-64 object-contain"
                            />
                          </motion.div>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Image on Left (or empty space if no image) */}
                      <div className="pr-12">
                        {showImage && (
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                            className="relative rounded-2xl overflow-hidden"
                          >
                            <ImageWithFallback
                              src={imageUrl}
                              alt={milestone.title}
                              className="w-full h-64 object-contain"
                            />
                          </motion.div>
                        )}
                      </div>

                      {/* Content on Right */}
                      <div className="text-left pl-12">
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{
                            duration: 0.5,
                            delay: 0.2,
                          }}
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <Calendar className="w-5 h-5 text-orange-400" />
                            <span className="text-2xl font-bold text-orange-400">
                              {milestone.year}
                            </span>
                          </div>
                          <h4 className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-3">
                            {milestone.title}
                          </h4>
                          <p className="text-gray-300 leading-relaxed">
                            {milestone.description}
                          </p>
                        </motion.div>
                      </div>
                    </>
                  )}

                  {/* Center Dot */}
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.1 + 0.2,
                      }}
                      className="w-6 h-6 bg-orange-500 rounded-full border-4 border-gray-900 shadow-lg shadow-orange-500/50"
                    />
                  </div>
                </div>

                {/* Mobile Layout: Stacked */}
                <div className="md:hidden">
                  <div className="flex flex-col space-y-4">
                    {/* Year Badge */}
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-orange-500 rounded-full shadow-lg shadow-orange-500/50" />
                      <span className="text-xl font-bold text-orange-400">
                        {milestone.year}
                      </span>
                    </div>

                    {/* Image */}
                    {showImage && (
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="relative rounded-2xl overflow-hidden"
                      >
                        <ImageWithFallback
                          src={imageUrl}
                          alt={milestone.title}
                          className="w-full h-48 object-contain"
                        />
                      </motion.div>
                    )}

                    {/* Content */}
                    <div className="mt-2">
                      <h4 className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-3">
                        {milestone.title}
                      </h4>
                      <p className="text-gray-300 leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

export function HomePage({ onNavigate }: HomePageProps) {
  const [hoveredRealm, setHoveredRealm] = useState<
    "ui" | "3d" | null
  >(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = useCallback((realm: "ui" | "3d") => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsTransitioning(true);

    // Debounce the hover state change
    timeoutRef.current = setTimeout(() => {
      setHoveredRealm(realm);
      setIsTransitioning(false);
    }, 50);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsTransitioning(true);

    timeoutRef.current = setTimeout(() => {
      setHoveredRealm(null);
      setIsTransitioning(false);
    }, 100);
  }, []);

  return (
    <>
      {/* Main Hero Section with Split - Extended for continuation effect */}
      <div className="h-[120vh] relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        {/* Floating magical embers */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {/* Golden embers */}
          <div
            className="absolute w-3 h-2 ember-1 rounded-full"
            style={{
              left: "15%",
              top: "75%",
              background:
                "radial-gradient(ellipse, #ffd700 0%, #ff8c00 60%, transparent 100%)",
              boxShadow:
                "0 0 8px #ff8c00, inset 0 0 4px #ffd700",
            }}
          />
          <div
            className="absolute w-2 h-3 ember-2 rounded-full"
            style={{
              left: "85%",
              top: "20%",
              background:
                "radial-gradient(ellipse, #ffdb58 0%, #ff4500 70%, transparent 100%)",
              boxShadow:
                "0 0 6px #ff4500, inset 0 0 3px #ffdb58",
            }}
          />
          <div
            className="absolute w-4 h-3 ember-3 rounded-full"
            style={{
              left: "25%",
              top: "40%",
              background:
                "radial-gradient(ellipse, #ffd700 0%, #ff6b35 50%, transparent 100%)",
              boxShadow:
                "0 0 10px #ff6b35, inset 0 0 5px #ffd700",
            }}
          />

          {/* Crimson embers */}
          <div
            className="absolute w-3 h-4 ember-1 rounded-full"
            style={{
              left: "60%",
              top: "80%",
              background:
                "radial-gradient(ellipse, #ff4500 0%, #dc143c 60%, transparent 100%)",
              boxShadow:
                "0 0 12px #dc143c, inset 0 0 6px #ff4500",
            }}
          />
          <div
            className="absolute w-2 h-2 ember-2 rounded-full"
            style={{
              left: "75%",
              top: "60%",
              background:
                "radial-gradient(ellipse, #ff6347 0%, #8b0000 70%, transparent 100%)",
              boxShadow:
                "0 0 8px #8b0000, inset 0 0 4px #ff6347",
            }}
          />

          {/* Emerald embers */}
          <div
            className="absolute w-3 h-3 ember-3 rounded-full"
            style={{
              left: "70%",
              top: "25%",
              background:
                "radial-gradient(ellipse, #00ff7f 0%, #228b22 60%, transparent 100%)",
              boxShadow:
                "0 0 10px #228b22, inset 0 0 5px #00ff7f",
            }}
          />
          <div
            className="absolute w-2 h-3 ember-1 rounded-full"
            style={{
              left: "40%",
              top: "15%",
              background:
                "radial-gradient(ellipse, #32cd32 0%, #006400 70%, transparent 100%)",
              boxShadow:
                "0 0 8px #006400, inset 0 0 4px #32cd32",
            }}
          />

          {/* Mixed magical embers */}
          <div
            className="absolute w-4 h-2 ember-2 rounded-full"
            style={{
              left: "90%",
              top: "70%",
              background:
                "radial-gradient(ellipse, #ff69b4 0%, #8b008b 50%, transparent 100%)",
              boxShadow:
                "0 0 12px #8b008b, inset 0 0 6px #ff69b4",
            }}
          />
          <div
            className="absolute w-3 h-4 ember-3 rounded-full"
            style={{
              left: "10%",
              top: "60%",
              background:
                "radial-gradient(ellipse, #ffa500 0%, #ff4500 60%, transparent 100%)",
              boxShadow:
                "0 0 10px #ff4500, inset 0 0 5px #ffa500",
            }}
          />
          <div
            className="absolute w-2 h-2 ember-1 rounded-full"
            style={{
              left: "45%",
              top: "85%",
              background:
                "radial-gradient(ellipse, #00ffff 0%, #008b8b 70%, transparent 100%)",
              boxShadow:
                "0 0 8px #008b8b, inset 0 0 4px #00ffff",
            }}
          />
          <div
            className="absolute w-3 h-3 ember-2 rounded-full"
            style={{
              left: "55%",
              top: "35%",
              background:
                "radial-gradient(ellipse, #ff7f50 0%, #dc143c 60%, transparent 100%)",
              boxShadow:
                "0 0 10px #dc143c, inset 0 0 5px #ff7f50",
            }}
          />
        </div>

        {/* Diagonal Split Gateway Container */}
        <div className="absolute inset-0 hero-vignette">
          {/* Background Layer for 3D Realm */}
          <motion.div
            initial={{
              x:
                typeof window !== "undefined"
                  ? window.innerWidth
                  : 1000,
              opacity: 0,
            }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 1.2,
              delay: 1,
              ease: "easeOut",
            }}
            className={`absolute inset-0 group realm-3d-section pointer-events-none isolation-isolate ${
              hoveredRealm === "3d" && !isTransitioning
                ? "realm-3d-hovered"
                : ""
            }`}
            style={{
              clipPath:
                "polygon(var(--split-top) 0, 100% 0, 100% 100%, var(--split-bottom) 100%)",
              zIndex: hoveredRealm === "3d" ? 25 : 10,
              transition:
                "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  //"url(https://images.unsplash.com/photo-1630397512069-0377e0044f46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzRCUyMGNoYXJhY3RlciUyMG1vZGVsaW5nJTIwc3R1ZGlvfGVufDF8fHx8MTc1OTQxOTgzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral)",
                  "url(https://pub-66698334b4114bd7a63eac5daad9a106.r2.dev/BeSpoke/SphynxCover.jpeg)",
                opacity:
                  hoveredRealm === "3d" && !isTransitioning
                    ? 0.4
                    : 0.2,
                transform:
                  hoveredRealm === "3d" && !isTransitioning
                    ? "scale(1.002)"
                    : "scale(1)",
                transition:
                  "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />
            {/* Gradient Overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-bl from-green-400/30 via-emerald-500/25 to-red-600/30 backdrop-blur-[1px]"
              style={{
                opacity:
                  hoveredRealm === "3d" && !isTransitioning
                    ? 0.7
                    : 0.5,
                transition:
                  "opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />
          </motion.div>

          {/* Background Layer for UI/UX Realm */}
          <motion.div
            initial={{
              x:
                typeof window !== "undefined"
                  ? -window.innerWidth
                  : -1000,
              opacity: 0,
            }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 1.2,
              delay: 0.8,
              ease: "easeOut",
            }}
            className={`absolute inset-0 group realm-ui-section pointer-events-none isolation-isolate ${
              hoveredRealm === "ui" && !isTransitioning
                ? "realm-ui-hovered"
                : ""
            }`}
            style={{
              clipPath:
                "polygon(0 0, var(--split-top) 0, var(--split-bottom) 100%, 0 100%)",
              zIndex: hoveredRealm === "ui" ? 25 : 20,
              transition:
                "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-500"
              style={{
                backgroundImage:
                  //"url(https://images.unsplash.com/photo-1758336717046-c475fc6f45ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwaW50ZXJmYWNlJTIwZGVzaWduJTIwd29ya3NwYWNlfGVufDF8fHx8MTc1OTQxOTgzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral)",
                  "url(https://pub-b120982df7ab4298a0ba52316306264a.r2.dev/ux/bespoke/hud/g2.jpg)",
                opacity: hoveredRealm === "ui" ? 0.4 : 0.2,
                transform:
                  hoveredRealm === "ui"
                    ? "scale(1.005)"
                    : "scale(1)",
              }}
            />
            {/* Gradient Overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-yellow-400/30 via-orange-500/25 to-red-500/30 backdrop-blur-[1px] transition-all duration-500"
              style={{
                opacity: hoveredRealm === "ui" ? 0.8 : 0.6,
              }}
            />
          </motion.div>

          {/* Click Zone for UI/UX Realm - Left Side */}
          <div
            className="absolute inset-0 cursor-pointer z-30 ui-click-zone"
            onClick={() => onNavigate("ui-ux")}
            onMouseEnter={() => handleMouseEnter("ui")}
            onMouseLeave={handleMouseLeave}
            style={{
              clipPath:
                "polygon(0 0, var(--split-top) 0, var(--split-bottom) 100%, 0 100%)",
            }}
          />

          {/* Click Zone for 3D Realm - Right Side */}
          <div
            className="absolute inset-0 cursor-pointer z-30 threed-click-zone"
            onClick={() => onNavigate("3d-characters")}
            onMouseEnter={() => handleMouseEnter("3d")}
            onMouseLeave={handleMouseLeave}
            style={{
              clipPath:
                "polygon(var(--split-top) 0, 100% 0, 100% 100%, var(--split-bottom) 100%)",
            }}
          />

          {/* Central Divider Line - Perfectly Aligned with Diagonal Split */}
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="absolute inset-0 z-40 pointer-events-none"
          >
            <div
              style={{
                position: "absolute",
                inset: 0, // full overlay – important so the clip-path uses the screen, not a 3px strip
                // thickness: change 0.35% to taste (0.25% thinner, 0.5% thicker)
                clipPath:
                  "polygon(var(--split-top) 0, calc(var(--split-top) + 0.35%) 0, calc(var(--split-bottom) + 0.35%) 100%, var(--split-bottom) 100%)",
                background:
                  "linear-gradient(to bottom, #facc15, rgba(255,255,255,0.95) 35%, rgba(255,255,255,0.9) 65%, #10b981)",
                boxShadow:
                  "0 0 30px rgba(255,255,255,0.9), 0 0 60px rgba(255,215,0,0.5), 0 0 90px rgba(0,255,127,0.5)",
              }}
            />
          </motion.div>

          {/* Header with Studio Name - Integrated with Split */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute top-16 left-1/4 transform -translate-x-1/2 z-40"
          >
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-2 drop-shadow-2xl">
                Dastaan Studios
              </h1>
              <p className="text-lg text-white/90 flex items-center justify-center gap-3 drop-shadow-lg">
                <Zap className="w-5 h-5 text-yellow-400" />
                Creative Solutions Through Storytelling
                <Eye className="w-5 h-5 text-green-400" />
              </p>
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute top-52 left-3/4 transform -translate-x-1/2 z-40"
          >
            <div className="inline-flex items-center space-x-2 bg-black/60 border border-yellow-400/40 rounded-full px-6 py-3 backdrop-blur-md shadow-2xl">
              <Wand2 className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-medium">
                Where Stories Become Digital Reality
              </span>
            </div>
          </motion.div>

          {/* UI/UX Realm Content */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="absolute inset-0 flex items-center justify-end pr-[8%] md:pr-[15%] z-20 pointer-events-none"
          >
            <div className="text-center max-w-md pointer-events-auto">
              <motion.div
                className="transform -rotate-12 group-hover:rotate-0 transition-transform duration-500"
                whileHover={{ scale: 1.05 }}
              >
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-6 mb-6 shadow-2xl mx-auto w-fit">
                  <Box className="w-12 h-12 md:w-16 md:h-16 text-white" />
                </div>

                <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent realm-title-ui">
                  3D REALM
                </h2>

                <p className="text-base md:text-lg text-yellow-100 mb-6 leading-relaxed drop-shadow-lg">
                  Enter the realm of digital interfaces where
                  user experience meets artistic vision
                </p>

                <motion.div
                  className="flex items-center gap-3 text-yellow-300 justify-center cursor-pointer"
                  onClick={() => onNavigate("ui-ux")}
                  whileHover={{ scale: 1.1, x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Sparkles className="w-5 h-5" />
                  <span className="text-lg font-semibold">
                    Explore Designs
                  </span>
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* 3D Realm Content */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.7 }}
            className="absolute inset-0 flex items-center justify-start pl-[8%] md:pl-[15%] z-20 pointer-events-none"
          >
            <div className="text-center max-w-md pointer-events-auto">
              <motion.div
                className="transform rotate-12 group-hover:rotate-0 transition-transform duration-500"
                whileHover={{ scale: 1.05 }}
              >
                <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-full p-6 mb-6 shadow-2xl mx-auto w-fit">
                  <Palette className="w-12 h-12 md:w-16 md:h-16 text-white" />
                </div>

                <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 via-emerald-500 to-red-500 bg-clip-text text-transparent realm-title-3d">
                  UI/UX Realm
                </h2>

                <p className="text-base md:text-lg text-green-100 mb-6 leading-relaxed drop-shadow-lg">
                  Step into the dimension of virtual beings and
                  immersive character worlds
                </p>

                <motion.div
                  className="flex items-center gap-3 text-green-300 justify-center cursor-pointer"
                  onClick={() => onNavigate("3d-characters")}
                  whileHover={{ scale: 1.1, x: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Sparkles className="w-5 h-5" />
                  <span className="text-lg font-semibold">
                    Enter Gallery
                  </span>
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Bottom tagline */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
            className="absolute bottom-8 left-3/4 transform -translate-x-1/2 text-center z-40"
          >
            <p className="text-lg text-white/80 italic drop-shadow-lg text-center">
              "Every pixel tells a story, every vertex holds a
              soul"
            </p>
          </motion.div>
        </div>
      </div>

      {/* About Us Section - Overlapping with hero for seamless continuation */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative -mt-20 bg-gradient-to-t from-black/95 via-gray-900/90 to-transparent pt-32 pb-20 backdrop-blur-sm"
        id="about"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-orange-500 to-green-400 bg-clip-text text-transparent">
              About Dastaan Studios
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We are storytellers of the digital age, weaving
              narratives through cutting-edge design and
              immersive 3D experiences. Our passion lies in
              creating digital worlds that not only captivate
              but inspire and engage audiences on a deeper
              level.
            </p>
          </div>

          {/* Timeline Journey */}
          <CreativeTimeline />

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                To bridge the gap between imagination and
                reality through innovative design solutions. We
                believe every project has a unique story waiting
                to be told, and we're here to help tell it
                through stunning visuals and intuitive user
                experiences.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-green-400">
                  <Sparkles className="w-5 h-5" />
                  <span>Innovation-driven design approach</span>
                </div>
                <div className="flex items-center gap-3 text-green-400">
                  <Sparkles className="w-5 h-5" />
                  <span>User-centered experience focus</span>
                </div>
                <div className="flex items-center gap-3 text-green-400">
                  <Sparkles className="w-5 h-5" />
                  <span>Storytelling through technology</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">
                What We Do
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-yellow-400/10 to-orange-500/10 rounded-lg border border-yellow-400/20">
                  <h4 className="font-semibold text-yellow-300 mb-2">
                    UI/UX Design
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Creating intuitive and beautiful digital
                    interfaces that tell compelling stories
                  </p>
                </div>
                <div className="p-4 bg-gradient-to-r from-green-400/10 to-emerald-500/10 rounded-lg border border-green-400/20">
                  <h4 className="font-semibold text-green-300 mb-2">
                    3D Character Design
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Bringing virtual beings to life with
                    detailed modeling and character development
                  </p>
                </div>
                <div className="p-4 bg-gradient-to-r from-purple-400/10 to-pink-500/10 rounded-lg border border-purple-400/20">
                  <h4 className="font-semibold text-purple-300 mb-2">
                    Creative Solutions
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Developing innovative approaches to complex
                    design challenges
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative bg-gradient-to-t from-black/98 via-gray-900/95 to-gray-800/90 py-20"
        id="team"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 via-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              The creative minds behind Dastaan Studios, each
              bringing unique expertise and passion to every
              project.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center group"
            >
              <div className="w-40 h-40 mx-auto mb-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 p-1 group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                  <span className="text-4xl font-bold text-yellow-400">
                    HH
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-yellow-400 mb-2">
                AHappyHarRy
              </h3>
              <p className="text-green-400 mb-3">
                Technical Artist
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Bridges art and engineering to build our
                end-to-end character pipeline (modeling, custom
                rigs, shaders, HUDs, optimization). Obsessive
                about usability, polish, and real-time
                performance.
              </p>
            </motion.div>

            {/* Team Member 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center group"
            >
              <div className="w-40 h-40 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 p-1 group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                  <span className="text-4xl font-bold text-green-400">
                    M
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-green-400 mb-2">
                Mud
              </h3>
              <p className="text-yellow-400 mb-3">
                Chief of Chiefs
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Orchestrates operations, hiring, vendor
                relations, and delivery. Safeguards standards,
                clears roadblocks, and turns strategy into
                shipped results.
              </p>
            </motion.div>

            {/* Team Member 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center group"
            >
              <div className="w-40 h-40 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 p-1 group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                  <span className="text-4xl font-bold text-purple-400">
                    X
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-purple-400 mb-2">
                Xain
              </h3>
              <p className="text-orange-400 mb-3">
                Creative Director
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Leads vision, worldbuilding, and brand narrative
                across 2D, 3D, and UI/UX. Ensures every pixel
                supports the story and pushes a consistent,
                premium look.
              </p>
            </motion.div>

            {/* Team Member 4 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center group"
            >
              <div className="w-40 h-40 mx-auto mb-6 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 p-1 group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                  <span className="text-4xl font-bold text-cyan-400">
                    M
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-cyan-400 mb-2">
                Minahil
              </h3>
              <p className="text-orange-400 mb-3">
                UI/UX Designer
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Crafts intuitive user experiences and interface
                designs that bridge human needs with digital
                solutions. Transforms complex interactions into
                seamless, delightful journeys.
              </p>
            </motion.div>
            {/* Team Member 5 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-center group"
            >
              <div className="w-40 h-40 mx-auto mb-6 rounded-full bg-gradient-to-br from-red-400 to-orange-600 p-1 group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                  <span className="text-4xl font-bold text-red-400">
                    M
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-red-400 mb-2">
                Mesmer Macabre
              </h3>
              <p className="text-orange-400 mb-3">
                Environment Artist
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Sculpts immersive worlds and atmospheric spaces
                that tell stories through lighting, texture, and
                composition. Creates the stages where every
                adventure unfolds.
              </p>
            </motion.div>

            {/* Team Member 6 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center group"
            >
              <div className="w-40 h-40 mx-auto mb-6 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 p-1 group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                  <span className="text-4xl font-bold text-teal-400">
                    G
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-teal-400 mb-2">
                Grizzald
              </h3>
              <p className="text-orange-400 mb-3">
                Environment Artist
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Brings fantasy realms to life with detailed
                landscapes and architectural wonders. Masters
                the art of environmental storytelling and
                atmospheric world-building.
              </p>
            </motion.div>

            {/* Team Member 7 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-center group"
            >
              <div className="w-40 h-40 mx-auto mb-6 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 p-1 group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                  <span className="text-4xl font-bold text-pink-400">
                    M
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-pink-400 mb-2">
                Mewtenie
              </h3>
              <p className="text-orange-400 mb-3">
                Communications Manager
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Weaves our studio's narrative across all
                channels, connecting with audiences through
                compelling storytelling. Champions our brand
                voice and builds meaningful community
                engagement.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </>
  );
}