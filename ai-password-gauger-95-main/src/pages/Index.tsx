
import React, { useState, useEffect } from 'react';
import PasswordInput from '@/components/PasswordInput';
import StrengthMeter from '@/components/StrengthMeter';
import AnalysisResult from '@/components/AnalysisResult';
import Suggestion from '@/components/Suggestion';
import ThemeToggle from '@/components/ThemeToggle';
import { analyzePassword, getAIEnhancedSuggestions, type PasswordAnalysis } from '@/utils/passwordAnalyzer';
import { Shield, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const Index = () => {
  const [password, setPassword] = useState('');
  const [analysis, setAnalysis] = useState<PasswordAnalysis>(() => analyzePassword(''));
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Perform analysis when password changes
  useEffect(() => {
    const newAnalysis = analyzePassword(password);
    setAnalysis(newAnalysis);
    
    // Get AI-enhanced suggestions
    const suggestions = getAIEnhancedSuggestions(password);
    setAiSuggestions(suggestions);
    
    // Hide results if password is cleared
    if (password.length === 0) {
      setShowResults(false);
    }
  }, [password]);

  const analyzePasswordHandler = () => {
    if (!password) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis with a delay
    setTimeout(() => {
      // Make sure we have the latest analysis before showing results
      const currentAnalysis = analyzePassword(password);
      setAnalysis(currentAnalysis);
      
      // Update suggestions
      const suggestions = getAIEnhancedSuggestions(password);
      setAiSuggestions(suggestions);
      
      setIsAnalyzing(false);
      setShowResults(true);
    }, 1000);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-950 dark:to-indigo-950 flex flex-col transition-all duration-500 overflow-x-hidden">
      {/* Background elements - Enhanced with animations for both light and dark modes */}
      <div className="fixed inset-0 overflow-hidden z-0">
        {/* Abstract geometric shapes with animations - Enhanced for light mode */}
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-gradient-to-r from-purple-300/60 to-blue-300/50 dark:from-purple-800/20 dark:to-blue-700/10 blur-3xl floating"></div>
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-gradient-to-r from-blue-300/60 to-indigo-300/50 dark:from-blue-800/20 dark:to-indigo-700/10 blur-3xl floating-slow"></div>
        <div className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-emerald-300/60 to-teal-300/50 dark:from-emerald-800/20 dark:to-teal-700/10 blur-3xl floating-fast"></div>
        
        {/* Light beams effect - Enhanced for light mode */}
        <div className="absolute left-1/2 top-10 w-1/2 h-1/2 bg-gradient-to-br from-blue-400/20 to-transparent dark:from-blue-600/5 rotating opacity-80"></div>
        <div className="absolute left-20 top-1/3 w-1/3 h-1/3 bg-gradient-to-br from-purple-400/20 to-transparent dark:from-purple-600/5 rotating-reverse opacity-80"></div>
        
        {/* Particle dots effect for both light and dark modes - Enhanced for light mode */}
        <div className="hidden md:block">
          {Array.from({ length: 25 }).map((_, i) => (
            <div 
              key={i}
              className={`absolute rounded-full ${i % 2 === 0 ? 'bg-blue-500/40 dark:bg-blue-400/30' : 'bg-indigo-400/40 dark:bg-indigo-500/30'} pulse-glow`}
              style={{
                width: `${Math.random() * 5 + 2}px`,
                height: `${Math.random() * 5 + 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
        
        {/* Light mode specific decorative elements - Enhanced opacity */}
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-to-r from-pink-200/60 to-purple-200/50 rounded-full blur-3xl floating-slow dark:opacity-30"></div>
        <div className="absolute top-1/2 right-0 w-32 h-32 bg-gradient-to-l from-yellow-200/60 to-orange-200/50 rounded-full blur-3xl floating dark:opacity-30"></div>
      </div>

      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="container max-w-4xl mx-auto px-4 py-12 md:py-24 z-10 relative flex-grow">
        {/* Header - Enhanced with animations */}
        <motion.header 
          className="mb-10 md:mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="inline-flex items-center justify-center p-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg mb-5 rounded-full shadow-xl border border-blue-100 dark:border-blue-900/50"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <Shield className="w-7 h-7 text-blue-600 dark:text-blue-400" />
          </motion.div>
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 dark:from-blue-400 dark:via-indigo-400 dark:to-violet-400 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Password Strength Analyzer
          </motion.h1>
          <motion.p 
            className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto text-base md:text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Enter your password to analyze its strength using advanced AI techniques.
            We'll provide detailed feedback and suggestions to improve security.
          </motion.p>
        </motion.header>
        
        {/* Main Content */}
        <div className="space-y-8 max-w-2xl mx-auto">
          {/* Password Input Section - Enhanced with transparent background */}
          <motion.div 
            className="animate-fade-up"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="glass-morphism dark:glass-morphism-dark rounded-xl p-1 shadow-xl">
              <PasswordInput 
                value={password} 
                onChange={setPassword} 
                placeholder="Enter your password to analyze" 
                className="w-full"
              />
            </div>
          </motion.div>
          
          {/* Strength Meter - Enhanced animations */}
          <AnimatePresence>
            {password.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <StrengthMeter 
                  score={analysis.score} 
                  strength={analysis.strength} 
                />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Analyze Button - Enhanced animations and style */}
          <AnimatePresence>
            {password.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={analyzePasswordHandler}
                    disabled={!password || isAnalyzing}
                    className="w-full h-12 text-base font-medium shadow-lg hover:shadow-xl transition-all 
                    bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-700 hover:via-indigo-700 hover:to-violet-700
                    dark:from-blue-500 dark:via-indigo-500 dark:to-violet-500 dark:hover:from-blue-600 dark:hover:via-indigo-600 dark:hover:to-violet-600 
                    border-0"
                  >
                    {isAnalyzing ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Analyzing...
                      </span>
                    ) : (
                      "Analyze Password"
                    )}
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Results Section - Enhanced with staggered animations */}
          <AnimatePresence>
            {showResults && (
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <AnalysisResult analysis={analysis} />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <Suggestion suggestions={aiSuggestions} className="mb-8" />
                </motion.div>
                
                {/* Scroll indicator - Enhanced animation */}
                <motion.div 
                  className="flex justify-center text-gray-400 dark:text-gray-600 mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <ArrowDown size={20} />
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Footer - Enhanced style */}
      <footer className="pb-8 pt-16 text-center text-gray-500 dark:text-gray-400 text-sm z-10">
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="backdrop-blur-sm px-4 py-2 rounded-full inline-block bg-white/30 dark:bg-slate-900/30 border border-gray-200/50 dark:border-gray-700/50"
        >
          All analysis is performed locally – your passwords never leave your device.
        </motion.p>
      </footer>
    </div>
  );
};

export default Index;
