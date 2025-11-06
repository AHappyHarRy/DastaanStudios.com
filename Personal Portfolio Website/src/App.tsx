import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { UIUXPortfolio } from './components/UIUXPortfolio';
import { ThreeDCharacterPortfolio } from './components/ThreeDCharacterPortfolio';
import { Footer } from './components/Footer';

export default function App() {
  const [currentSection, setCurrentSection] = useState('home');

  const handleNavigate = (section: string) => {
    setCurrentSection(section);
  };

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'ui-ux':
        return <UIUXPortfolio />;
      case '3d-characters':
        return <ThreeDCharacterPortfolio />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation currentSection={currentSection} onNavigate={handleNavigate} />
      <main className="relative pt-20">
        {renderCurrentSection()}
      </main>
      <Footer currentSection={currentSection} />
    </div>
  );
}