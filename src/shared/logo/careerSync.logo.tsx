import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface CareerSyncLogoProps {
  showText?: boolean;
  className?: string;
  textClassName?: string;
}

const CareerSyncLogo = ({ showText = true, className, textClassName }: CareerSyncLogoProps) => {
  const navigate = useNavigate();
  
  return (
    <motion.svg 
      layout
      viewBox={showText ? "0 0 180 40" : "0 0 40 40"} 
      xmlns="http://www.w3.org/2000/svg" 
      className={cn("h-8 cursor-pointer select-none", className)} 
      onClick={() => navigate("/")}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <defs>
        <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>
      </defs>
      
      <g transform="translate(4, 4)">
        <path d="M16 2L2 16h8v14l14-14h-8L22 2z" fill="url(#brandGradient)" />
      </g>

      <AnimatePresence>
        {showText && (
          <motion.text 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            x="45" 
            y="28" 
            className={cn("fill-foreground transition-colors duration-300", textClassName)} 
            style={{ font: "700 22px 'Segoe UI', sans-serif", letterSpacing: "-0.5px" }}
          >
            Career<tspan fill="url(#brandGradient)">Sync</tspan>
          </motion.text>
        )}
      </AnimatePresence>
    </motion.svg>
  );
};

export default CareerSyncLogo;