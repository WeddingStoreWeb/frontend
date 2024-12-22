import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Mail, MessageCircle } from "lucide-react";
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

interface FitOption {
  fitOnOptionID: number;
  optionType: string;
  priceAdjustment: number;
  product: number;
}

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductData | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [fitOptions, setFitOptions] = useState<FitOption[]>([]);
  const [selectedFitOption, setSelectedFitOption] = useState<FitOption | null>(
    null
  );

  useEffect(() => {
    const fetchFitOptions = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/fitOnOptions/product/${id}`
        );
        const data = await response.json();
        setFitOptions(data);
        setSelectedFitOption(data[0]); // Select first option by default
      } catch (error) {
        console.error("Error fetching fit options:", error);
      }
    };

    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/products/${id}`
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
          `http://localhost:8080/api/photos/product/${id}`
        );
        const data = await response.json();
        setPhotos(data);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    fetchPhotos();
    fetchFitOptions();
    fetchProduct();
  }, [id, product?.productID]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  const generateWhatsAppUrl = (product: ProductData | null) => {
    if (!product) return "#";

    const message = `
  Hello,
  
  I am interested in the following product:
  
  Product Name: ${product.name}
  Price: Rs ${product.baseRentalPrice.toLocaleString()}
    
  Please let me know more about this product.
  
  Thank you!
  `.trim();

    return `https://wa.me/+94707616850?text=${encodeURIComponent(message)}`;
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
          <div className="mb-6 flex justify-between items-center">
            <div className="text-2xl text-gray-900">
              Rs{" "}
              {(
                selectedFitOption?.priceAdjustment || product.baseRentalPrice
              ).toLocaleString()}
            </div>
            

            <div className="flex gap-4">
              {fitOptions.map((option) => (
                <button
                  key={option.fitOnOptionID}
                  onClick={() => setSelectedFitOption(option)}
                  className={`px-4 py-2 rounded-lg border ${
                    selectedFitOption?.fitOnOptionID === option.fitOnOptionID
                      ? "bg-rose-600 text-white border-rose-600"
                      : "bg-white text-gray-700 border-gray-300 hover:border-rose-600"
                  }`}
                >
                  {option.optionType}
                </button>
              ))}
            </div>
          </div>

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

          <h2 className="font-serif text-xl mb-4">
            Inquire About This Product
          </h2>

          <a
            href={generateWhatsAppUrl(product)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Contact via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
