import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn, ZoomOut, X } from "lucide-react";

interface ZoomImageProps {
  src: string;
  alt?: string;
  className?: string;
}

export default function ZoomImage({ src, alt = "", className = "" }: ZoomImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const imgWrapperRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const handleZoomIn = () => setZoom((z) => Math.min(+(z + 0.25).toFixed(2), 4));
  const handleZoomOut = () => {
    setZoom((z) => Math.max(+(z - 0.25).toFixed(2), 1));
    if (zoom <= 1.25) setOffset({ x: 0, y: 0 });
  };

  const handleReset = () => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;

    dragging.current = true;
    dragStart.current = {
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current || zoom <= 1) return;

    const wrapper = imgWrapperRef.current;
    if (!wrapper) return;

    const newX = e.clientX - dragStart.current.x;
    const newY = e.clientY - dragStart.current.y;

    const maxX = (wrapper.clientWidth * (zoom - 1)) / 2;
    const maxY = (wrapper.clientHeight * (zoom - 1)) / 2;

    // limita o arrasto
    setOffset({
      x: Math.max(Math.min(newX, maxX), -maxX),
      y: Math.max(Math.min(newY, maxY), -maxY),
    });
  };

  const handleMouseUp = () => {
    dragging.current = false;
  };

  return (
    <>
      {/* --- IMAGEM BASE --- */}
      <div
        className={`relative group overflow-hidden cursor-pointer rounded-2xl ${className}`}
        onClick={() => setIsOpen(true)}
      >
        <img
          src={src}
          alt={alt}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />

        {/* --- LUPA --- */}
        <div className="absolute bottom-0 right-0 w-22 h-12 rounded bg-[#26406C] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pl-2 pt-1"
          style={{
            clipPath: "polygon(25% 16%, 100% 0px, 100% 100%, 0% 100%)",
          }}>

          <ZoomIn className="text-white w-6 h-6" />
        </div>
      </div>


      {/* modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onClick={() => {
              //setIsOpen(false);
              //handleReset();
            }}
          >
            <motion.div
              className="relative "
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div
                ref={imgWrapperRef}
                className="relative flex items-center justify-center overflow-hidden rounded-xl bg-black"
                style={{ width: "90vw", height: "100vh" }}
              >
                <img
                  src={src}
                  alt={alt}
                  draggable={false}
                  onMouseDown={handleMouseDown}
                  className="object-contain select-none"
                  style={{
                    transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
                    transition: dragging.current ? "none" : "transform 0.2s ease",
                    cursor: zoom > 1 ? "grab" : "default",
                  }}
                />
              </div>


            </motion.div>
            {/* Controles — sempre iguais, fora da imagem */}
            <div className="absolute bottom-1">
              <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-2 rounded-full border border-white/20 shadow-md">
                <button
                  onClick={handleZoomOut}
                  className="p-1.5 rounded-md hover:bg-white/10 active:scale-95"
                >
                  <ZoomOut className="text-white" size={16} />
                </button>

                <button
                  onClick={handleReset}
                  className="p-1.5 rounded-md hover:bg-white/10 active:scale-95 text-white text-xs"
                >
                  100%
                </button>

                <button
                  onClick={handleZoomIn}
                  className="p-1.5 rounded-md hover:bg-white/10 active:scale-95"
                >
                  <ZoomIn className="text-white" size={16} />
                </button>

                <div className="w-px h-4 bg-white/10 mx-1" />

                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleReset();
                  }}
                  className="p-1.5 rounded-md hover:bg-white/10 active:scale-95"
                >
                  <X className="text-white" size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
