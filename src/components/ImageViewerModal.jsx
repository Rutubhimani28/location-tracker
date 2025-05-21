
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { X } from 'lucide-react';
import { motion } from 'framer-motion';

const ImageViewerModal = ({ isOpen, onClose, imageUrl, altText }) => {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 max-w-3xl w-auto bg-transparent border-none shadow-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          <DialogHeader className="sr-only">
            <DialogTitle>{altText || "Image Viewer"}</DialogTitle>
          </DialogHeader>
          <img  class="max-h-[80vh] w-auto rounded-lg object-contain" alt={altText || "Full size activity image"} src="https://images.unsplash.com/photo-1694878981885-7647baf0d957" />
          <DialogClose asChild>
            <button
              className="absolute -top-3 -right-3 bg-slate-800 text-white rounded-full p-1.5 hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500"
              aria-label="Close image viewer"
            >
              <X size={20} />
            </button>
          </DialogClose>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageViewerModal;
