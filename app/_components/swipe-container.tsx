"use client"

import { ReactNode, useRef, useState, useEffect } from "react"
import { cn } from "@/app/_lib/utils"

interface SwipeContainerProps {
  children: ReactNode
  className?: string
  gap?: number
}

const SwipeContainer = ({
  children,
  className,
  gap = 16,
}: SwipeContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - containerRef.current.offsetLeft)
    setScrollLeft(containerRef.current.scrollLeft)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return
    e.preventDefault()
    const x = e.pageX - containerRef.current.offsetLeft
    const walk = (x - startX) * 2
    containerRef.current.scrollLeft = scrollLeft - walk
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current) return
    const touch = e.touches[0]
    setStartX(touch.pageX - containerRef.current.offsetLeft)
    setScrollLeft(containerRef.current.scrollLeft)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return
    const touch = e.touches[0]
    const x = touch.pageX - containerRef.current.offsetLeft
    const walk = (x - startX) * 1.5
    containerRef.current.scrollLeft = scrollLeft - walk
  }

  // Prevent text selection during drag
  useEffect(() => {
    const handleSelectStart = (e: Event) => {
      if (isDragging) e.preventDefault()
    }

    document.addEventListener("selectstart", handleSelectStart)
    return () => document.removeEventListener("selectstart", handleSelectStart)
  }, [isDragging])

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex cursor-grab overflow-x-auto scroll-smooth active:cursor-grabbing",
        "[&::-webkit-scrollbar]:hidden",
        "[-ms-overflow-style:none]", // IE and Edge
        "[scrollbar-width:none]", // Firefox
        isDragging && "cursor-grabbing",
        className,
      )}
      style={{ gap: `${gap}px` }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      {children}
    </div>
  )
}

export default SwipeContainer
