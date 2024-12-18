import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Mail } from "lucide-react";
import axios from "axios";

interface ProductData {
  productID: number;
  name: string;
  baseRentalPrice: number;
  description: string;
  availabilityStatus: string;
  category: number;
  features: string;
}

interface Photo {
  id: number;
  photoURL: string;
  product: number;
  isPrimary: boolean;
}

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductData | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/products/10002`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    const fetchPhotos = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/photos/product/10002`
        );
        const data = await response.json();
        setPhotos(data);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    fetchPhotos();

    fetchProduct();
  }, [id, product?.productID]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission (e.g., send email)
    console.log("Form submitted:", formData);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg">
            {photos.length > 0 && (
              <img
                src={photos[selectedImage].photoURL}
                alt={`${product.name} - View ${selectedImage + 1}`}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="grid grid-cols-4 gap-4">
            {photos.map((photo, index) => (
              <button
                key={photo.id}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square rounded-lg overflow-hidden border-2 ${
                  selectedImage === index
                    ? "border-rose-500"
                    : "border-transparent"
                }`}
              >
                <img
                  src={photo.photoURL}
                  alt={`${product.name} - Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <h1 className="font-serif text-3xl mb-2">{product.name}</h1>
          <p className="text-2xl text-gray-900 mb-6">
            ${product.baseRentalPrice.toLocaleString()}
          </p>

          <div className="prose prose-rose mb-8">
            <h2 className="font-serif text-xl mb-4">Product Details</h2>
            <p>{product.description}</p>

            <h3 className="font-serif text-lg mt-6 mb-2">Features</h3>
            <ul>
              {product.features.split(",").map((feature, index) => (
                <li key={index}>{feature.trim()}</li>
              ))}
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="font-serif text-xl mb-4">
              Inquire About This Product
            </h2>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center bg-rose-600 text-white px-6 py-3 rounded-md hover:bg-rose-700 transition-colors"
            >
              <Mail className="mr-2 h-5 w-5" />
              Send Inquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}


