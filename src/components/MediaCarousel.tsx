import { useEffect, useRef, useState } from 'react'
import { TMediaCategory } from '@/types'
import { MediaCard } from '@/components'

interface IMediaSwiperProps {
  mediaData: TMediaCategory
}

export default function MediaCarousel({ mediaData }: IMediaSwiperProps) {
  const { categoryName, media } = mediaData
  const [isMouseOver, setIsMouseOver] = useState(false)

  const carouselRef = useRef<HTMLDivElement>(null)

  // Efecto para el desplazamiento del carrusel en WheelEvent
  useEffect(() => {
    let animationFrameId: number | null = null
    let targetScrollLeft = 0

    const smoothScroll = () => {
      if (!carouselRef.current) return

      const currentScrollLeft = carouselRef.current.scrollLeft
      const diff = targetScrollLeft - currentScrollLeft
      const step = diff * 0.5 // Ajustar la velocidad de desplazamiento

      if (Math.abs(diff) > 1) {
        carouselRef.current.scrollLeft += step
        animationFrameId = requestAnimationFrame(smoothScroll)
      } else {
        carouselRef.current.scrollLeft = targetScrollLeft
      }
    }

    const handleWheel = (e: WheelEvent) => {
      if (isMouseOver && carouselRef.current) {
        e.preventDefault()
        targetScrollLeft = carouselRef.current.scrollLeft + e.deltaY

        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId)
        }
        animationFrameId = requestAnimationFrame(smoothScroll)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [isMouseOver])

  return (
    <section className="h-40 space-y-0.5 px-4 md:space-y-2">
      <h2 className="text_shadow text-fluid-subtitle font-semibold">{categoryName}</h2>

      <div
        className="relative md:ml-2"
        onMouseEnter={() => setIsMouseOver(true)}
        onMouseLeave={() => setIsMouseOver(false)}
      >
        <div
          className="ml-4 flex items-center space-x-0.5 overflow-x-scroll !scrollbar-track-transparent !scrollbar-thumb-[#DC262682] scrollbar-hide md:space-x-2.5 md:p-2 md:hover:!scrollbar-thin"
          ref={carouselRef}
        >
          {media &&
            media.length &&
            media
              .filter((item) => item.backdrop_path !== null && item.poster_path !== null)
              .map((item) => <MediaCard key={item.id} mediaItem={item} />)}
        </div>
      </div>
    </section>
  )
}
