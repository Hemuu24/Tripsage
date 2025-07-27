"use client"

import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, useTexture } from '@react-three/drei'
import * as THREE from 'three'

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

interface WorldGlobeProps {
  destinations: Destination[]
  onDestinationClick: (destination: Destination) => void
}

function Globe({ destinations, onDestinationClick }: { destinations: Destination[], onDestinationClick: (destination: Destination) => void }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hoveredMarker, setHoveredMarker] = useState<number | null>(null)
  
  // Use local Earth texture
  const earthTexture = useTexture('/images/earth-texture.jpg')

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0005 // Slower rotation
    }
  })

  const latLngToVector3 = (lat: number, lng: number, radius: number = 1) => {
    const phi = (90 - lat) * (Math.PI / 180)
    const theta = (lng + 180) * (Math.PI / 180)
    
    const x = -(radius * Math.sin(phi) * Math.cos(theta))
    const z = radius * Math.sin(phi) * Math.sin(theta)
    const y = radius * Math.cos(phi)
    
    return new THREE.Vector3(x, y, z)
  }

  return (
    <>
      {/* Earth Globe with real texture */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 128, 128]} />
        <meshStandardMaterial 
          map={earthTexture}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Destination Markers */}
      {destinations.map((destination) => {
        const position = latLngToVector3(destination.lat, destination.lng, 1.02)
        
        return (
          <group key={destination.id} position={position}>
            {/* Main marker */}
            <mesh
              onClick={() => onDestinationClick(destination)}
              onPointerOver={() => setHoveredMarker(destination.id)}
              onPointerOut={() => setHoveredMarker(null)}
            >
              <sphereGeometry args={[0.025, 16, 16]} />
              <meshStandardMaterial 
                color={hoveredMarker === destination.id ? "#EF4444" : "#F59E0B"}
                emissive={hoveredMarker === destination.id ? "#EF4444" : "#000000"}
                emissiveIntensity={hoveredMarker === destination.id ? 0.8 : 0}
              />
            </mesh>

            {/* Pulse effect for hovered marker */}
            {hoveredMarker === destination.id && (
              <>
                <mesh>
                  <sphereGeometry args={[0.05, 16, 16]} />
                  <meshStandardMaterial 
                    color="#EF4444"
                    transparent
                    opacity={0.3}
                  />
                </mesh>
                <mesh>
                  <sphereGeometry args={[0.08, 16, 16]} />
                  <meshStandardMaterial 
                    color="#EF4444"
                    transparent
                    opacity={0.1}
                  />
                </mesh>
              </>
            )}
          </group>
        )
      })}

      {/* Enhanced stars background */}
      <Stars radius={100} depth={50} count={8000} factor={4} saturation={0} fade speed={1} />
    </>
  )
}

export function WorldGlobe({ destinations, onDestinationClick }: WorldGlobeProps) {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 2.5], fov: 60 }}
        style={{ background: 'linear-gradient(to bottom, #0F172A, #1E293B)' }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <pointLight position={[-10, -10, -10]} intensity={0.8} />
        <pointLight position={[0, 10, 0]} intensity={0.5} />
        
        <Globe destinations={destinations} onDestinationClick={onDestinationClick} />
        
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={1.8}
          maxDistance={4}
          autoRotate={false}
          autoRotateSpeed={0.5}
        />
      </Canvas>
      
      {/* Instructions overlay */}
      <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm p-3 rounded-lg border border-border">
        <p className="text-sm text-muted-foreground">
          🖱️ Drag to rotate • 🔍 Scroll to zoom • 🎯 Click markers
        </p>
      </div>
    </div>
  )
} 