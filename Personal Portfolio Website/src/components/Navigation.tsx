import { motion } from 'motion/react';
import { Sparkles, Palette, Box, House } from 'lucide-react';

interface NavigationProps {
  currentSection: string;
  onNavigate: (section: string) => void;
}

export function Navigation({ currentSection, onNavigate }: NavigationProps) {
  const navItems = [
    { id: 'home', label: 'Home', icon: House },
    { id: 'ui-ux', label: 'UI/UX Design', icon: Palette },
    { id: '3d-characters', label: '3D Characters', icon: Box },
  ];

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-card/50 border-b border-border"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div 
            className="cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => onNavigate('home')}
          >
            <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent realm-title-ui">
              Dastaan Studios
            </h1>
          </motion.div>
          
          <div className="flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentSection === item.id;
              
              return (
                <motion.button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-r from-yellow-400/20 to-orange-500/20 text-yellow-300 border border-yellow-400/30' 
                      : 'text-gray-300 hover:text-yellow-300 hover:bg-gradient-to-r hover:from-yellow-400/10 hover:to-orange-500/10'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}