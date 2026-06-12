import React from 'react'
import { BentoCell, BentoGrid, ContainerScale, ContainerScroll } from "@/components/ui/hero-gallery-scroll-animation"
import { Button } from "@/components/ui/button"

const IMAGES = [
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2340&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2340&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2340&auto=format&fit=crop", 
]

export default function HeroGallery() {
  return (
    <ContainerScroll className="h-[250vh] bg-black text-slate-100 border-t border-zinc-900">
      <BentoGrid
        variant="threeCells"
        className="sticky left-0 top-0 h-screen w-full p-4 md:p-8"
      >
        {IMAGES.map((imageUrl, index) => (
          <BentoCell
            key={index}
            className="overflow-hidden rounded-2xl shadow-2xl border border-zinc-800"
          >
            <img
              className="size-full object-cover object-center"
              width="100%"
              height="100%"
              src={imageUrl}
              alt={`FlexPass Gym ${index + 1}`}
            />
          </BentoCell>
        ))}
      </BentoGrid>
      <ContainerScale className="text-center w-full px-4 relative z-10">
        <h2 className="max-w-3xl mx-auto text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white drop-shadow-lg">
          Experience Premium <br className="hidden sm:inline"/>
          <span className="text-brand-primary">Fitness Facilities</span>
        </h2>
        <p className="my-6 max-w-xl mx-auto text-lg text-zinc-300 drop-shadow-md">
          From high-intensity interval training zones to peaceful yoga studios, your FlexPass unlocks the city's absolute top-tier fitness destinations.
        </p>
        <div className="flex items-center justify-center gap-4 mt-8">
          <Button className="bg-brand-primary px-8 py-6 text-base font-bold hover:bg-brand-secondary rounded-xl text-white shadow-lg hover:scale-105 transition-all">
            Browse Gym Network
          </Button>
        </div>
      </ContainerScale>
    </ContainerScroll>
  )
}
