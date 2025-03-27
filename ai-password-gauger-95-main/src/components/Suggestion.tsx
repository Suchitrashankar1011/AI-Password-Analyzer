
import React from 'react';
import { cn } from '@/lib/utils';
import { Lightbulb, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";

interface SuggestionProps {
  suggestions: string[];
  className?: string;
}

const Suggestion: React.FC<SuggestionProps> = ({
  suggestions,
  className
}) => {
  const [copied, setCopied] = useState(false);
  const [suggestedPassword, setSuggestedPassword] = useState("");
  const { toast } = useToast();
  
  // Generate AI-suggested password
  const generateStrongPassword = () => {
    const length = Math.floor(Math.random() * 6) + 16; // 16-21 characters
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+";
    let result = "";

    // Ensure at least one of each character type
    result += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)];
    result += "abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 26)];
    result += "0123456789"[Math.floor(Math.random() * 10)];
    result += "!@#$%^&*()-_=+"[Math.floor(Math.random() * 14)];

    // Fill the rest randomly
    for (let i = 4; i < length; i++) {
      result += charset[Math.floor(Math.random() * charset.length)];
    }

    // Shuffle the result
    return result
      .split("")
      .sort(() => 0.5 - Math.random())
      .join("");
  };

  // Initialize suggestedPassword on component mount
  React.useEffect(() => {
    setSuggestedPassword(generateStrongPassword());
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(suggestedPassword);
    setCopied(true);
    
    toast({
      title: "Password copied!",
      description: "The password has been copied to your clipboard."
    });
    
    // Generate a new password after copying
    setTimeout(() => {
      setSuggestedPassword(generateStrongPassword());
      setCopied(false);
    }, 1000);
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  if (!suggestions.length) return null;

  return (
    <motion.div 
      className={cn(
        "rounded-xl p-5 animate-fade-up backdrop-blur-sm shadow-lg border border-blue-100/60 dark:border-blue-900/30 bg-white/90 dark:bg-slate-900/90",
        "transition-all duration-300 hover:shadow-xl",
        className
      )}
      variants={container}
      initial="hidden"
      animate="show"
      whileHover={{ scale: 1.01 }}
    >
      <motion.div 
        className="flex items-center space-x-3 mb-4"
        variants={item}
      >
        <div className="p-2 rounded-full bg-gradient-to-r from-amber-500/30 to-orange-500/20 flex items-center justify-center">
          <Lightbulb className="w-5 h-5 text-amber-500 dark:text-amber-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">AI Recommendations</h3>
      </motion.div>
      
      <div className="space-y-6">
        {suggestions.length > 0 && (
          <motion.div 
            className="space-y-3"
            variants={item}
          >
            <h3 className="font-medium text-sm uppercase tracking-wider text-muted-foreground">
              Improvement Suggestions:
            </h3>
            <ul className="space-y-3">
              {suggestions.map((suggestion, index) => (
                <motion.li 
                  key={index}
                  className="flex items-start space-x-3 bg-gradient-to-r from-blue-50/90 to-blue-50/60 dark:from-blue-950/60 dark:to-blue-950/30 p-3 rounded-md border border-blue-100/40 dark:border-blue-900/20" 
                  variants={item}
                  whileHover={{ scale: 1.02, x: 3, transition: { duration: 0.2 } }}
                >
                  <div className="mt-0.5 h-5 w-5 rounded-full bg-gradient-to-r from-amber-500/30 to-orange-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400">{index + 1}</span>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">{suggestion}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}

        <motion.div 
          className="space-y-3"
          variants={item}
        >
          <h3 className="font-medium text-sm uppercase tracking-wider text-muted-foreground">
            AI-Generated Strong Password:
          </h3>
          <div className="relative">
            <motion.div 
              className="p-4 pr-16 bg-gradient-to-r from-blue-50/90 to-blue-50/60 dark:from-blue-950/60 dark:to-blue-950/30 rounded-md font-mono text-sm break-all border border-blue-200/50 dark:border-blue-800/30"
              whileHover={{ scale: 1.01 }}
            >
              {suggestedPassword}
            </motion.div>
            <div className="absolute top-0 right-0 h-full flex items-center pr-3">
              <Button
                size="sm"
                variant="outline"
                className="h-9 w-9 p-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800 transition-colors"
                onClick={copyToClipboard}
                aria-label="Copy password"
                disabled={copied}
              >
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <motion.p 
            className="text-xs text-muted-foreground mt-1"
            variants={item}
          >
            Note: Remember to store this password securely if you decide to use it.
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Suggestion;
