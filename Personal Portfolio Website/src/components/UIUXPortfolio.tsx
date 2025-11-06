import { useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { getAllProjects, type UIProjectConfig } from './UIConfig';

export function UIUXPortfolio() {
  // Get all projects from config
  const projects = getAllProjects();

  return (
    <div className="min-h-screen pt-24 pb-16 relative overflow-hidden">
      {/* Floating magical particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Gold/Yellow particles for UI realm */}
        <div className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-60 particle-1" style={{ left: '20%', top: '30%' }} />
        <div className="absolute w-4 h-4 bg-amber-400 rounded-full opacity-50 particle-2" style={{ left: '80%', top: '20%' }} />
        <div className="absolute w-3 h-3 bg-yellow-500 rounded-full opacity-40 particle-1" style={{ left: '70%', top: '40%' }} />
        <div className="absolute w-5 h-5 bg-amber-500 rounded-full opacity-60 particle-2" style={{ left: '25%', top: '75%' }} />
        
        {/* Orange/Fire particles */}
        <div className="absolute w-5 h-5 bg-orange-500 rounded-full opacity-55 particle-1" style={{ left: '65%', top: '65%' }} />
        <div className="absolute w-3 h-3 bg-orange-400 rounded-full opacity-45 particle-2" style={{ left: '45%', top: '15%' }} />
        <div className="absolute w-4 h-4 bg-red-500 rounded-full opacity-50 particle-1" style={{ left: '85%', top: '80%' }} />
        <div className="absolute w-2 h-2 bg-orange-600 rounded-full opacity-65 particle-2" style={{ left: '30%', top: '55%' }} />
        
        {/* Additional golden particles */}
        <div className="absolute w-6 h-6 bg-yellow-300 rounded-full opacity-35 particle-1" style={{ left: '90%', top: '50%' }} />
        <div className="absolute w-3 h-3 bg-amber-300 rounded-full opacity-70 particle-2" style={{ left: '15%', top: '85%' }} />
        <div className="absolute w-4 h-4 bg-yellow-600 rounded-full opacity-45 particle-1" style={{ left: '75%', top: '25%' }} />
        <div className="absolute w-5 h-5 bg-amber-600 rounded-full opacity-55 particle-2" style={{ left: '40%', top: '80%' }} />
      </div>

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 magical-text-glow">
            <span className="bg-gradient-to-r from-primary via-amber-500/80 to-chart-2 bg-clip-text text-transparent">
              UI/UX Design Portfolio
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Crafting intuitive digital experiences where technology meets human emotion
          </p>
        </motion.div>

        {/* Project Cards */}
        <div className="space-y-16">
          {projects.map((project, projectIndex) => (
            <ProjectCard key={project.id} project={project} index={projectIndex} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Separate component for each project card
function ProjectCard({ project, index }: { project: UIProjectConfig; index: number }) {
  const [selectedVariation, setSelectedVariation] = useState(0);
  const currentVariation = project.variations[selectedVariation];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
    >
      <Card className="mb-8 magical-glow bg-card/50 backdrop-blur-sm border-primary/20">
        <CardContent className="p-8 lg:p-12">
          <div className="relative">
            <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
              {/* Main Image Display */}
              <div className="lg:col-span-2 space-y-8">
                {/* Main Image Container */}
                <div className="relative overflow-hidden h-[400px] lg:h-[480px] rounded-3xl bg-gradient-to-br from-orange-500/5 to-amber-400/5 border border-orange-400/20 shadow-xl">
                  <motion.div
                    key={selectedVariation}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="relative w-full h-full"
                  >
                    <ImageWithFallback
                      src={currentVariation.image}
                      alt={currentVariation.name}
                      className="w-full h-full object-contain rounded-3xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-3xl" />
                    
                    {/* Category Badge */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="absolute top-6 left-6"
                    >
                      <Badge className="bg-orange-100/90 text-orange-800 border-orange-300 px-4 py-2 rounded-full backdrop-blur-sm">
                        {currentVariation.category}
                      </Badge>
                    </motion.div>

                    {/* Featured Badge */}
                    {project.featured && (
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="absolute top-6 right-6"
                      >
                        <Badge className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white border-none shadow-lg shadow-orange-500/50 animate-pulse px-4 py-2 rounded-full">
                          Featured
                        </Badge>
                      </motion.div>
                    )}
                  </motion.div>
                </div>

                {/* Thumbnail Gallery */}
                <div className="flex gap-4 justify-center lg:justify-start flex-wrap">
                  {project.variations.map((variation, varIndex) => (
                    <motion.button
                      key={varIndex}
                      onClick={() => setSelectedVariation(varIndex)}
                      className={`relative overflow-hidden rounded-2xl transition-all duration-300 border-2 ${
                        selectedVariation === varIndex 
                          ? 'border-orange-400 scale-105 shadow-lg' 
                          : 'border-gray-300/20 hover:border-orange-300 hover:scale-102'
                      }`}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ImageWithFallback
                        src={variation.image}
                        alt={`${variation.name} preview`}
                        className="w-18 h-18 lg:w-20 lg:h-20 object-contain"
                      />
                      {selectedVariation === varIndex && (
                        <motion.div
                          layoutId={`selectedIndicator-${project.id}`}
                          className="absolute inset-0 bg-orange-400/20 backdrop-blur-[1px] rounded-2xl"
                          transition={{ duration: 0.3 }}
                        />
                      )}
                      {selectedVariation === varIndex && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-400 rounded-full" />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
              
              {/* Content Panel */}
              <div className="lg:col-span-1">
                <div className="bg-card/80 backdrop-blur-sm border border-border rounded-3xl p-8 h-full shadow-lg">
                  <motion.div
                    key={selectedVariation}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="space-y-8 h-full flex flex-col"
                  >
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-orange-100/10 text-orange-300 border-orange-400/20 rounded-full">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    {/* Title */}
                    <div className="space-y-3">
                      <h3 className="text-2xl lg:text-3xl leading-tight bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                        {currentVariation.name}
                      </h3>
                      <div className="w-12 h-1 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full" />
                    </div>

                    {/* Project Metadata */}
                    {(project.client || project.role || project.duration) && (
                      <div className="space-y-2 text-xs">
                        {project.client && (
                          <div className="flex justify-between">
                            <span className="text-orange-300/70">Client</span>
                            <span className="text-orange-100/90">{project.client}</span>
                          </div>
                        )}
                        {project.role && (
                          <div className="flex justify-between">
                            <span className="text-orange-300/70">Role</span>
                            <span className="text-orange-100/90">{project.role}</span>
                          </div>
                        )}
                        {project.duration && (
                          <div className="flex justify-between">
                            <span className="text-orange-300/70">Duration</span>
                            <span className="text-orange-100/90">{project.duration}</span>
                          </div>
                        )}
                        {project.tools && project.tools.length > 0 && (
                          <div className="flex justify-between">
                            <span className="text-orange-300/70">Tools</span>
                            <span className="text-orange-100/90">{project.tools.join(' • ')}</span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed text-base">
                      {currentVariation.description}
                    </p>
                    
                    {/* Insight Section */}
                    <div className="bg-orange-400/5 border border-orange-400/20 rounded-2xl p-6">
                      <div className="flex items-center mb-3">
                        <div className="w-2 h-2 bg-orange-400 rounded-full mr-3" />
                        <span className="text-orange-400 font-medium">Design Approach</span>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {currentVariation.insight}
                      </p>
                    </div>
                    
                    {/* Features */}
                    <div className="flex-1">
                      <h4 className="text-orange-400 mb-4 font-medium">Key Features</h4>
                      <ul className="space-y-3">
                        {currentVariation.features.map((feature, featureIndex) => (
                          <motion.li
                            key={`${selectedVariation}-${featureIndex}`}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + featureIndex * 0.05 }}
                            className="flex items-center text-muted-foreground text-sm"
                          >
                            <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-3 flex-shrink-0" />
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Action Button */}
                    {project.link && (
                      <Button 
                        className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white rounded-2xl"
                        onClick={() => window.open(project.link, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Project
                      </Button>
                    )}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
