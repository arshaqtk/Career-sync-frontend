import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface CareerSyncLogoProps {
  showText?: boolean;
  className?: string;
}

const CareerSyncLogo = ({ showText = true, className }: CareerSyncLogoProps) => {
  const navigate = useNavigate();
  return (
    <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" 
    onClick={() => navigate("/")}>
  <defs>
    <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#06b6d4" />
      <stop offset="100%" stop-color="#4f46e5" />
    </linearGradient>
  </defs>
  <g transform="translate(4, 4)">
    <path d="M16 2L2 16h8v14l14-14h-8L22 2z" fill="url(#brandGradient)" />
  </g>

      <g transform={showText ? "translate(4, 4)" : "translate(4, 4)"}>
        <path d="M16 2L2 16h8v14l14-14h-8L22 2z" fill="url(#brandGradient)" />
      </g>
      {showText && (
        <text x="45" y="28" className="fill-foreground transition-colors duration-300" style={{ font: "700 22px 'Segoe UI', sans-serif", letterSpacing: "-0.5px" }}>
          Career<tspan fill="url(#brandGradient)">Sync</tspan>
        </text>
      )}
      </svg>
  );
};

export default CareerSyncLogo;