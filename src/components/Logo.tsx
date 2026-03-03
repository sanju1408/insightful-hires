import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { GoogleGenAI } from "@google/genai";

export const Logo = ({ className = "" }: { className?: string }) => {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    const generateLogo = async () => {
      // Check cache first
      const cachedLogo = localStorage.getItem('insightful_hires_logo_3d');
      if (cachedLogo) {
        setLogoUrl(cachedLogo);
        return;
      }

      try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) return;

        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [
              {
                text: 'A high-end, 3D glossy professional recruitment logo. A futuristic hexagonal shield containing a stylized "IH" monogram. The "I" is vibrant lime green (#7ED321) and the "H" is bright sky blue (#0091FF). The monogram is rendered in a premium glass-morphism style with realistic 3D depth, soft shadows, and glowing edges. ISOLATED ON A PURE TRANSPARENT BACKGROUND. NO WHITE BACKGROUND.',
              },
            ],
          },
          config: {
            imageConfig: {
              aspectRatio: "1:1",
            },
          },
        });

        for (const part of response.candidates?.[0]?.content?.parts || []) {
          if (part.inlineData) {
            const base64Logo = `data:image/png;base64,${part.inlineData.data}`;
            setLogoUrl(base64Logo);
            // Cache the result
            localStorage.setItem('insightful_hires_logo_3d', base64Logo);
            break;
          }
        }
      } catch (error) {
        console.error("Error generating 3D logo:", error);
        // Fallback is already handled by the state being null
      }
    };

    generateLogo();
  }, []);

  return (
    <div className={`flex items-center gap-3 font-sans font-bold text-2xl tracking-tight group cursor-pointer ${className}`}>
      <motion.div 
        className="relative w-14 h-14 perspective-1000"
        animate={{ 
          rotateY: [0, 10, -10, 0],
          y: [0, -5, 0]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        {logoUrl ? (
          <motion.img 
            src={logoUrl} 
            alt="Insightful Hires 3D Logo" 
            className="w-full h-full object-contain mix-blend-multiply"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            referrerPolicy="no-referrer"
          />
        ) : (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Hexagonal Shield Fallback */}
            <path 
              d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z" 
              fill="none" 
              stroke="#7ED321" 
              strokeWidth="4" 
              strokeLinejoin="round"
            />
            <path 
              d="M35 30 V70 M50 30 V70 M65 30 V70 M50 50 H65" 
              stroke="#0091FF" 
              strokeWidth="6" 
              strokeLinecap="round"
            />
            <circle cx="35" cy="30" r="4" fill="#7ED321" />
          </svg>
        )}
      </motion.div>
      <span className="flex items-center">
        <motion.span 
          animate={{ color: ['#7ED321', '#69B01B', '#7ED321'] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="text-brand-green"
        >
          Insightful
        </motion.span>
        <motion.span 
          animate={{ color: ['#0091FF', '#0077D1', '#0091FF'] }}
          transition={{ duration: 4, repeat: Infinity, delay: 2 }}
          className="text-brand-blue ml-1"
        >
          Hires
        </motion.span>
      </span>
    </div>
  );
};
