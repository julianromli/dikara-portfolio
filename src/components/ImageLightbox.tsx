import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { SelectedImage } from '../types/portfolio';

type ImageLightboxProps = {
  selectedImage: SelectedImage | null;
  onClose: () => void;
};

export function ImageLightbox({ selectedImage, onClose }: ImageLightboxProps) {
  return (
    <AnimatePresence>
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 sm:p-8 backdrop-blur-sm"
          onClick={onClose}
        >
          <button
            type="button"
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
            onClick={onClose}
          >
            <X className="w-8 h-8" />
          </button>
          <motion.div
            key={selectedImage.img}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="max-w-6xl w-full max-h-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.img}
              alt={selectedImage.title}
              className="max-w-full max-h-[75vh] object-contain shadow-2xl"
            />
            <div className="mt-8 text-center text-white max-w-2xl">
              <h3 className="text-2xl sm:text-3xl font-medium tracking-wider uppercase mb-3">{selectedImage.title}</h3>
              <p className="text-sm text-white/70 leading-relaxed">{selectedImage.desc || selectedImage.cat}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
