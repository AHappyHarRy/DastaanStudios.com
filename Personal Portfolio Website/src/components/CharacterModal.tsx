import { motion, AnimatePresence } from "motion/react";
import { X, User, Palette, Users } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import { ThreeDViewer } from "./ThreeDViewer";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Character {
  id: string;
  name: string;
  description: string;
  lore: string;
  modelColor: string;
  modelUrl: string;
  tags: string[];
  variations: {
    name: string;
    image: string;
    creator: string;
  }[];
}

interface CharacterModalProps {
  character: Character | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CharacterModal({
  character,
  isOpen,
  onClose,
}: CharacterModalProps) {
  if (!character) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] bg-card/95 backdrop-blur-md border-primary/20 magical-glow">
        <DialogTitle className="sr-only">
          {character.name} - 3D Character Details
        </DialogTitle>
        <DialogDescription className="sr-only">
          View detailed information about {character.name},
          including 3D model preview, character lore, style
          variations, and community showcase.
        </DialogDescription>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >


          <ScrollArea className="max-h-[80vh]">
            <div className="p-4 sm:p-6">
              {/* Header */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-6 lg:mb-8">
                <div className="flex flex-col items-center order-2 lg:order-1">
                  <ThreeDViewer
                    width={280}
                    height={280}
                    modelColor={character.modelColor}
                    modelUrl={character.modelUrl}
                    className="mb-4 sm:mb-6 w-full max-w-[280px]"
                  />
                  <div className="flex flex-wrap gap-2 justify-center">
                    {character.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-primary/10 text-primary border-primary/20 text-xs sm:text-sm"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-center order-1 lg:order-2">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 magical-text-glow">
                    {character.name}
                  </h2>
                  <p className="text-muted-foreground mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                    {character.description}
                  </p>

                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 sm:p-4">
                    <div className="flex items-center mb-2">
                      <User className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                      <span className="font-semibold text-primary text-sm sm:text-base">
                        Character Lore
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {character.lore}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <Tabs
                defaultValue="variations"
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 mb-4 sm:mb-6 bg-primary/10">
                  <TabsTrigger
                    value="variations"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs sm:text-sm"
                  >
                    <Palette className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Style </span>Variations
                  </TabsTrigger>
                  <TabsTrigger
                    value="community"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs sm:text-sm"
                  >
                    <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Community </span>Showcase
                  </TabsTrigger>
                </TabsList>

                <TabsContent
                  value="variations"
                  className="space-y-4 sm:space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {character.variations.map(
                      (variation, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="group relative overflow-hidden rounded-lg border border-primary/20 hover:border-primary/40 transition-all duration-300"
                        >
                          <ImageWithFallback
                            src={variation.image}
                            alt={variation.name}
                            className="w-full h-36 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                            <h4 className="font-semibold text-white mb-1 text-sm sm:text-base">
                              {variation.name}
                            </h4>
                            <p className="text-xs text-gray-300">
                              by {variation.creator}
                            </p>
                          </div>
                          <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <Button
                              size="sm"
                              className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 text-xs sm:text-sm"
                            >
                              <span className="hidden sm:inline">View Full Size</span>
                              <span className="sm:hidden">View</span>
                            </Button>
                          </div>
                        </motion.div>
                      ),
                    )}
                  </div>
                </TabsContent>

                <TabsContent
                  value="community"
                  className="space-y-4 sm:space-y-6"
                >
                  <div className="text-center py-8 sm:py-12 px-4">
                    <Users className="w-12 h-12 sm:w-16 sm:h-16 text-primary/50 mx-auto mb-3 sm:mb-4" />
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 text-muted-foreground">
                      Community Showcase
                    </h3>
                    <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto">
                      Discover how other creators in Second Life
                      have styled and customized this character.
                      Community submissions coming soon!
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </ScrollArea>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}