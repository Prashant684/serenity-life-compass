
import React from "react";

interface LogoProps {
  type?: "full" | "symbol";
  className?: string;
}

export function Logo({ type = "full", className = "" }: LogoProps) {
  const logoSrc = type === "full" 
    ? "/lovable-uploads/8da56fe6-3a7c-4bed-bf83-1737cd0b0d01.png" 
    : "/lovable-uploads/c6c6ef2f-66c2-4550-a129-ff96d5c09b1b.png";
  
  const altText = type === "full" ? "ynotx Logo" : "ynotx Symbol";
  const defaultHeight = type === "full" ? "h-8" : "h-10";
  
  return (
    <img 
      src={logoSrc} 
      alt={altText} 
      className={`${defaultHeight} ${className}`} 
    />
  );
}
