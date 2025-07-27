"use client"

import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps"

interface Destination {
  id: number
  name: string
  lat: number
  lng: number
  image: string
  price: number[]
  rating: number
  travelers: number
  tags: string[]
  description: string
}

interface WorldMapProps {
  destinations: Destination[]
  onDestinationClick: (destination: Destination) => void
}

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"

export function WorldMap({ destinations, onDestinationClick }: WorldMapProps) {
  return (
    <div className="w-full h-[600px] rounded-lg border border-border relative" style={{ background: '#1e293b' }}>
      <ComposableMap
        projection="geoEqualEarth"
        width={900}
        height={500}
        style={{ width: "100%", height: "100%", background: "#1e293b" }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo: any) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#22223b"
                stroke="#fff"
                style={{
                  default: { outline: "none" },
                  hover: { fill: "#334155", outline: "none" },
                  pressed: { fill: "#334155", outline: "none" },
                }}
              />
            ))
          }
        </Geographies>
        {destinations.map((destination) => (
          <Marker
            key={destination.id}
            coordinates={[destination.lng, destination.lat]}
            onClick={() => onDestinationClick(destination)}
          >
            <circle
              r={8}
              fill="#F59E0B"
              stroke="#fff"
              strokeWidth={2}
              className="cursor-pointer transition-all duration-200 hover:fill-red-500"
            />
            <text
              textAnchor="middle"
              y={-16}
              style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 12, fill: '#fff', textShadow: '0 1px 4px #000' }}
            >
              {destination.name.split(",")[0]}
            </text>
          </Marker>
        ))}
      </ComposableMap>
      <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm p-3 rounded-lg border border-border">
        <p className="text-sm text-muted-foreground">
          🖱️ Drag to move • 🔍 Scroll to zoom • 🎯 Click markers
        </p>
      </div>
    </div>
  )
}
