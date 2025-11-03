import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn, ZoomOut, X } from "lucide-react";

import { ImageZoomProps } from "./ImageZoom.types";


export default function ZoomImage({ src, alt = "", className = "" }: ImageZoomProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [zoom, setZoom] = useState(1);

    const handleZoomIn = () => setZoom((z) => Math.min(z + 0.25, 3));
    const handleZoomOut = () => setZoom((z) => Math.max(z - 0.25, 1));
    const handleReset = () => setZoom(1);

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
                <div className="absolute bottom-0 right-0 w-12 h-10 rounded bg-[#26406C] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <ZoomIn className="text-white w-5 h-5" />
                </div>
            </div>

            {/* --- MODAL DE ZOOM --- */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => {
                            setIsOpen(false);
                            handleReset();
                        }}
                    >
                        <motion.div
                            className="relative"
                            onClick={(e) => e.stopPropagation()}
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        >
                            <img
                                src={src}
                                alt={alt}
                                className="max-w-[90vw] max-h-[80vh] object-contain transition-transform duration-200"
                                style={{ transform: `scale(${zoom})` }}
                            />

                            {/* --- CONTROLES --- */}
                            <div className="absolute top-3 right-3 flex gap-2">
                                <button
                                    onClick={handleZoomIn}
                                    className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg"
                                >
                                    <ZoomIn size={20} />
                                </button>
                                <button
                                    onClick={handleZoomOut}
                                    className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg"
                                >
                                    <ZoomOut size={20} />
                                </button>
                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        handleReset();
                                    }}
                                    className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}