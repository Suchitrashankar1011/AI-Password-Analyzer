
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChange,
  className,
  placeholder = "Enter your password"
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <motion.div 
      className={cn(
        "relative w-full transition-all duration-300 ease-in-out",
        isFocused ? "scale-[1.01]" : "scale-100",
        className
      )}
      whileHover={{ scale: 1.005 }}
    >
      <Input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full px-4 py-4 text-base md:text-lg rounded-xl",
          "bg-transparent dark:bg-[#111936]", // Transparent in light mode, #111936 in dark mode
          "backdrop-blur-md",
          "border border-white/20 dark:border-white/10",
          "text-gray-800 dark:text-white",
          "focus:border-blue-400 dark:focus:border-blue-500 focus:ring-0",
          "transition-all duration-300 ease-in-out",
          "placeholder:text-gray-500 dark:placeholder:text-white/70",
          "h-14 pr-14", // Ensure right padding for the button
          "shadow-sm dark:shadow-none" // Reduced shadow in dark mode
        )}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <div 
        className="absolute top-1/2 right-4 -translate-y-1/2 flex items-center justify-center"
      >
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className={cn(
            "flex items-center justify-center",
            "w-10 h-10 rounded-full", 
            "bg-white/90 dark:bg-white/10", // More transparent in dark mode
            "text-blue-600 dark:text-blue-400",
            "hover:bg-white hover:shadow-md dark:hover:bg-white/20", // Improved hover state
            "transition-all duration-200 shadow-sm",
            "focus:outline-none focus:ring-2 focus:ring-blue-400/50 dark:focus:ring-blue-600/50"
          )}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default PasswordInput;
