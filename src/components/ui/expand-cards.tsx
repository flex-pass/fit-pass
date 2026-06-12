"use client";

import { useState } from "react";

const images = [
  "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
  "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
  "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&q=80",
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
  "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=800&q=80",
  "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80",
  "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80",
  "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&q=80",
];

export default function ExpandOnHover() {
  const [expandedImage, setExpandedImage] = useState(3);

  const getImageWidth = (index: number) =>
    index === expandedImage ? "28rem" : "5rem";

  return (
    <div className="w-full bg-zinc-950 py-24 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-white tracking-tight">Fitness Knowledge <span className="text-brand-primary">That Moves With You</span></h2>
        <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
          From workout routines and nutrition tips to gym recommendations and wellness trends, stay informed on your fitness journey.
        </p>
      </div>

      <div className="relative flex items-center justify-center transition-all duration-300 ease-in-out w-full">
        <div className="w-full overflow-hidden">
          <div className="flex w-full items-center justify-center overflow-hidden">
            <div className="relative w-full max-w-6xl px-5">
              <div className="flex w-full items-center justify-center gap-2">
                {images.map((src, idx) => (
                  <div
                    key={idx}
                    className="relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-500 ease-out border border-zinc-800"
                    style={{
                      width: getImageWidth(idx + 1),
                      height: "28rem",
                    }}
                    onMouseEnter={() => setExpandedImage(idx + 1)}
                  >
                    {/* Dark gradient overlay so images blend better with dark theme */}
                    <div className="absolute inset-0 bg-black/30 pointer-events-none transition-opacity duration-500" style={{ opacity: expandedImage === idx + 1 ? 0 : 1 }} />
                    
                    <img
                      className="w-full h-full object-cover object-center"
                      src={src}
                      alt={`Fitness Image ${idx + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
