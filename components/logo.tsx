import Image from 'next/image'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function Logo({ className = '', size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-8 w-auto',
    md: 'h-10 w-auto', 
    lg: 'h-14 w-auto'
  }

  return (
    <div className={`flex items-center ${className}`}>
      <Image
        src="/images/tripsage_logo.png"
        alt="TripSage Logo"
        width={size === 'sm' ? 32 : size === 'md' ? 40 : 56}
        height={size === 'sm' ? 32 : size === 'md' ? 40 : 56}
        className={`${sizeClasses[size]} object-contain`}
        priority
      />
    </div>
  )
} 