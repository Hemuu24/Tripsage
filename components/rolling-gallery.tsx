"use client"

import { useEffect, useRef, useState } from "react"

const destinations = [
  { name: "Bali, Indonesia", image: "/images/bali-temple.png" },
  { name: "Tokyo, Japan", image: "/images/tokyo-street.png" },
  { name: "Santorini, Greece", image: "/images/santorini-sunset.png" },
  { name: "Machu Picchu, Peru", image: "/images/machu-picchu.png" },
  { name: "Iceland", image: "/images/iceland-landscape.png" },
  { name: "Morocco", image: "/images/morocco-market.png" },
  { name: "Swiss Alps", image: "/images/swiss-alps.png" },
  { name: "Maldives", image: "/images/maldives-beach.png" },
]

export function RollingGallery() {
  const [offset, setOffset] = useState(0)
  const requestRef = useRef<number | null>(null)
  const speed = 0.5 // px per frame (slower)
  const cardWidth = 400 + 32 // w-96 + gap-8
  const totalCards = destinations.length * 3 // tripled for seamless loop
  const totalWidth = cardWidth * totalCards

  // Tripled array for seamless loop
  const galleryImages = [...destinations, ...destinations, ...destinations]

  // Animation effect
  useEffect(() => {
    let running = true
    function animate() {
      setOffset(prev => {
        let next = prev + speed
        if (next >= cardWidth * destinations.length) {
          // Reset after one full set
          return 0
        }
        return next
      })
      if (running) {
        requestRef.current = requestAnimationFrame(animate)
      }
    }
    requestRef.current = requestAnimationFrame(animate)
    return () => {
      running = false
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
    }
  }, [])

  // Pause on hover
  const [paused, setPaused] = useState(false)
  useEffect(() => {
    if (paused) {
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
    } else {
      // Restart animation if unpaused
      requestRef.current = requestAnimationFrame(function animate() {
        setOffset(prev => {
          let next = prev + speed
          if (next >= cardWidth * destinations.length) {
            return 0
          }
          return next
        })
        if (!paused) {
          requestRef.current = requestAnimationFrame(animate)
        }
      })
    }
    // eslint-disable-next-line
  }, [paused])

  return (
    <div
      className="w-full overflow-hidden py-8 relative"
      style={{ height: 320 }} // h-80 for larger images
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="absolute top-0 left-0 flex gap-8"
        style={{
          width: totalWidth,
          transform: `translateX(-${offset}px)`,
          transition: paused ? "none" : "transform 0.016s linear",
        }}
      >
        {galleryImages.map((destination, index) => (
          <div
            key={`${destination.name}-${index}`}
            className="relative flex-shrink-0 w-96 h-80 border-2 border-border overflow-hidden group cursor-pointer bg-card shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={destination.image}
              alt={destination.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-background">
              <h3 className="text-xl font-display font-bold drop-shadow-lg">{destination.name}</h3>
            </div>
            <div className="absolute inset-0 bg-foreground/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>
    </div>
  )
}
