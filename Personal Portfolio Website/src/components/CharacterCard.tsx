import { motion } from "motion/react";
import { Eye, Sparkles } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ThreeDViewer } from "./ThreeDViewer";

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

interface CharacterCardProps {
  character: Character;
  onSelect: (character: Character) => void;
}

export function CharacterCard({
  character,
  onSelect,
}: CharacterCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -10 }}
    >
      <Card className="bg-card/30 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 hover:magical-glow overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center">
            {/* 3D Model Viewer */}
            <div className="mb-6 relative">
              <ThreeDViewer
                width={250}
                height={250}
                modelColor={character.modelColor}
                modelUrl={character.modelUrl}
                className="mx-auto"
              />
              <div className="absolute top-2 right-2 z-10 pointer-events-none">
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary border-primary/20 backdrop-blur-sm"
                >
                  <Sparkles className="w-3 h-3 mr-1" />
                  Interactive
                </Badge>
              </div>
              {/* Hover instruction */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-10 pointer-events-none">
                <Badge
                  variant="outline"
                  className="bg-background/80 text-xs text-muted-foreground border-primary/20 backdrop-blur-sm"
                >
                  Move mouse to control
                </Badge>
              </div>
            </div>

            {/* Character Info */}
            <h3 className="text-xl font-bold mb-2 magical-text-glow">
              {character.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              {character.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4 justify-center">
              {character.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-xs border-primary/30 text-primary/80"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* View Details Button */}
            <Button
              onClick={() => onSelect(character)}
              className="w-full bg-gradient-to-r from-primary/20 to-chart-2/20 hover:from-primary/30 hover:to-chart-2/30 border border-primary/30 text-foreground"
              variant="outline"
            >
              <Eye className="w-4 h-4 mr-2" />
              View Character Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}