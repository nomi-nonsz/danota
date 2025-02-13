"use client"

import { useEffect, useRef, useState } from "react"
import type React from "react" // Added import for React

interface DocumentPreviewProps {
  content: string
}

export const DocumentPreview: React.FC<DocumentPreviewProps> = ({ content }) => {
  const [pages, setPages] = useState<string[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    // Simple content splitting logic (you may need a more sophisticated approach)
    const wordsPerPage = 500 // Adjust this number based on your needs
    const words = content.split(" ")
    const newPages = []
    for (let i = 0; i < words.length; i += wordsPerPage) {
      newPages.push(words.slice(i, i + wordsPerPage).join(" "))
    }
    setPages(newPages)
  }, [content])

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth
        const pageWidth = 595 // A4 width in pixels at 72 DPI
        setScale(containerWidth / pageWidth)
      }
    }

    updateScale()
    window.addEventListener("resize", updateScale)
    return () => window.removeEventListener("resize", updateScale)
  }, [])

  return (
    <div ref={containerRef} className="w-full overflow-y-auto border rounded-lg shadow-inner h-[600px]">
      <div className="flex flex-col items-center gap-4 py-4">
        {pages.map((pageContent, index) => (
          <div
            key={index}
            style={{
              width: "595px", // A4 width in pixels at 72 DPI
              height: "842px", // A4 height in pixels at 72 DPI
              transform: `scale(${scale})`,
              transformOrigin: "top center",
            }}
            className="bg-white shadow-md p-8 text-sm text-black"
          >
            <div dangerouslySetInnerHTML={{ __html: pageContent }} />
          </div>
        ))}
      </div>
    </div>
  )
}