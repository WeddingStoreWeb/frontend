import React, { useState,useEffect } from 'react';
import { X } from 'lucide-react';

interface GalleryImage {
  id: number;
  title: string;
  imageURL: string;
}


export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);

  

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/galleries');
        const data = await response.json();
        setGalleryImages(data);
      } catch (error) {
        console.error('Error fetching gallery images:', error);
      }
    };

    fetchGalleryImages();
  }, []);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <h1 className="font-serif text-4xl text-center mb-12">Wedding Gallery</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {galleryImages.map((image) => (
          <div
            key={image.id}
            onClick={() => setSelectedImage(image.imageURL)}
            className="cursor-pointer group relative aspect-[3/4]"
          >
            <img
              src={image.imageURL}
              alt={image.title}
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <p className="text-white font-serif">{image.title}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
          >
            <X className="h-8 w-8" />
          </button>
          <img
            src={selectedImage}
            alt="Gallery"
            className="max-w-full max-h-[90vh] object-contain"
          />
        </div>
      )}
    </div>
  );
}

